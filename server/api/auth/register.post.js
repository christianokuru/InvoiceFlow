// server/api/auth/register.post.js

import User from '../../models/User'
import History from '../../models/History'
import { validateRequired } from '../../utils/errors'
import { generateTokenPair, hashPassword, validatePasswordStrength } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    validateRequired(body, ['name', 'email', 'password'])
    const { name, email, password, confirmPassword, acceptTerms } = body

    // === Validation ===
    const validationErrors = []

    if (!name || name.trim().length < 2) validationErrors.push('Name must be at least 2 characters long')
    if (name && name.trim().length > 100) validationErrors.push('Name cannot exceed 100 characters')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) validationErrors.push('Please enter a valid email address')

    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.isValid) validationErrors.push(...passwordValidation.errors)
    if (password !== confirmPassword) validationErrors.push('Passwords do not match')
    if (!acceptTerms) validationErrors.push('You must accept the terms and conditions')

    if (validationErrors.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'VALIDATION_ERROR',
        data: {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Validation failed', details: validationErrors }
        }
      })
    }

    // === Check existing user ===
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'EMAIL_EXISTS',
        data: {
          success: false,
          error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' }
        }
      })
    }

    // === Create user ===
    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: '',
      isActive: true,
      lastLogin: new Date(),
      loginCount: 1
    })

    console.log('User created successfully:', user._id)

    // === Generate tokens ===
    const tokens = generateTokenPair(user)

    // === Log activity (fire-and-forget) ===
    History.createUserActivity(user._id, 'registered', {
      ipAddress: event.node.req.socket.remoteAddress || 'unknown',
      userAgent: event.node.req.headers['user-agent'] || 'unknown'
    }).catch(err => {
      console.warn('Failed to log registration activity:', err.message)
    })

    // === Clean user object — REMOVE PASSWORD BEFORE SENDING ===
    const userResponse = user.toJSON ? user.toJSON() : { ...user._doc }
    delete userResponse.password  // This line guarantees password is never sent

    // === Success response ===
    return {
      success: true,
      message: 'Account created successfully',
      data: {
        user: userResponse,
        tokens,
        passwordStrength: passwordValidation.strength
      },
      meta: { timestamp: new Date().toISOString() }
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    console.error('Registration failed:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'REGISTRATION_ERROR',
      data: {
        success: false,
        error: {
          code: 'REGISTRATION_ERROR',
          message: 'An error occurred during registration. Please try again.',
          timestamp: new Date().toISOString()
        }
      }
    })
  }
})