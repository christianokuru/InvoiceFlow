import User from '../models/User'
import {
  verifyAccessToken,
  extractTokenFromHeader,
  AUTH_ERRORS
} from '../utils/auth'
import { handleDatabaseError, UnauthorizedError, ForbiddenError } from '../utils/errors'

// Authentication middleware - verifies JWT tokens and attaches user to request
export default defineEventHandler(async (event) => {
  // Skip authentication for certain paths
  const publicPaths = [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/health',
    '/api/docs'
  ]

  const url = getRequestURL(event)
  const pathname = url.pathname

  // Skip authentication for public paths and OPTIONS requests
  if (publicPaths.some(path => pathname.startsWith(path)) || getMethod(event) === 'OPTIONS') {
    return
  }

  // Skip authentication for static assets and non-API routes
  if (!pathname.startsWith('/api/')) {
    return
  }

  try {
    // Extract token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      throw UnauthorizedError(AUTH_ERRORS.MISSING_TOKEN)
    }

    // Verify the access token
    let decodedToken
    try {
      decodedToken = verifyAccessToken(token)
    } catch (error) {
      throw UnauthorizedError(error.message)
    }

    // Find the user in database
    const user = await User.findById(decodedToken.userId).select('+emailVerified +isActive')

    if (!user) {
      throw UnauthorizedError(AUTH_ERRORS.USER_NOT_FOUND)
    }

    // Check if user account is active
    if (!user.isActive) {
      throw ForbiddenError(AUTH_ERRORS.USER_INACTIVE)
    }

    // Check if email is verified (optional - uncomment if email verification is required)
    // if (!user.emailVerified) {
    //   throw ForbiddenError(AUTH_ERRORS.EMAIL_NOT_VERIFIED)
    // }

    // Update user's last activity timestamp
    await User.findByIdAndUpdate(user._id, {
      lastActivity: new Date()
    })

    // Attach user to event context for use in route handlers
    event.context.user = user
    event.context.userId = user._id
    event.context.userRole = user.role

  } catch (error) {
    // Handle authentication errors
    const handledError = handleDatabaseError(error, 'authentication middleware')

    throw createError({
      statusCode: handledError.statusCode,
      statusMessage: handledError.code,
      data: {
        success: false,
        error: {
          code: handledError.code,
          message: handledError.message,
          timestamp: new Date().toISOString()
        }
      }
    })
  }
})