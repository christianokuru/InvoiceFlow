// server/api/auth/login.post.js
import mongoose from 'mongoose'
import User from '../../models/User'
import History from '../../models/History'
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

      // Update last login (loginCount will be automatically incremented by middleware)
      const loginInfo = {
        lastLogin: new Date()
      }

      // Get client info for session tracking
      const clientInfo = {
        ipAddress: event.node.req.socket.remoteAddress || 'unknown',
        userAgent: event.node.req.headers['user-agent'] || 'unknown'
      }

      // Update user with login information and get the updated user
      const updatedUser = await User.findByIdAndUpdate(user._id, loginInfo, { new: true })

      // Generate tokens
      const tokens = generateTokenPair(updatedUser)

      // Create session info
      const sessionInfo = createSessionInfo(updatedUser, clientInfo)

      // Log login activity
      await History.createUserActivity(updatedUser._id, 'logged-in', {
        ipAddress: clientInfo.ipAddress,
        userAgent: clientInfo.userAgent,
        rememberMe,
        sessionId: sessionInfo.sessionId
      })

      // Prepare user response (without sensitive data)
      const userResponse = updatedUser.toJSON()
      delete userResponse.password

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

      // Log the actual error for debugging
      console.error('Login error:', error)

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