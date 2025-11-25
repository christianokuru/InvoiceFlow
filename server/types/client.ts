// TODO: Implement client type definitions
export interface CreateClientRequest {
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  notes?: string
}

export interface UpdateClientRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  status?: 'active' | 'inactive'
  notes?: string
}

export interface ClientFilters {
  status?: string
  search?: string
}