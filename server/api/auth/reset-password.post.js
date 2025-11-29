import mongoose from 'mongoose'
import User from '../../models/User'
import History from '../../models/History'
import { validateRequired } from '../../utils/errors'
import {
  hashPassword,
  validatePasswordStrength,
  verifyTokenHash,
  isTokenExpired,
  AUTH_ERRORS
} from '../../utils/auth'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'
import { sendPasswordResetConfirmationEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      const body = await readBody(event)

      validateRequired(body, ['token', 'email', 'password'])

      const { token, email, password } = body

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

      const passwordValidation = validatePasswordStrength(password)
      if (!passwordValidation.isValid) {
        throw createError({
          statusCode: 400,
          statusMessage: 'WEAK_PASSWORD',
          data: {
            success: false,
            error: {
              code: 'WEAK_PASSWORD',
              message: 'Password does not meet security requirements',
              details: passwordValidation.errors
            }
          }
        })
      }

      const user = await withDatabaseErrorHandling(
        () => User.findByEmail(email.toLowerCase().trim()),
        'user lookup'
      )

      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: 'USER_NOT_FOUND',
          data: {
            success: false,
            error: {
              code: 'USER_NOT_FOUND',
              message: 'Invalid reset token or email'
            }
          }
        })
      }

      if (!user.isActive) {
        throw createError({
          statusCode: 403,
          statusMessage: 'ACCOUNT_INACTIVE',
          data: {
            success: false,
            error: {
              code: 'ACCOUNT_INACTIVE',
              message: 'Your account has been deactivated. Please contact support.'
            }
          }
        })
      }

      if (!user.passwordResetToken || !user.passwordResetExpires) {
        throw createError({
          statusCode: 400,
          statusMessage: 'NO_RESET_REQUEST',
          data: {
            success: false,
            error: {
              code: 'NO_RESET_REQUEST',
              message: 'No password reset request found for this account'
            }
          }
        })
      }

      if (isTokenExpired(user.passwordResetExpires)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'EXPIRED_TOKEN',
          data: {
            success: false,
            error: {
              code: 'EXPIRED_TOKEN',
              message: 'Password reset token has expired. Please request a new one.'
            }
          }
        })
      }

      if (!verifyTokenHash(token, user.passwordResetToken)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'INVALID_TOKEN',
          data: {
            success: false,
            error: {
              code: 'INVALID_TOKEN',
              message: 'Invalid password reset token'
            }
          }
        })
      }

      const hashedPassword = await withDatabaseErrorHandling(
        () => hashPassword(password),
        'password hashing'
      )

      const clientInfo = {
        ipAddress: event.node.req.socket.remoteAddress || 'unknown',
        userAgent: event.node.req.headers['user-agent'] || 'unknown'
      }

      await User.findByIdAndUpdate(user._id, {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined
      })

      await History.createUserActivity(user._id, 'password-reset', {
        action: 'completed',
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent
      })

      try {
        await sendPasswordResetConfirmationEmail(email, user.name)
        console.log(`Password reset confirmation email sent successfully to ${email}`)
      } catch (emailError) {
        console.error('Failed to send password reset confirmation email:', emailError)
      }

      return {
        success: true,
        message: 'Password has been reset successfully',
        data: {
          passwordReset: true,
          email: email.toLowerCase().trim(),
          passwordStrength: passwordValidation.strength
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      }

    } catch (error) {
      if (error.statusCode && error.data) {
        throw error
      }

      console.error('Reset password error:', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'PASSWORD_RESET_ERROR',
        data: {
          success: false,
          error: {
            code: 'PASSWORD_RESET_ERROR',
            message: 'An error occurred while resetting your password. Please try again.',
            timestamp: new Date().toISOString()
          }
        }
      })
    }
  })(event)
})