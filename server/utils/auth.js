// server/utils/auth.js
import jwt from 'jsonwebtoken'
import crypto from 'crypto-js'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d'

// Generate access token
export const generateAccessToken = (payload) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
  }

  return jwt.sign(
    {
      ...payload,
      type: 'access',
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'invoiceflow',
      audience: 'invoiceflow-users'
    }
  )
}

// Generate refresh token
export const generateRefreshToken = (payload) => {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set')
  }

  return jwt.sign(
    {
      ...payload,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'invoiceflow',
      audience: 'invoiceflow-users'
    }
  )
}

// Generate token pair
export const generateTokenPair = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive
  }

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken({ userId: user._id }),
    expiresIn: JWT_EXPIRES_IN,
    tokenType: 'Bearer'
  }
}

// Verify access token
export const verifyAccessToken = (token) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'invoiceflow',
      audience: 'invoiceflow-users'
    })

    if (decoded.type !== 'access') {
      throw new Error('Invalid token type')
    }

    return decoded
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Access token expired')
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid access token')
    }
    throw error
  }
}

// Verify refresh token
export const verifyRefreshToken = (token) => {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET environment variable is not set')
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'invoiceflow',
      audience: 'invoiceflow-users'
    })

    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type')
    }

    return decoded
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired')
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid refresh token')
    }
    throw error
  }
}

// Extract token from Authorization header
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) {
    return null
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null
  }

  return parts[1]
}

// Generate secure random tokens
export const generateSecureToken = (length = 32) => {
  return crypto.lib.WordArray.random(length/2).toString()
}

// Generate email verification token
export const generateEmailVerificationToken = (userId) => {
  return {
    token: generateSecureToken(),
    userId,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  }
}

// Generate password reset token
export const generatePasswordResetToken = (userId) => {
  return {
    token: generateSecureToken(),
    userId,
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
  }
}

// Hash tokens for database storage
export const hashToken = (token) => {
  return crypto.SHA256(token).toString()
}

// Verify token hash
export const verifyTokenHash = (token, hashedToken) => {
  return hashToken(token) === hashedToken
}

// Check if token is expired
export const isTokenExpired = (expiresAt) => {
  return new Date() > new Date(expiresAt)
}

// Decode token without verification (for debugging)
export const decodeToken = (token) => {
  try {
    return jwt.decode(token, { complete: true })
  } catch (error) {
    return null
  }
}

// Get token expiration time
export const getTokenExpiration = (token) => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.payload.exp) {
      return null
    }
    return new Date(decoded.payload.exp * 1000)
  } catch (error) {
    return null
  }
}

// Validate token format
export const validateTokenFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    return false
  }

  try {
    // Check if parts are valid base64
    for (const part of parts) {
      Buffer.from(part, 'base64')
    }
    return true
  } catch (error) {
    return false
  }
}

// Create session info
export const createSessionInfo = (user, requestInfo = {}) => {
  return {
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    sessionId: generateSecureToken(),
    ipAddress: requestInfo.ipAddress || '',
    userAgent: requestInfo.userAgent || '',
    loginTime: new Date(),
    lastActivity: new Date()
  }
}

// Calculate token refresh time
export const calculateRefreshTime = (expiresIn) => {
  // Refresh token when it has 25% of its lifetime left
  const timeMs = parseExpiration(expiresIn)
  const refreshMs = timeMs * 0.75
  return refreshMs
}

// Parse expiration string to milliseconds
export const parseExpiration = (expiresIn) => {
  const timeValue = parseInt(expiresIn)
  const timeUnit = expiresIn.replace(timeValue.toString(), '')

  switch (timeUnit) {
    case 's':
      return timeValue * 1000
    case 'm':
      return timeValue * 60 * 1000
    case 'h':
      return timeValue * 60 * 60 * 1000
    case 'd':
      return timeValue * 24 * 60 * 60 * 1000
    default:
      return timeValue
  }
}

// Password utilities (using bcryptjs)
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12)
    return bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Error hashing password')
  }
}

export const comparePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}

// Validate password strength
export const validatePasswordStrength = (password) => {
  const errors = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters long')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  // Check for common weak patterns
  if (/^(.)\1+$/.test(password)) {
    errors.push('Password cannot be all the same character')
  }

  if (password.toLowerCase() === 'password') {
    errors.push('Password cannot be "password"')
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  }
}

// Calculate password strength score
export const calculatePasswordStrength = (password) => {
  let score = 0

  // Length bonus
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // Character variety bonus
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1

  // Deduct for common patterns
  if (/^(.)\1+$/.test(password)) score -= 2
  if (password.toLowerCase() === 'password') score -= 2

  if (score < 0) score = 0
  if (score > 5) score = 5

  const strengthLevels = ['very weak', 'weak', 'fair', 'good', 'strong', 'very strong']
  return strengthLevels[score]
}

// Token types
export const TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset'
}

// Error messages
export const AUTH_ERRORS = {
  INVALID_TOKEN: 'Invalid authentication token',
  EXPIRED_TOKEN: 'Authentication token has expired',
  MISSING_TOKEN: 'Authentication token required',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_INACTIVE: 'User account is inactive',
  EMAIL_NOT_VERIFIED: 'Email address not verified',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
  EXPIRED_REFRESH_TOKEN: 'Refresh token has expired'
}