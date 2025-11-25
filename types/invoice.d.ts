// TODO: Implement invoice type definitions
export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  client: Client
  issueDate: Date
  dueDate: Date
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  items: InvoiceItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface CreateInvoiceData {
  clientId: string
  issueDate: string
  dueDate: string
  items: Omit<InvoiceItem, 'id' | 'total'>[]
  notes?: string
}

import type { Client } from './client'