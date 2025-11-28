import User from '../../models/User'
import { validateRequired } from '../../utils/errors'
import {
  generatePasswordResetToken,
  hashToken,
  isTokenExpired,
  AUTH_ERRORS
} from '../../utils/auth'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      const body = await readBody(event)

      // Validate required field
      validateRequired(body, ['email'])

      const { email } = body

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'INVALID_EMAIL',
          data: {
            success: false,
            error: {
              code: 'INVALID_EMAIL',
              message: 'Please enter a valid email address'
            }
          }
        })
      }

      // Find user by email
      const user = await withDatabaseErrorHandling(
        () => User.findByEmail(email.toLowerCase().trim()),
        'user lookup'
      )

      // Always return success to prevent email enumeration attacks
      if (!user) {
        console.log(`Password reset requested for non-existent email: ${email}`)
        return {
          success: true,
          message: 'If an account with this email exists, a password reset link has been sent.',
          data: {
            emailSent: true,
            email: email.toLowerCase().trim()
          },
          meta: {
            timestamp: new Date().toISOString()
          }
        }
      }

      // Check if user account is active
      if (!user.isActive) {
        console.log(`Password reset requested for inactive account: ${email}`)
        return {
          success: true,
          message: 'If an account with this email exists, a password reset link has been sent.',
          data: {
            emailSent: true,
            email: email.toLowerCase().trim()
          },
          meta: {
            timestamp: new Date().toISOString()
          }
        }
      }

      // Check if there's already a recent password reset request
      if (user.passwordResetExpires && !isTokenExpired(user.passwordResetExpires)) {
        throw createError({
          statusCode: 429,
          statusMessage: 'RECENT_RESET_REQUEST',
          data: {
            success: false,
            error: {
              code: 'RECENT_RESET_REQUEST',
              message: 'A password reset link was recently sent. Please check your email or wait before requesting another.',
              details: {
                canRequestAt: user.passwordResetExpires
              }
            }
          }
        })
      }

      // Generate password reset token
      const resetTokenData = generatePasswordResetToken(user._id)

      // Store hashed token and expiration in user document
      await User.findByIdAndUpdate(user._id, {
        passwordResetToken: hashToken(resetTokenData.token),
        passwordResetExpires: resetTokenData.expiresAt
      })

      // Get client info for tracking
      const clientInfo = {
        ipAddress: getClientIP(event) || '',
        userAgent: getHeader(event, 'user-agent') || ''
      }

      // Log password reset request
      const History = mongoose.model('History')
      await History.createUserActivity(user._id, 'password-reset', {
        action: 'requested',
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent
      })

      // Send password reset email (in production, this would use SendGrid)
      // TODO: Implement email service
      const resetLink = `${process.env.NUXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetTokenData.token}&email=${encodeURIComponent(email)}`
      console.log(`Password reset link for ${email}: ${resetLink}`)

      return {
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.',
        data: {
          emailSent: true,
          email: email.toLowerCase().trim(),
          expiresIn: '1 hour'
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      }

    } catch (error) {
      // If error already has the expected format, re-throw it
      if (error.statusCode && error.data) {
        throw error
      }

      // Handle other errors
      throw createError({
        statusCode: 500,
        statusMessage: 'PASSWORD_RESET_ERROR',
        data: {
          success: false,
          error: {
            code: 'PASSWORD_RESET_ERROR',
            message: 'An error occurred while processing your request. Please try again.',
            timestamp: new Date().toISOString()
          }
        }
      })
    }
  })(event)
})