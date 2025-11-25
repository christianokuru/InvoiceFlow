// TODO: Implement Client model with Mongoose schema
export interface Client {
  _id?: string
  userId: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  status: 'active' | 'inactive'
  totalInvoices?: number
  totalAmount?: number
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}