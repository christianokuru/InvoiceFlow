import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  // Reference to the user who performed this action
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },

  // Action type and category
  type: {
    type: String,
    required: [true, 'Activity type is required'],
    enum: [
      'invoice',
      'receipt',
      'payment',
      'email',
      'client',
      'user',
      'system',
      'export',
      'import',
      'login',
      'logout',
      'signup'
    ],
    index: true
  },

  // Action details
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: [
      'created',
      'updated',
      'deleted',
      'sent',
      'downloaded',
      'paid',
      'viewed',
      'searched',
      'filtered',
      'exported',
      'imported',
      'uploaded',
      'logged-in',
      'logged-out',
      'registered',
      'password-reset',
      'profile-updated',
      'settings-updated'
    ],
    index: true
  },

  // Display information
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },

  // Related entity information
  entityType: {
    type: String,
    enum: ['invoice', 'receipt', 'client', 'user', 'payment', 'document'],
    default: null
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  entityNumber: {
    type: String,
    trim: true,
    default: ''
  },

  // Financial information (if applicable)
  amount: {
    type: Number,
    default: null,
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'NGN',
    maxlength: 3
  },

  // Client information (if applicable)
  client: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      default: null
    },
    name: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    }
  },

  // Email information (if applicable)
  email: {
    to: {
      type: String,
      trim: true,
      default: ''
    },
    subject: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['sent', 'failed', 'pending'],
      default: 'sent'
    },
    template: {
      type: String,
      trim: true,
      default: ''
    }
  },

  // System information
  ipAddress: {
    type: String,
    trim: true,
    default: ''
  },
  userAgent: {
    type: String,
    trim: true,
    default: ''
  },
  sessionId: {
    type: String,
    trim: true,
    default: ''
  },

  // Status and importance
  status: {
    type: String,
    enum: ['success', 'error', 'warning', 'info'],
    default: 'success',
    index: true
  },
  importance: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    index: true
  },

  // Metadata and tags
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],

  // Additional details
  details: {
    type: String,
    trim: true,
    maxlength: [2000, 'Details cannot exceed 2000 characters'],
    default: ''
  },

  // Error information (if applicable)
  error: {
    message: { type: String, trim: true, default: '' },
    stack: { type: String, trim: true, default: '' },
    code: { type: String, trim: true, default: '' }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtuals
historySchema.virtual('displayDate').get(function() {
  return this.createdAt.toLocaleDateString()
})

historySchema.virtual('displayTime').get(function() {
  return this.createdAt.toLocaleTimeString()
})

historySchema.virtual('relativeTime').get(function() {
  const now = new Date()
  const diff = now - this.createdAt
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
})

historySchema.virtual('typeDisplay').get(function() {
  const typeMap = {
    'invoice': 'Invoice',
    'receipt': 'Receipt',
    'payment': 'Payment',
    'email': 'Email',
    'client': 'Client',
    'user': 'User',
    'system': 'System',
    'export': 'Export',
    'import': 'Import',
    'login': 'Login',
    'logout': 'Logout',
    'signup': 'Sign Up'
  }
  return typeMap[this.type] || this.type
})

historySchema.virtual('actionDisplay').get(function() {
  const actionMap = {
    'created': 'Created',
    'updated': 'Updated',
    'deleted': 'Deleted',
    'sent': 'Sent',
    'downloaded': 'Downloaded',
    'paid': 'Paid',
    'viewed': 'Viewed',
    'searched': 'Searched',
    'filtered': 'Filtered',
    'exported': 'Exported',
    'imported': 'Imported',
    'uploaded': 'Uploaded',
    'logged-in': 'Logged In',
    'logged-out': 'Logged Out',
    'registered': 'Registered',
    'password-reset': 'Password Reset',
    'profile-updated': 'Profile Updated',
    'settings-updated': 'Settings Updated'
  }
  return actionMap[this.action] || this.action
})

historySchema.virtual('statusIcon').get(function() {
  const iconMap = {
    'success': '✅',
    'error': '❌',
    'warning': '⚠️',
    'info': 'ℹ️'
  }
  return iconMap[this.status] || 'ℹ️'
})

// Indexes for performance
historySchema.index({ userId: 1, createdAt: -1 })
historySchema.index({ userId: 1, type: 1, createdAt: -1 })
historySchema.index({ userId: 1, action: 1, createdAt: -1 })
historySchema.index({ userId: 1, status: 1, createdAt: -1 })
historySchema.index({ userId: 1, importance: 1, createdAt: -1 })
historySchema.index({ type: 1, createdAt: -1 })
historySchema.index({ action: 1, createdAt: -1 })
historySchema.index({ status: 1, createdAt: -1 })
historySchema.index({ createdAt: -1 })
historySchema.index({ entityType: 1, entityId: 1, createdAt: -1 })

// TTL index to automatically delete old history entries (1 year)
historySchema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 })

