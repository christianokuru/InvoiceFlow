// TODO: Implement authentication type definitions
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  businessName?: string
  phoneNumber?: string
  isActive: boolean
  emailVerified: boolean
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  businessName?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}