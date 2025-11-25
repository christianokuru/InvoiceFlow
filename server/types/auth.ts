// TODO: Implement authentication type definitions
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  user?: any
  token?: string
  refreshToken?: string
  message?: string
}

export interface JwtPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}