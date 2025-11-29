// server/api/auth/logout.post.js
import mongoose from 'mongoose'
import User from '../../models/User'
import History from '../../models/History'
import { asyncHandler, withDatabaseErrorHandling } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  return asyncHandler(async () => {
    try {
      // Get user from context (set by authentication middleware)
      const user = event.context.user

      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'UNAUTHORIZED',
          data: {
            success: false,
            error: {
              code: 'UNAUTHORIZED',
              message: 'User not authenticated'
            }
          }
        })
      }

      // Get client info for tracking
      const clientInfo = {
        ipAddress: event.node.req.socket.remoteAddress || 'unknown',
        userAgent: event.node.req.headers['user-agent'] || 'unknown'
      }

      // Log logout activity
      await History.createUserActivity(user._id, 'logged-out', {
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent
      })

      // In a real implementation, you might want to:
      // 1. Add the token to a blacklist
      // 2. Remove refresh tokens from database
      // 3. Clear user sessions
      // For now, we'll just log the activity and return success

      return {
        success: true,
        message: 'Logout successful',
        data: {
          loggedOut: true,
          timestamp: new Date().toISOString()
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

      // Log the actual error for debugging
      console.error('Logout error:', error)

      // Handle other errors
      throw createError({
        statusCode: 500,
        statusMessage: 'LOGOUT_ERROR',
        data: {
          success: false,
          error: {
            code: 'LOGOUT_ERROR',
            message: 'An error occurred during logout. Please try again.',
            timestamp: new Date().toISOString()
          }
        }
      })
    }
  })(event)
})