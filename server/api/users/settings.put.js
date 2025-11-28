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

    const body = await readBody(event)
    const { type, payload } = body

    // Find the user in database
    const existingUser = await User.findById(user.id)
    if (!existingUser) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Update settings based on type
    switch (type) {
      case 'profile':
        // Handle profile updates (name, phone, photo)
        if (payload.profile) {
          if (payload.profile.name) {
            existingUser.name = payload.profile.name
          }
          if (payload.profile.phone !== undefined) {
            existingUser.phone = payload.profile.phone
          }
          if (payload.profile.photo !== undefined) {
            existingUser.photo = payload.profile.photo
          }
        }
        break

      case 'password':
        // Handle password change
        if (payload.password) {
          // In a real app, you'd verify the current password and hash the new one
          // existingUser.password = await hashPassword(payload.password.newPassword)
          // This is a simplified version
          existingUser.password = payload.password.hashedPassword || payload.password.newPassword
        }
        break

      case 'business':
        // Handle business settings
        if (payload.business) {
          existingUser.business = {
            ...existingUser.business,
            ...payload.business
          }
        }
        break

      case 'notifications':
        // Handle notification settings
        if (payload.notificationSettings) {
          existingUser.notificationSettings = {
            ...existingUser.notificationSettings,
            ...payload.notificationSettings
          }
        }
        break

      case 'appearance':
        // Handle appearance settings
        if (payload.appearanceSettings) {
          existingUser.appearanceSettings = {
            ...existingUser.appearanceSettings,
            ...payload.appearanceSettings
          }
        }
        break

      default:
        throw createError({
          statusCode: 400,
          message: 'Invalid update type'
        })
    }

    // Save the updated user
    await existingUser.save()

    // Return updated user data (excluding password)
    const updatedUser = existingUser.toJSON()
    delete updatedUser.password

    return {
      success: true,
      message: 'Settings updated successfully',
      data: updatedUser
    }

  } catch (error) {
    console.error('Settings update error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update settings'
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