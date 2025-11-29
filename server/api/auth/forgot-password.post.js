import mongoose from 'mongoose'
import User from '../../models/User'
import History from '../../models/History'
import { validateRequired } from '../../utils/errors'
import {
  generatePasswordResetToken,
  hashToken,
  isTokenExpired,
  AUTH_ERRORS
} from '../../utils/auth'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'
import { sendPasswordResetEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      const body = await readBody(event)

      validateRequired(body, ['email'])

      const { email } = body

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

      const user = await withDatabaseErrorHandling(
        () => User.findByEmail(email.toLowerCase().trim()),
        'user lookup'
      )

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

      const resetTokenData = generatePasswordResetToken(user._id)

      await User.findByIdAndUpdate(user._id, {
        passwordResetToken: hashToken(resetTokenData.token),
        passwordResetExpires: resetTokenData.expiresAt
      })

      const clientInfo = {
        ipAddress: event.node.req.socket.remoteAddress || 'unknown',
        userAgent: event.node.req.headers['user-agent'] || 'unknown'
      }

      await History.createUserActivity(user._id, 'password-reset', {
        action: 'requested',
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent
      })

      try {
        await sendPasswordResetEmail(email, resetTokenData.token, user.name)
        console.log(`Password reset email sent successfully to ${email}`)
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError)
        
        throw createError({
          statusCode: 500,
          statusMessage: 'EMAIL_SEND_ERROR',
          data: {
            success: false,
            error: {
              code: 'EMAIL_SEND_ERROR',
              message: 'Failed to send password reset email. Please try again or contact support.',
              timestamp: new Date().toISOString()
            }
          }
        })
      }

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
      if (error.statusCode && error.data) {
        throw error
      }

      console.error('Forgot password error:', error)

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