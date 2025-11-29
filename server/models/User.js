import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(phone) {
        if (!phone) return true
        const cleaned = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
        return /^[+]?\d{7,15}$/.test(cleaned)
      },
      message: 'Invalid phone number format'
    }
  },
  photo: {
    type: String,
    default: ''
  },

  // Business information
  business: {
    name: {
      type: String,
      trim: true,
      maxlength: 200
    },
    type: {
      type: String,
      enum: [
        'sole-proprietorship',
        'limited-liability',
        'partnership',
        'corporation',
        'nonprofit',
        'government',
        'enterprise',
        'others'
      ]
    },
    rcNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function(rcNumber) {
          if (!rcNumber) return true
          return /^[A-Za-z0-9\-]{5,20}$/.test(rcNumber)
        },
        message: 'Invalid registration number format'
      }
    },
    taxId: {
      type: String,
      trim: true,
      validate: {
        validator: function(taxId) {
          if (!taxId) return true
          return /^[A-Za-z0-9\-]{5,30}$/.test(taxId)
        },
        message: 'Invalid tax ID format'
      }
    },
    logo: {
      type: String,
      default: ''
    },
    address: {
      street: {
        type: String,
        trim: true,
        maxlength: 500
      },
      city: {
        type: String,
        trim: true,
        maxlength: 100
      },
      stateProvince: {
        type: String,
        trim: true,
        maxlength: 100
      },
      country: {
        type: String,
        trim: true,
        maxlength: 2
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
        }
      }
    },
    bankDetails: {
      bankName: {
        type: String,
        trim: true
      },
      accountNumber: {
        type: String,
        trim: true,
        validate: {
          validator: function(accountNumber) {
            if (!accountNumber) return true
            return /^[A-Za-z0-9\-]{5,30}$/.test(accountNumber)
          },
          message: 'Invalid account number format'
        }
      },
      accountName: {
        type: String,
        trim: true,
        maxlength: 200
      },
      swiftCode: {
        type: String,
        trim: true,
        validate: {
          validator: function(swiftCode) {
            if (!swiftCode) return true
            return /^[A-Za-z0-9]{8,11}$/.test(swiftCode)
          },
          message: 'SWIFT code must be 8 or 11 characters'
        }
      }
    }
  },

  // Notification settings
  notificationSettings: {
    emailNotifications: {
      invoiceCreated: {
        type: Boolean,
        default: true
      },
      invoicePaid: {
        type: Boolean,
        default: true
      },
      invoiceOverdue: {
        type: Boolean,
        default: true
      },
      receiptCreated: {
        type: Boolean,
        default: false
      },
      clientAdded: {
        type: Boolean,
        default: false
      },
      weeklySummary: {
        type: Boolean,
        default: true
      }
    },
    smsNotifications: {
      enabled: {
        type: Boolean,
        default: false
      },
      paymentReceived: {
        type: Boolean,
        default: true
      },
      highValueInvoice: {
        type: Boolean,
        default: true
      },
      urgentOverdue: {
        type: Boolean,
        default: true
      }
    },
    inAppNotifications: {
      enabled: {
        type: Boolean,
        default: true
      },
      sound: {
        type: Boolean,
        default: false
      },
      desktop: {
        type: Boolean,
        default: true
      },
      badges: {
        type: Boolean,
        default: true
      }
    },
    frequency: {
      emailSummary: {
        type: String,
        enum: ['never', 'daily', 'weekly', 'monthly'],
        default: 'weekly'
      },
      quietHours: {
        start: {
          type: String,
          default: '22:00',
          validate: {
            validator: function(time) {
              return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)
            },
            message: 'Invalid time format (HH:MM)'
          }
        },
        end: {
          type: String,
          default: '07:00',
          validate: {
            validator: function(time) {
              return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)
            },
            message: 'Invalid time format (HH:MM)'
          }
        }
      }
    }
  },

  // Appearance settings
  appearanceSettings: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'light'
    },
    currency: {
      type: String,
      default: 'NGN',
      maxlength: 3
    },
    dateFormat: {
      type: String,
      enum: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'D MMM YYYY', 'MMM D, YYYY'],
      default: 'DD/MM/YYYY'
    },
    timezone: {
      type: String,
      default: 'Africa/Lagos'
    },
    language: {
      type: String,
      default: 'en-NG'
    },
    dashboard: {
      compactView: {
        type: Boolean,
        default: false
      },
      showAnimations: {
        type: Boolean,
        default: true
      },
      defaultView: {
        type: String,
        enum: ['overview', 'invoices', 'receipts', 'analytics', 'clients'],
        default: 'overview'
      },
      itemsPerPage: {
        type: String,
        enum: ['10', '25', '50', '100'],
        default: '25'
      }
    },
    region: {
      useMetric: {
        type: Boolean,
        default: true
      },
      use24Hour: {
        type: Boolean,
        default: false
      }
    },
    customization: {
      primaryColor: {
        type: String,
        default: '#3B82F6',
        validate: {
          validator: function(color) {
            return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
          },
          message: 'Invalid hex color format'
        }
      },
      accentColor: {
        type: String,
        default: '#10B981',
        validate: {
          validator: function(color) {
            return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
          },
          message: 'Invalid hex color format'
        }
      }
    }
  },

  // System fields
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date
  },

  // Password reset fields
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },

  // Email verification fields
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtuals
userSchema.virtual('fullName').get(function() {
  return this.name
})

userSchema.virtual('isProfileComplete').get(function() {
  const requiredFields = [
    this.name,
    this.email,
    this.phone,
    this.business?.name,
    this.business?.type,
    this.business?.address?.street,
    this.business?.address?.city,
    this.business?.address?.country
  ]
  return requiredFields.every(field => field && field.toString().trim())
})

// Indexes
userSchema.index({ isActive: 1 })
userSchema.index({ createdAt: -1 })
userSchema.index({ 'business.name': 1 })
userSchema.index({ 'business.type': 1 })

// Middleware for .save() method
userSchema.pre('save', async function() {
  // Only increment login count if lastLogin is being modified AND this is not a new document
  // AND we're not already in the process of updating loginCount
  if (this.isModified('lastLogin') && !this.isNew && !this.isModified('loginCount')) {
    this.loginCount = (this.loginCount || 0) + 1
  }
})

// Middleware for findOneAndUpdate and findByIdAndUpdate
userSchema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate()
  
  // Check if lastLogin is being updated (either directly or via $set)
  if (update.lastLogin || update.$set?.lastLogin) {
    // Increment loginCount by 1
    if (!update.$inc) {
      update.$inc = {}
    }
    update.$inc.loginCount = 1
  }
})

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() })
}

userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true })
}

// Instance methods
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date()
  return this.save()
}

userSchema.methods.getBusinessDisplay = function() {
  if (this.business?.name) {
    return `${this.business.name} ${this.business.type ? `(${this.business.type.replace('-', ' ')})` : ''}`
  }
  return this.name || 'Unknown'
}

export default mongoose.model('User', userSchema)