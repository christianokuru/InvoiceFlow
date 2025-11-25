// TODO: Implement invoice type definitions
export interface CreateInvoiceRequest {
  clientId: string
  amount: number
  description: string
  status?: 'draft' | 'sent' | 'paid' | 'overdue'
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
}

export interface UpdateInvoiceRequest {
  clientId?: string
  amount?: number
  description?: string
  status?: 'draft' | 'sent' | 'paid' | 'overdue'
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
}

export interface InvoiceFilters {
  status?: string
  clientId?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}