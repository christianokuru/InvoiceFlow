import User from '../../models/User'

export default defineEventHandler(async (event) => {
  try {
    // Get the authenticated user from the session
    const user = await getUserFromSession(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Find the user in database
    const existingUser = await User.findById(user.id)
    if (!existingUser) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Return user data (excluding password)
    const userData = existingUser.toJSON()
    delete userData.password

    return {
      success: true,
      data: userData
    }

  } catch (error) {
    console.error('Settings fetch error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch settings'
    })
  }
})

// Helper function to get user from session
async function getUserFromSession(event) {
  // In a real app, you'd get the user from the session/token
  // This is a simplified version for demonstration
  try {
    const session = await getUserSession(event)
    return session?.user || null
  } catch (error) {
    // Fallback for testing - in production, this should be properly authenticated
    return {
      id: '64f1a2b3c4d5e6f7g8h9i0j1', // Example user ID
      email: 'test@example.com'
    }
  }
}