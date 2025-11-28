import User from '../../models/User'
import { validateRequired } from '../../utils/errors'
import {
  generateTokenPair,
  verifyRefreshToken,
  AUTH_ERRORS,
  createSessionInfo
} from '../../utils/auth'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      const body = await readBody(event)

      // Validate required field
      validateRequired(body, ['refreshToken'])

      const { refreshToken } = body

      if (!refreshToken || typeof refreshToken !== 'string') {
        throw createError({
          statusCode: 400,
          statusMessage: 'INVALID_REFRESH_TOKEN',
          data: {
            success: false,
            error: {
              code: 'INVALID_REFRESH_TOKEN',
              message: AUTH_ERRORS.INVALID_REFRESH_TOKEN
            }
          }
        })
      }

      // Verify refresh token
      let decodedToken
      try {
        decodedToken = await verifyRefreshToken(refreshToken)
      } catch (error) {
        throw createError({
          statusCode: 401,
          statusMessage: 'INVALID_REFRESH_TOKEN',
          data: {
            success: false,
            error: {
              code: 'INVALID_REFRESH_TOKEN',
              message: error.message
            }
          }
        })
      }

      // Find user by ID from token
      const user = await withDatabaseErrorHandling(
        () => User.findById(decodedToken.userId),
        'user lookup'
      )

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'USER_NOT_FOUND',
          data: {
            success: false,
            error: {
              code: 'USER_NOT_FOUND',
              message: AUTH_ERRORS.USER_NOT_FOUND
            }
          }
        })
      }

      // Check if user account is still active
      if (!user.isActive) {
        throw createError({
          statusCode: 403,
          statusMessage: 'ACCOUNT_INACTIVE',
          data: {
            success: false,
            error: {
              code: 'ACCOUNT_INACTIVE',
              message: AUTH_ERRORS.USER_INACTIVE
            }
          }
        })
      }

      // Generate new token pair
      const newTokens = generateTokenPair(user)

      // Get client info for session tracking
      const clientInfo = {
        ipAddress: getClientIP(event) || '',
        userAgent: getHeader(event, 'user-agent') || ''
      }

      // Create session info
      const sessionInfo = createSessionInfo(user, clientInfo)

      // Update user's last activity
      await User.findByIdAndUpdate(user._id, {
        lastActivity: new Date()
      })

      // Log token refresh activity
      const History = mongoose.model('History')
      await History.createUserActivity(user._id, 'settings-updated', {
        action: 'token_refresh',
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        sessionId: sessionInfo.sessionId
      })

      return {
        success: true,
        message: 'Token refreshed successfully',
        data: {
          tokens: newTokens,
          session: sessionInfo
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
        statusMessage: 'TOKEN_REFRESH_ERROR',
        data: {
          success: false,
          error: {
            code: 'TOKEN_REFRESH_ERROR',
            message: 'An error occurred while refreshing your token. Please try again.',
            timestamp: new Date().toISOString()
          }
        }
      })
    }
  })(event)
})