// TODO: Implement receipt type definitions
export interface CreateReceiptRequest {
  clientId: string
  amount: number
  category: string
  description: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
}

export interface UpdateReceiptRequest {
  clientId?: string
  amount?: number
  category?: string
  description?: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
}

export interface ReceiptFilters {
  category?: string
  clientId?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}