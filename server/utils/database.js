import mongoose from 'mongoose'

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection
    }

    const mongoUri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB_NAME

    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set')
    }

    const connectionOptions = {
      dbName: dbName || 'invoiceflow',
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    await mongoose.connect(mongoUri, connectionOptions)
    return mongoose.connection

  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

export const disconnectFromDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
      console.log('Database disconnected successfully')
    }
  } catch (error) {
    console.error('Database disconnection error:', error)
    throw error
  }
}

export const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }
  return {
    state: states[mongoose.connection.readyState],
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    port: mongoose.connection.port
  }
}

export const healthCheck = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected')
    }

    // Simple ping operation
    await mongoose.connection.db.admin().ping()
    return {
      status: 'healthy',
      message: 'Database connection is working',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: error.message,
      timestamp: new Date().toISOString()
    }
  }
}