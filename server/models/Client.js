import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  // Reference to the user who owns this client
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },

  // Basic client information
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [200, 'Client name cannot exceed 200 characters'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'Client email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    index: true
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(phone) {
        if (!phone) return true // Phone is optional
        const cleaned = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
        return /^[+]?\d{7,15}$/.test(cleaned)
      },
      message: 'Invalid phone number format'
    }
  },

  // Client classification
  type: {
    type: String,
    enum: ['individual', 'business', 'corporate', 'nonprofit', 'government'],
    default: 'business'
  },
  industry: {
    type: String,
    trim: true,
    maxlength: [100, 'Industry cannot exceed 100 characters'],
    default: ''
  },

  // Address information
  address: {
    street: {
      type: String,
      trim: true,
      maxlength: [500, 'Street address cannot exceed 500 characters'],
      default: ''
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters'],
      default: ''
    },
    state: {
      type: String,
      trim: true,
      maxlength: [100, 'State cannot exceed 100 characters'],
      default: ''
    },
    country: {
      type: String,
      trim: true,
      maxlength: [2, 'Use ISO country codes'],
      default: ''
    },
    postalCode: {
      type: String,
      trim: true,
      validate: {
        validator: function(postalCode) {
          if (!postalCode) return true
          return /^[A-Za-z0-9\s\-]{3,10}$/.test(postalCode)
        },
        message: 'Invalid postal code format'
      },
      default: ''
    }
  },

  // Business information (for business clients)
  business: {
    companyName: {
      type: String,
      trim: true,
      maxlength: [200, 'Company name cannot exceed 200 characters'],
      default: ''
    },
    businessType: {
      type: String,
      enum: ['sole-proprietorship', 'partnership', 'llc', 'corporation', 'nonprofit', 'other'],
      default: ''
    },
    taxId: {
      type: String,
      trim: true,
      maxlength: [50, 'Tax ID cannot exceed 50 characters'],
      default: ''
    },
    registrationNumber: {
      type: String,
      trim: true,
      maxlength: [50, 'Registration number cannot exceed 50 characters'],
      default: ''
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function(website) {
          if (!website) return true
          return /^https?:\/\/.+/.test(website)
        },
        message: 'Please enter a valid website URL (http:// or https://)'
      },
      default: ''
    }
  },

  // Financial summary (calculated fields)
  totalInvoices: {
    type: Number,
    default: 0,
    min: [0, 'Total invoices cannot be negative']
  },
  totalAmount: {
    type: Number,
    default: 0,
    min: [0, 'Total amount cannot be negative']
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: [0, 'Paid amount cannot be negative']
  },
  outstandingAmount: {
    type: Number,
    default: 0,
    min: [0, 'Outstanding amount cannot be negative']
  },
  overdueAmount: {
    type: Number,
    default: 0,
    min: [0, 'Overdue amount cannot be negative']
  },

  // Client status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'blacklisted'],
    default: 'active',
    index: true
  },

  // Credit and payment terms
  creditLimit: {
    type: Number,
    default: 0,
    min: [0, 'Credit limit cannot be negative']
  },
  paymentTerms: {
    type: String,
    enum: ['immediate', 'net-7', 'net-14', 'net-30', 'net-60', 'net-90', 'custom'],
    default: 'net-30'
  },
  customPaymentTerms: {
    type: String,
    trim: true,
    maxlength: [200, 'Custom payment terms cannot exceed 200 characters'],
    default: ''
  },

  // Contacts and relationships
  primaryContact: {
    name: { type: String, trim: true, default: '' },
    title: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    phone: { type: String, trim: true, default: '' }
  },

  // Additional notes and tags
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    default: ''
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],

  // Communication preferences
  communicationPreferences: {
    emailInvoices: { type: Boolean, default: true },
    emailReceipts: { type: Boolean, default: false },
    emailStatements: { type: Boolean, default: true },
    smsReminders: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'en' }
  },

  // Metadata
  currency: {
    type: String,
    default: 'NGN',
    maxlength: 3
  },

  // Dates
  firstInvoiceDate: { type: Date, default: null },
  lastInvoiceDate: { type: Date, default: null },
  lastPaymentDate: { type: Date, default: null }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtuals
