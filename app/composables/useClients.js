export const useClients = () => {
  const clientsStore = useClientsStore()
  const uiStore = useUIStore()
  const { authenticatedFetch } = useAuth()

  // Computed properties
  const clients = computed(() => clientsStore.filteredClients)
  const allClients = computed(() => clientsStore.allClients)
  const currentClient = computed(() => clientsStore.client)
  const loading = computed(() => clientsStore.isLoading)
  const error = computed(() => clientsStore.clientsError)
  const stats = computed(() => clientsStore.clientStats)
  const pagination = computed(() => clientsStore.pagination)
  const filters = computed(() => clientsStore.filters)

  // Fetch clients with optional parameters
  const fetchClients = async (params = {}) => {
    try {
      uiStore.setLoading('clients', true)
      return await clientsStore.fetchClients(params)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch clients')
      throw err
    } finally {
      uiStore.setLoading('clients', false)
    }
  }

  // Fetch single client
  const fetchClient = async (id) => {
    try {
      uiStore.setLoading('client', true)
      return await clientsStore.fetchClient(id)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch client')
      throw err
    } finally {
      uiStore.setLoading('client', false)
    }
  }

  // Create new client
  const createClient = async (clientData) => {
    try {
      uiStore.setLoading('createClient', true)
      const result = await clientsStore.createClient(clientData)
      uiStore.showSuccessNotification('Client created successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to create client')
      throw err
    } finally {
      uiStore.setLoading('createClient', false)
    }
  }

  // Update existing client
  const updateClient = async (id, clientData) => {
    try {
      uiStore.setLoading('updateClient', true)
      const result = await clientsStore.updateClient(id, clientData)
      uiStore.showSuccessNotification('Client updated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to update client')
      throw err
    } finally {
      uiStore.setLoading('updateClient', false)
    }
  }

  // Delete client
  const deleteClient = async (id) => {
    const confirmed = await uiStore.confirmAction(
      'Are you sure you want to delete this client? This action cannot be undone and will remove all associated invoices and receipts.',
      'Delete Client'
    )

    if (!confirmed) {
      return { success: false, cancelled: true }
    }

    try {
      uiStore.setLoading('deleteClient', true)
      const result = await clientsStore.deleteClient(id)
      uiStore.showSuccessNotification('Client deleted successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to delete client')
      throw err
    } finally {
      uiStore.setLoading('deleteClient', false)
    }
  }

  // Send welcome email to client
  const sendWelcomeEmail = async (id) => {
    try {
      uiStore.setLoading('sendWelcomeEmail', true)
      const result = await clientsStore.sendWelcomeEmail(id)
      uiStore.showSuccessNotification('Welcome email sent successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to send welcome email')
      throw err
    } finally {
      uiStore.setLoading('sendWelcomeEmail', false)
    }
  }

  // Generate client statement
  const generateStatement = async (id, dateRange) => {
    try {
      uiStore.setLoading('generateStatement', true)
      const result = await clientsStore.generateStatement(id, dateRange)
      uiStore.showSuccessNotification('Client statement generated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to generate client statement')
      throw err
    } finally {
      uiStore.setLoading('generateStatement', false)
    }
  }

  // Update filters
  const updateFilters = (newFilters) => {
    clientsStore.updateFilters(newFilters)
  }

  // Reset filters
  const resetFilters = () => {
    clientsStore.resetFilters()
  }

  // Set pagination
  const setPagination = (page, limit) => {
    clientsStore.setPagination(page, limit)
  }

  // Get client by ID
  const getClientById = (id) => {
    return allClients.value.find(client => client.id === id)
  }

  // Get client by email
  const getClientByEmail = (email) => {
    return allClients.value.find(client => client.email.toLowerCase() === email.toLowerCase())
  }

  // Get active clients
  const getActiveClients = () => {
    return allClients.value.filter(client => client.status === 'active')
  }

  // Get inactive clients
  const getInactiveClients = () => {
    return allClients.value.filter(client => client.status === 'inactive')
  }

  // Search clients
  const searchClients = (query) => {
    const searchTerm = query.toLowerCase()
    return allClients.value.filter(client =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.phone?.toLowerCase().includes(searchTerm) ||
      client.company?.toLowerCase().includes(searchTerm) ||
      client.address?.toLowerCase().includes(searchTerm)
    )
  }

  // Export clients to different formats
  const exportClients = async (format = 'csv', filters = {}) => {
    try {
      uiStore.setLoading('exportClients', true)
      const response = await authenticatedFetch('/api/clients/export', {
        method: 'GET',
        query: { format, ...filters }
      })

      if (format === 'csv') {
        // Download CSV file
        const blob = new Blob([response.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `clients-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      }

      uiStore.showSuccessNotification('Clients exported successfully')
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to export clients')
      throw err
    } finally {
      uiStore.setLoading('exportClients', false)
    }
  }

  // Import clients from CSV
  const importClients = async (file) => {
    try {
      uiStore.setLoading('importClients', true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await authenticatedFetch('/api/clients/import', {
        method: 'POST',
        body: formData
      })

      uiStore.showSuccessNotification(`${response.data.imported} clients imported successfully`)
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to import clients')
      throw err
    } finally {
      uiStore.setLoading('importClients', false)
    }
  }

  // Get client statistics
  const getClientStatistics = async (id) => {
    try {
      uiStore.setLoading('clientStats', true)
      const response = await authenticatedFetch(`/api/clients/${id}/statistics`, {
        method: 'GET'
      })
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch client statistics')
      throw err
    } finally {
      uiStore.setLoading('clientStats', false)
    }
  }

  // Add note to client
  const addClientNote = async (id, note) => {
    try {
      uiStore.setLoading('addNote', true)
      const result = await clientsStore.addClientNote(id, note)
      uiStore.showSuccessNotification('Note added successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to add note')
      throw err
    } finally {
      uiStore.setLoading('addNote', false)
    }
  }

  // Validate client data
  const validateClient = (clientData) => {
    const errors = []

    if (!clientData.name?.trim()) {
      errors.push('Client name is required')
    }

    if (!clientData.email?.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)) {
      errors.push('Please enter a valid email address')
    }

    if (clientData.phone && !/^[\d\s\-\+\(\)]+$/.test(clientData.phone)) {
      errors.push('Please enter a valid phone number')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Clear current client
  const clearCurrentClient = () => {
    clientsStore.clearCurrentClient()
  }

  // Clear error
  const clearError = () => {
    clientsStore.clearError()
  }

  return {
    // State
    clients,
    allClients,
    currentClient,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Actions
    fetchClients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    sendWelcomeEmail,
    generateStatement,
    updateFilters,
    resetFilters,
    setPagination,
    getClientById,
    getClientByEmail,
    getActiveClients,
    getInactiveClients,
    searchClients,
    exportClients,
    importClients,
    getClientStatistics,
    addClientNote,
    validateClient,
    clearCurrentClient,
    clearError
  }
}