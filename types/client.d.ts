// TODO: Implement client type definitions
export interface Client {
  id: string
  name: string
  email: string
  phoneNumber?: string
  address?: Address
  businessName?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface CreateClientData {
  name: string
  email: string
  phoneNumber?: string
  address?: Address
  businessName?: string
}