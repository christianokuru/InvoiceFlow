// TODO: Implement email utility functions
export const sendEmail = async (options: {
  to: string
  subject: string
  text?: string
  html?: string
}) => {
  // Email sending logic will go here
}

export const sendInvoiceEmail = async (invoiceId: string) => {
  // Invoice email sending logic will go here
}

export const sendReceiptEmail = async (receiptId: string) => {
  // Receipt email sending logic will go here
}