// TODO: Implement receipt type definitions
export interface Receipt {
  id: string
  receiptNumber: string
  clientId: string
  client: Client
  issueDate: Date
  category: string
  items: ReceiptItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface ReceiptItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface CreateReceiptData {
  clientId: string
  issueDate: string
  category: string
  items: Omit<ReceiptItem, 'id' | 'total'>[]
  notes?: string
}

import type { Client } from './client'