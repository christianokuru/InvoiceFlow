// TODO: Implement History model with Mongoose schema
export interface History {
  _id?: string
  userId: string
  type: 'invoice' | 'receipt' | 'email' | 'payment' | 'client'
  action: string
  title: string
  description: string
  amount?: number
  relatedId?: string
  date: Date
  metadata?: Record<string, any>
  createdAt?: Date
}