clientSchema.virtual('displayName').get(function() {
  if (this.business.companyName) {
    return this.business.companyName
  }
  return this.name
})

clientSchema.virtual('totalUnpaid').get(function() {
  return this.totalAmount - this.paidAmount
})

clientSchema.virtual('paymentStatus').get(function() {
  if (this.totalUnpaid === 0) return 'paid'
  if (this.overdueAmount > 0) return 'overdue'
  return 'partial'
})

clientSchema.virtual('location').get(function() {
  const parts = []
  if (this.address.city) parts.push(this.address.city)
  if (this.address.state) parts.push(this.address.state)
  if (this.address.country) parts.push(this.address.country)
  return parts.join(', ')
})

// Indexes for performance
clientSchema.index({ userId: 1, name: 1 })
clientSchema.index({ userId: 1, email: 1 })
clientSchema.index({ userId: 1, status: 1 })
clientSchema.index({ userId: 1, createdAt: -1 })
clientSchema.index({ email: 1 })
clientSchema.index({ status: 1 })
clientSchema.index({ 'business.companyName': 1 })
clientSchema.index({ createdAt: -1 })

// Pre-save middleware
clientSchema.pre('save', function(next) {
  // Update outstanding and overdue amounts
  this.outstandingAmount = this.totalAmount - this.paidAmount

  next()
})

// Static methods
clientSchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId }
  if (options.status) query.status = options.status
  if (options.search) {
    query.$or = [
      { name: new RegExp(options.search, 'i') },
      { email: new RegExp(options.search, 'i') },
      { 'business.companyName': new RegExp(options.search, 'i') }
    ]
  }
  if (options.type) query.type = options.type

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
}

clientSchema.statics.findActiveClients = function(userId) {
  return this.find({ userId, status: 'active' }).sort({ name: 1 })
}

clientSchema.statics.findOverdueClients = function(userId = null) {
  const query = { overdueAmount: { $gt: 0 } }
  if (userId) query.userId = userId

  return this.find(query).sort({ overdueAmount: -1 })
}

clientSchema.statics.getClientStats = function(userId = null) {
  const query = userId ? { userId } : {}

  return this.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' },
        outstandingAmount: { $sum: '$outstandingAmount' }
      }
    }
  ])
}

// Instance methods
clientSchema.methods.updateFinancialSummary = async function() {
  const Invoice = mongoose.model('Invoice')
  const invoiceStats = await Invoice.aggregate([
    {
      $match: {
        $or: [
          { clientId: this._id },
          { 'client.email': this.email }
        ],
        userId: this.userId
      }
    },
    {
      $group: {
        _id: null,
        totalInvoices: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' },
        paidAmount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'paid'] }, '$totalAmount', 0]
          }
        },
        overdueAmount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$status', 'overdue'] },
                  { $ne: ['$status', 'paid'] }
                ]
              },
              '$totalAmount',
              0
            ]
          }
        },
        firstInvoiceDate: { $min: '$date' },
        lastInvoiceDate: { $max: '$date' }
      }
    }
  ])

  const stats = invoiceStats[0] || {
    totalInvoices: 0,
    totalAmount: 0,
    paidAmount: 0,
    overdueAmount: 0,
    firstInvoiceDate: null,
    lastInvoiceDate: null
  }

  this.totalInvoices = stats.totalInvoices
  this.totalAmount = stats.totalAmount
  this.paidAmount = stats.paidAmount
  this.overdueAmount = stats.overdueAmount
  this.firstInvoiceDate = stats.firstInvoiceDate
  this.lastInvoiceDate = stats.lastInvoiceDate

  return this.save()
}

clientSchema.methods.getRecentTransactions = function(limit = 10) {
  const Invoice = mongoose.model('Invoice')

  return Invoice.find({
    $or: [
      { clientId: this._id },
      { 'client.email': this.email }
    ],
    userId: this.userId
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('userId', 'name')
}

clientSchema.methods.addNote = function(note) {
  if (this.notes) {
    this.notes += '\n\n' + note
  } else {
    this.notes = note
  }
  return this.save()
}

clientSchema.methods.changeStatus = function(newStatus, reason = '') {
  this.status = newStatus
  if (reason) {
    this.addNote(`Status changed to ${newStatus}: ${reason}`)
  }
  return this.save()
}

export default mongoose.model('Client', clientSchema)