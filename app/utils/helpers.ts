// TODO: Implement utility helper functions
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  // Currency formatting logic will be implemented here
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export const formatDate = (date: Date): string => {
  // Date formatting logic will be implemented here
  return date.toLocaleDateString('en-US')
}

export const generateInvoiceNumber = (): string => {
  // Invoice number generation logic will be implemented here
  return `INV-${Date.now()}`
}

export const generateReceiptNumber = (): string => {
  // Receipt number generation logic will be implemented here
  return `REC-${Date.now()}`
}