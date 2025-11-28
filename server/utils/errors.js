// server/utils/errors.js
export class DatabaseError extends Error {
  constructor(message, code = 'DATABASE_ERROR', statusCode = 500, details = {}) {
    super(message)
    this.name = 'DatabaseError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    this.timestamp = new Date().toISOString()
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.details,
        timestamp: this.timestamp
      }
    }
  }
}

export class ValidationError extends DatabaseError {
  constructor(message, field = null, value = null) {
    super(message, 'VALIDATION_ERROR', 400, { field, value })
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resource = 'Resource', id = null) {
    super(`${resource}${id ? ` with ID ${id}` : ''} not found`, 'NOT_FOUND', 404, { resource, id })
    this.name = 'NotFoundError'
  }
}

export class DuplicateError extends DatabaseError {
  constructor(resource = 'Resource', field = null, value = null) {
    const message = field ? `${resource} with ${field} '${value}' already exists` : `${resource} already exists`
    super(message, 'DUPLICATE_ERROR', 409, { resource, field, value })
    this.name = 'DuplicateError'
  }
}

export class UnauthorizedError extends DatabaseError {
  constructor(message = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends DatabaseError {
  constructor(message = 'Access forbidden') {
    super(message, 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

// Error handling utility functions
export const handleDatabaseError = (error, context = 'database operation') => {
  console.error(`Database error in ${context}:`, error)

  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message,
      value: err.value
    }))

    return new ValidationError(
      'Validation failed',
      'validation',
      errors
    )
  }

  // Mongoose cast errors
  if (error.name === 'CastError') {
    return new ValidationError(
      `Invalid ${error.path}: ${error.value}`,
      error.path,
      error.value
    )
  }

  // MongoDB duplicate key errors
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    const value = error.keyValue[field]
    return new DuplicateError('Document', field, value)
  }

  // Mongoose version error
  if (error.name === 'VersionError') {
    return new DatabaseError(
      'Document was modified by another process. Please refresh and try again.',
      'VERSION_ERROR',
      409
    )
  }

  // MongoDB connection errors
  if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
    return new DatabaseError(
      'Database connection error. Please try again later.',
      'CONNECTION_ERROR',
      503
    )
  }

  // MongoDB server selection errors
  if (error.name === 'MongoServerError') {
    if (error.code === 13) {
      return new ForbiddenError('Insufficient permissions for this operation')
    }
    if (error.code === 18) {
      return new UnauthorizedError('Authentication failed')
    }
    return new DatabaseError(
      `Database server error: ${error.message}`,
      'SERVER_ERROR',
      500
    )
  }

  // Generic database errors
  return new DatabaseError(
    error.message || 'An unexpected database error occurred',
    'DATABASE_ERROR',
    500,
    { originalError: error.name }
  )
}

// Success response utility
export const createSuccessResponse = (data, message = 'Operation successful', meta = {}) => {
  return {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  }
}

// Error response utility
export const createErrorResponse = (error, context = 'api') => {
  if (error instanceof DatabaseError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: error.timestamp
      }
    }
  }

  // Handle unexpected errors
  console.error(`Unexpected error in ${context}:`, error)
  return {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred. Please try again.',
      timestamp: new Date().toISOString()
    }
  }
}

// Async error handler wrapper
export const asyncHandler = (fn) => {
  return (event) => {
    return Promise.resolve(fn(event)).catch(error => {
      const handledError = handleDatabaseError(error)
      throw createError({
        statusCode: handledError.statusCode,
        statusMessage: handledError.code,
        data: createErrorResponse(handledError)
      })
    })
  }
}

// Database operation wrapper with error handling
export const withDatabaseErrorHandling = async (operation, context = 'database operation') => {
  try {
    return await operation()
  } catch (error) {
    throw handleDatabaseError(error, context)
  }
}

// Validation helper
export const validateRequired = (data, requiredFields) => {
  const missing = requiredFields.filter(field => {
    const value = data[field]
    return value === undefined || value === null || value === ''
  })

  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missing.join(', ')}`,
      'required_fields',
      missing
    )
  }

  return true
}

// Pagination helper
export const createPaginationOptions = (query) => {
  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 25
  const skip = (page - 1) * limit

  // Validate pagination parameters
  if (page < 1) {
    throw new ValidationError('Page must be a positive integer', 'page', page)
  }

  if (limit < 1 || limit > 100) {
    throw new ValidationError('Limit must be between 1 and 100', 'limit', limit)
  }

  return {
    page,
    limit,
    skip,
    sort: query.sort || '-createdAt'
  }
}

// Create pagination metadata
export const createPaginationMeta = (page, limit, total, baseUrl) => {
  const totalPages = Math.ceil(total / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return {
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
      prevPage: hasPrevPage ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null
    }
  }
}