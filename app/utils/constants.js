// TODO: Implement application constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password'
  },
  INVOICES: '/api/invoices',
  RECEIPTS: '/api/receipts',
  CLIENTS: '/api/clients',
  PAYMENTS: '/api/payments',
  UPLOAD: '/api/upload'
}

export const INVOICE_STATUSES = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  VOID: 'void'
} as const

export const RECEIPT_CATEGORIES = [
  'Office Supplies',
  'Software',
  'Travel',
  'Meals',
  'Marketing',
  'Professional Services',
  'Equipment',
  'Other'
] as const