import mongoose from 'mongoose'

const receiptSchema = new mongoose.Schema({
  // Reference to the user who created this receipt
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

  // Receipt details
  number: {
    type: String,
    required: [true, 'Receipt number is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Receipt number cannot exceed 50 characters']
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

  // Receipt categorization
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Service',
      'Product',
      'Consulting',
      'Software',
      'Hardware',
      'Subscription',
      'License',
      'Training',
      'Support',
      'Maintenance',
      'Installation',
      'Design',
      'Marketing',
      'Advertising',
      'Other'
    ],
    index: true
  },

  // Dates
  date: {
    type: Date,
    required: [true, 'Receipt date is required'],
    default: Date.now
  },
  servicePeriod: {
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null }
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
      min: [0, 'Quantity cannot be negative'],
      default: 1
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
    enum: ['bank-transfer', 'credit-card', 'debit-card', 'cash', 'cheque', 'mobile-money', 'other'],
    default: 'bank-transfer'
  },
  paymentReference: {
    type: String,
    trim: true,
    default: ''
  },
  invoiceReference: {
    type: String,
    trim: true,
    default: '',
    description: 'Reference to the invoice this receipt is for'
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
  }],

  // Receipt type
  type: {
    type: String,
    enum: ['payment-received', 'invoice-payment', 'refund', 'deposit', 'retainer'],
    default: 'payment-received'
  },

  // For refunds or adjustments
  relatedReceiptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receipt',
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtuals
receiptSchema.virtual('categoryDisplay').get(function() {
  return this.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

receiptSchema.virtual('typeDisplay').get(function() {
  const typeMap = {
    'payment-received': 'Payment Received',
    'invoice-payment': 'Invoice Payment',
    'refund': 'Refund',
    'deposit': 'Deposit',
    'retainer': 'Retainer'
  }
  return typeMap[this.type] || this.type
})

// Indexes for performance
receiptSchema.index({ userId: 1, createdAt: -1 })
receiptSchema.index({ userId: 1, category: 1 })
receiptSchema.index({ userId: 1, client: { name: 1 } })
receiptSchema.index({ number: 1 }, { unique: true })
receiptSchema.index({ category: 1 })
receiptSchema.index({ date: -1 })
receiptSchema.index({ createdAt: -1 })
receiptSchema.index({ type: 1 })

// Pre-save middleware
receiptSchema.pre('save', function(next) {
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

  next()
})

// Static methods
receiptSchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId }
  if (options.category) query.category = options.category
  if (options.client) query['client.name'] = new RegExp(options.client, 'i')
  if (options.type) query.type = options.type
  if (options.dateFrom || options.dateTo) {
    query.date = {}
    if (options.dateFrom) query.date.$gte = new Date(options.dateFrom)
    if (options.dateTo) query.date.$lte = new Date(options.dateTo)
  }

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
}

receiptSchema.statics.findByCategory = function(category, userId = null) {
  const query = { category }
  if (userId) query.userId = userId

  return this.find(query).sort({ createdAt: -1 })
}

receiptSchema.statics.getCategoryStats = function(userId = null) {
  const query = userId ? { userId } : {}

  return this.aggregate([
    { $match: query },
    { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ])
}

receiptSchema.statics.generateReceiptNumber = async function(userId) {
  const User = mongoose.model('User')
  const user = await User.findById(userId)

  if (!user) throw new Error('User not found')

  const prefix = user.appearanceSettings?.receiptPrefix || 'REC'
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')

  // Find the highest number for this month/year
  const regex = new RegExp(`^${prefix}-${year}-${month}-\\d{3}$`)
  const lastReceipt = await this.findOne({
    number: { $regex: regex },
    userId
  }).sort({ number: -1 })

  let sequence = 1
  if (lastReceipt) {
    const lastSequence = parseInt(lastReceipt.number.split('-').pop())
    sequence = lastSequence + 1
  }

  const sequenceStr = String(sequence).padStart(3, '0')
  return `${prefix}-${year}-${month}-${sequenceStr}`
}

// Instance methods
receiptSchema.methods.addEmailSent = function(to, subject) {
  this.emailSent = {
    sent: true,
    sentAt: new Date(),
    to,
    subject
  }
  return this.save()
}

receiptSchema.methods.addPdfGenerated = function(filePath) {
  this.pdfGenerated = {
    generated: true,
    generatedAt: new Date(),
    filePath
  }
  return this.save()
}

receiptSchema.methods.getTotalItems = function() {
  return this.items.length
}

receiptSchema.methods.isValidServicePeriod = function() {
  if (!this.servicePeriod.startDate || !this.servicePeriod.endDate) {
    return true // Service period is optional
  }
  return this.servicePeriod.endDate >= this.servicePeriod.startDate
}

export default mongoose.model('Receipt', receiptSchema)