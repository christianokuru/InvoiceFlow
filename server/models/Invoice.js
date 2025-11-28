import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema({
  // Reference to the user who created this invoice
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },

  // Client information - can be reference to Client model or direct data
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    index: true
  },
  client: {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: [200, 'Client name cannot exceed 200 characters']
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    address: {
      street: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      state: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: '' },
      postalCode: { type: String, trim: true, default: '' }
    }
  },

  // Invoice details
  number: {
    type: String,
    required: [true, 'Invoice number is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Invoice number cannot exceed 50 characters']
  },

  // Financial information
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: [0, 'Tax amount cannot be negative']
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, 'Discount amount cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },

  // Status and dates
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid', 'overdue', 'void'],
    default: 'draft',
    index: true
  },
  date: {
    type: Date,
    required: [true, 'Invoice date is required'],
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
    validate: {
      validator: function(dueDate) {
        return dueDate >= this.date
      },
      message: 'Due date must be after or equal to invoice date'
    }
  },
  paidDate: {
    type: Date,
    default: null
  },

  // Description and items
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  items: [{
    description: {
      type: String,
      required: [true, 'Item description is required'],
      trim: true,
      maxlength: [500, 'Item description cannot exceed 500 characters']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative']
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: [0, 'Unit price cannot be negative']
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'Item total cannot be negative']
    }
  }],

  // Payment information
  paymentMethod: {
    type: String,
    enum: ['bank-transfer', 'credit-card', 'debit-card', 'cash', 'cheque', 'other'],
    default: 'bank-transfer'
  },
  paymentReference: {
    type: String,
    trim: true,
    default: ''
  },

  // Additional fields
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: ''
  },
  terms: {
    type: String,
    trim: true,
    maxlength: [1000, 'Terms cannot exceed 1000 characters'],
    default: ''
  },

  // Email tracking
  emailSent: {
    sent: { type: Boolean, default: false },
    sentAt: { type: Date, default: null },
    to: { type: String, default: '' },
    subject: { type: String, default: '' }
  },

  // PDF generation
  pdfGenerated: {
    generated: { type: Boolean, default: false },
    generatedAt: { type: Date, default: null },
    filePath: { type: String, default: '' }
  },

  // Metadata
  currency: {
    type: String,
    default: 'NGN',
    maxlength: 3
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtuals
invoiceSchema.virtual('isOverdue').get(function() {
  if (this.status === 'paid' || this.status === 'void') return false
  return new Date() > this.dueDate
})

invoiceSchema.virtual('daysOverdue').get(function() {
  if (!this.isOverdue) return 0
  const today = new Date()
  const diffTime = today - this.dueDate
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

invoiceSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    'draft': 'Draft',
    'sent': 'Sent',
    'paid': 'Paid',
    'overdue': 'Overdue',
    'void': 'Void'
  }
  return statusMap[this.status] || this.status
})

// Indexes for performance
invoiceSchema.index({ userId: 1, createdAt: -1 })
invoiceSchema.index({ userId: 1, status: 1 })
invoiceSchema.index({ userId: 1, client: { name: 1 } })
invoiceSchema.index({ number: 1 }, { unique: true })
invoiceSchema.index({ status: 1 })
invoiceSchema.index({ date: -1 })
invoiceSchema.index({ dueDate: -1 })
invoiceSchema.index({ createdAt: -1 })

// Pre-save middleware
invoiceSchema.pre('save', function(next) {
  // Calculate total amount if not set
  if (this.isModified('amount') || this.isModified('taxAmount') || this.isModified('discountAmount')) {
    this.totalAmount = this.amount + this.taxAmount - this.discountAmount
  }

  // Calculate items totals
  if (this.isModified('items')) {
    this.items.forEach(item => {
      item.total = item.quantity * item.unitPrice
    })
  }

  // Set paid date when status changes to paid
  if (this.isModified('status') && this.status === 'paid' && !this.paidDate) {
    this.paidDate = new Date()
  }

  next()
})

// Static methods
invoiceSchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId }
  if (options.status) query.status = options.status
  if (options.client) query['client.name'] = new RegExp(options.client, 'i')

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
}

invoiceSchema.statics.findOverdue = function(userId = null) {
  const query = {
    status: { $nin: ['paid', 'void'] },
    dueDate: { $lt: new Date() }
  }
  if (userId) query.userId = userId

  return this.find(query).sort({ dueDate: 1 })
}

invoiceSchema.statics.generateInvoiceNumber = async function(userId) {
  const User = mongoose.model('User')
  const user = await User.findById(userId)

  if (!user) throw new Error('User not found')

  const prefix = user.appearanceSettings?.invoicePrefix || 'INV'
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')

  // Find the highest number for this month/year
  const regex = new RegExp(`^${prefix}-${year}-${month}-\\d{3}$`)
  const lastInvoice = await this.findOne({
    number: { $regex: regex },
    userId
  }).sort({ number: -1 })

  let sequence = 1
  if (lastInvoice) {
    const lastSequence = parseInt(lastInvoice.number.split('-').pop())
    sequence = lastSequence + 1
  }

  const sequenceStr = String(sequence).padStart(3, '0')
  return `${prefix}-${year}-${month}-${sequenceStr}`
}

// Instance methods
invoiceSchema.methods.markAsSent = function() {
  this.status = 'sent'
  return this.save()
}

invoiceSchema.methods.markAsPaid = function(paymentMethod = 'bank-transfer', paymentReference = '') {
  this.status = 'paid'
  this.paidDate = new Date()
  this.paymentMethod = paymentMethod
  this.paymentReference = paymentReference
  return this.save()
}

invoiceSchema.methods.markAsOverdue = function() {
  if (this.status === 'sent' && this.isOverdue) {
    this.status = 'overdue'
    return this.save()
  }
  return Promise.resolve(this)
}

invoiceSchema.methods.addEmailSent = function(to, subject) {
  this.emailSent = {
    sent: true,
    sentAt: new Date(),
    to,
    subject
  }
  return this.save()
}

invoiceSchema.methods.addPdfGenerated = function(filePath) {
  this.pdfGenerated = {
    generated: true,
    generatedAt: new Date(),
    filePath
  }
  return this.save()
}

export default mongoose.model('Invoice', invoiceSchema)