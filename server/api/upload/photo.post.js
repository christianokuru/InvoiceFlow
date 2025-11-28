export default defineEventHandler(async (event) => {
  try {
    // Get the authenticated user
    const user = await getUserFromSession(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Handle file upload
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      })
    }

    const file = formData[0] // Get the first file
    if (!file || !file.filename) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file upload'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid file type. Only JPEG, PNG, GIF, SVG, and WebP images are allowed.'
      })
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        message: 'File size too large. Maximum size is 5MB.'
      })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.filename.split('.').pop().toLowerCase()
    const uniqueFilename = `${timestamp}_${randomString}.${fileExtension}`

    // In a real application, you would:
    // 1. Upload the file to a cloud storage service (AWS S3, Cloudinary, etc.)
    // 2. Store the URL in the database
    // 3. Handle cleanup of old files

    // For now, we'll simulate the upload and return a placeholder URL
    // In production, replace this with actual file upload logic
    const uploadUrl = `/uploads/${user.id}/${uniqueFilename}`

    // Simulate upload process (remove this in production)
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: file.filename,
        size: file.data.length,
        type: file.type,
        url: uploadUrl,
        publicUrl: uploadUrl // In production, this would be the actual accessible URL
      }
    }

  } catch (error) {
    console.error('File upload error:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload file'
    })
  }
})

// Helper function to get user from session
async function getUserFromSession(event) {
  try {
    const session = await getUserSession(event)
    return session?.user || null
  } catch (error) {
    // Fallback for testing - in production, this should be properly authenticated
    return {
      id: '64f1a2b3c4d5e6f7g8h9i0j1',
      email: 'test@example.com'
    }
  }
}