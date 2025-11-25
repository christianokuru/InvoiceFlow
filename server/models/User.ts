// TODO: Implement User model with Mongoose schema
export interface User {
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  subscriptionStatus?: 'trial' | 'active' | 'inactive'
  trialEndsAt?: Date
  createdAt?: Date
  updatedAt?: Date
}