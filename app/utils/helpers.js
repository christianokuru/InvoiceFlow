// TODO: Implement utility helper functions

export const formatDate = (date: Date) => {
  // Date formatting logic will be implemented here
  return date.toLocaleDateString('en-US')
}

export const generateInvoiceNumber = () => {
  // Invoice number generation logic will be implemented here
  return `INV-${Date.now()}`
}

export const generateReceiptNumber = () => {
  // Receipt number generation logic will be implemented here
  return `REC-${Date.now()}`
}