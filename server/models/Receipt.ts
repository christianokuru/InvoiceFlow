// TODO: Implement Receipt model with Mongoose schema
export interface Receipt {
  _id?: string
  userId: string
  number: string
  clientId: string
  client: {
    name: string
    email: string
  }
  amount: number
  category: string
  date: Date
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