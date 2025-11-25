// TODO: Implement global type definitions
export interface BaseResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}