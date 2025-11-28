import User from '../../models/User'
import { validateRequired } from '../../utils/errors'
import {
  generateTokenPair,
  comparePassword,
  AUTH_ERRORS,
  createSessionInfo
} from '../../utils/auth'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      const body = await readBody(event)

      // Validate required fields
      validateRequired(body, ['email', 'password'])

      const { email, password, rememberMe } = body

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

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'INVALID_CREDENTIALS',
          data: {
            success: false,
            error: {
              code: 'INVALID_CREDENTIALS',
              message: AUTH_ERRORS.INVALID_CREDENTIALS
            }
          }
        })
      }

      // Check if user account is active
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

      // Compare password
      const isPasswordValid = await withDatabaseErrorHandling(
        () => comparePassword(password, user.password),
        'password verification'
      )

      if (!isPasswordValid) {
        throw createError({
          statusCode: 401,
          statusMessage: 'INVALID_CREDENTIALS',
          data: {
            success: false,
            error: {
              code: 'INVALID_CREDENTIALS',
              message: AUTH_ERRORS.INVALID_CREDENTIALS
            }
          }
        })
      }

      // Update last login and login count
      const loginInfo = {
        lastLogin: new Date(),
        loginCount: (user.loginCount || 0) + 1
      }

      // Get client info for session tracking
      const clientInfo = {
        ipAddress: getClientIP(event) || '',
        userAgent: getHeader(event, 'user-agent') || ''
      }

      // Update user with login information
      await User.findByIdAndUpdate(user._id, loginInfo, { new: true })

      // Generate tokens
      const tokens = generateTokenPair(user)

      // Create session info
      const sessionInfo = createSessionInfo(user, clientInfo)

      // Log login activity
      const History = mongoose.model('History')
      await History.createUserActivity(user._id, 'logged-in', {
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        rememberMe,
        sessionId: sessionInfo.sessionId
      })

      // Prepare user response (without sensitive data)
      const userResponse = user.toJSON()
      userResponse.lastLogin = loginInfo.lastLogin
      userResponse.loginCount = loginInfo.loginCount

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: userResponse,
          tokens,
          session: sessionInfo,
          rememberMe: Boolean(rememberMe)
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
        statusMessage: 'LOGIN_ERROR',
        data: {
          success: false,
          error: {
            code: 'LOGIN_ERROR',
            message: 'An error occurred during login. Please try again.',
            timestamp: new Date().toISOString()
          }
        }
      })
    }
  })(event)
})