// Static methods
historySchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId }

  if (options.type) query.type = options.type
  if (options.action) query.action = options.action
  if (options.status) query.status = options.status
  if (options.importance) query.importance = options.importance
  if (options.entityType) query.entityType = options.entityType
  if (options.entityId) query.entityId = options.entityId
  if (options.dateFrom || options.dateTo) {
    query.createdAt = {}
    if (options.dateFrom) query.createdAt.$gte = new Date(options.dateFrom)
    if (options.dateTo) query.createdAt.$lte = new Date(options.dateTo)
  }
  if (options.search) {
    query.$or = [
      { title: new RegExp(options.search, 'i') },
      { description: new RegExp(options.search, 'i') },
      { details: new RegExp(options.search, 'i') }
    ]
  }

  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
    .skip(options.skip || 0)
}

historySchema.statics.getActivityStats = function(userId, days = 30) {
  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - days)

  return this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: dateFrom }
      }
    },
    {
      $group: {
        _id: {
          type: '$type',
          action: '$action'
        },
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        lastActivity: { $max: '$createdAt' }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        actions: {
          $push: {
            action: '$_id.action',
            count: '$count',
            totalAmount: '$totalAmount',
            lastActivity: '$lastActivity'
          }
        },
        totalCount: { $sum: '$count' },
        totalAmount: { $sum: '$amount' },
        lastActivity: { $max: '$lastActivity' }
      }
    },
    { $sort: { totalCount: -1 } }
  ])
}

historySchema.statics.getRecentActivity = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('client.id', 'name email')
}

historySchema.statics.logActivity = function(activityData) {
  return this.create(activityData)
}

// Instance methods
historySchema.statics.createInvoiceActivity = function(userId, action, invoice, client = null, metadata = {}) {
  return this.logActivity({
    userId,
    type: 'invoice',
    action,
    title: `Invoice ${action}`,
    description: `Invoice ${invoice.number} ${action} for ${client ? client.name : invoice.client.name}`,
    entityType: 'invoice',
    entityId: invoice._id,
    entityNumber: invoice.number,
    amount: invoice.totalAmount,
    currency: invoice.currency,
    client: client ? {
      id: client._id,
      name: client.name,
      email: client.email
    } : {
      name: invoice.client.name,
      email: invoice.client.email
    },
    status: 'success',
    importance: action === 'deleted' ? 'high' : 'medium',
    metadata
  })
}

historySchema.statics.createReceiptActivity = function(userId, action, receipt, client = null, metadata = {}) {
  return this.logActivity({
    userId,
    type: 'receipt',
    action,
    title: `Receipt ${action}`,
    description: `Receipt ${receipt.number} ${action} for ${client ? client.name : receipt.client.name}`,
    entityType: 'receipt',
    entityId: receipt._id,
    entityNumber: receipt.number,
    amount: receipt.totalAmount,
    currency: receipt.currency,
    client: client ? {
      id: client._id,
      name: client.name,
      email: client.email
    } : {
      name: receipt.client.name,
      email: receipt.client.email
    },
    status: 'success',
    importance: action === 'deleted' ? 'high' : 'medium',
    metadata
  })
}

historySchema.statics.createClientActivity = function(userId, action, client, metadata = {}) {
  return this.logActivity({
    userId,
    type: 'client',
    action,
    title: `Client ${action}`,
    description: `Client ${client.displayName || client.name} ${action}`,
    entityType: 'client',
    entityId: client._id,
    client: {
      id: client._id,
      name: client.displayName || client.name,
      email: client.email
    },
    status: 'success',
    importance: action === 'deleted' ? 'high' : 'medium',
    metadata
  })
}

historySchema.statics.createEmailActivity = function(userId, action, emailData, metadata = {}) {
  return this.logActivity({
    userId,
    type: 'email',
    action: 'sent',
    title: `Email ${action}`,
    description: `Email sent to ${emailData.to}${emailData.subject ? ` with subject: "${emailData.subject}"` : ''}`,
    email: {
      to: emailData.to,
      subject: emailData.subject || '',
      status: emailData.status || 'sent',
      template: emailData.template || ''
    },
    status: emailData.status === 'failed' ? 'error' : 'success',
    importance: emailData.status === 'failed' ? 'high' : 'low',
    metadata
  })
}

historySchema.statics.createPaymentActivity = function(userId, action, paymentData, metadata = {}) {
  return this.logActivity({
    userId,
    type: 'payment',
    action,
    title: `Payment ${action}`,
    description: paymentData.description || `Payment of ${paymentData.amount} ${paymentData.currency} ${action}`,
    amount: paymentData.amount,
    currency: paymentData.currency,
    client: paymentData.client ? {
      id: paymentData.client.id,
      name: paymentData.client.name,
      email: paymentData.client.email
    } : null,
    status: 'success',
    importance: 'high',
    metadata
  })
}

historySchema.statics.createUserActivity = function(userId, action, metadata = {}) {
  const actionTitles = {
    'logged-in': 'User Logged In',
    'logged-out': 'User Logged Out',
    'registered': 'User Registered',
    'password-reset': 'Password Reset',
    'profile-updated': 'Profile Updated',
    'settings-updated': 'Settings Updated'
  }

  return this.logActivity({
    userId,
    type: 'user',
    action,
    title: actionTitles[action] || `User ${action}`,
    description: actionTitles[action] || `User ${action} successfully`,
    status: 'success',
    importance: action === 'registered' ? 'medium' : 'low',
    metadata
  })
}

export default mongoose.model('History', historySchema)