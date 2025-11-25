// TODO: Implement Invoice model with Mongoose schema
export interface Invoice {
  _id?: string
  userId: string
  number: string
  clientId: string
  client: {
    name: string
    email: string
  }
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void'
  date: Date
  dueDate: Date
  description: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  createdAt?: Date
  updatedAt?: Date
}