import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
  try {
    const mongoUri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB_NAME

    if (!mongoUri) {
      console.error('MONGODB_URI environment variable is not set')
      process.exit(1)
    }

    const connectionOptions = {
      dbName: dbName || 'invoiceflow',
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    await mongoose.connect(mongoUri, connectionOptions)

    console.log(`✅ MongoDB connected successfully to database: ${dbName || 'invoiceflow'}`)

    // Graceful shutdown
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected')
    })

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      console.log('🔌 MongoDB connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message)
    process.exit(1)
  }
})