export const useInvoices = () => {
  const invoicesStore = useInvoicesStore()
  const uiStore = useUIStore()
  const { authenticatedFetch } = useAuth()

  // Computed properties
  const invoices = computed(() => invoicesStore.filteredInvoices)
  const allInvoices = computed(() => invoicesStore.allInvoices)
  const currentInvoice = computed(() => invoicesStore.invoice)
  const loading = computed(() => invoicesStore.isLoading)
  const error = computed(() => invoicesStore.invoicesError)
  const stats = computed(() => invoicesStore.invoiceStats)
  const pagination = computed(() => invoicesStore.pagination)
  const filters = computed(() => invoicesStore.filters)

  // Fetch invoices with optional parameters
  const fetchInvoices = async (params = {}) => {
    try {
      uiStore.setLoading('invoices', true)
      return await invoicesStore.fetchInvoices(params)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch invoices')
      throw err
    } finally {
      uiStore.setLoading('invoices', false)
    }
  }

  // Fetch single invoice
  const fetchInvoice = async (id) => {
    try {
      uiStore.setLoading('invoice', true)
      return await invoicesStore.fetchInvoice(id)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch invoice')
      throw err
    } finally {
      uiStore.setLoading('invoice', false)
    }
  }

  // Create new invoice
  const createInvoice = async (invoiceData) => {
    try {
      uiStore.setLoading('createInvoice', true)
      const result = await invoicesStore.createInvoice(invoiceData)
      uiStore.showSuccessNotification('Invoice created successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to create invoice')
      throw err
    } finally {
      uiStore.setLoading('createInvoice', false)
    }
  }

  // Update existing invoice
  const updateInvoice = async (id, invoiceData) => {
    try {
      uiStore.setLoading('updateInvoice', true)
      const result = await invoicesStore.updateInvoice(id, invoiceData)
      uiStore.showSuccessNotification('Invoice updated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to update invoice')
      throw err
    } finally {
      uiStore.setLoading('updateInvoice', false)
    }
  }

  // Delete invoice
  const deleteInvoice = async (id) => {
    const confirmed = await uiStore.confirmAction(
      'Are you sure you want to delete this invoice? This action cannot be undone.',
      'Delete Invoice'
    )

    if (!confirmed) {
      return { success: false, cancelled: true }
    }

    try {
      uiStore.setLoading('deleteInvoice', true)
      const result = await invoicesStore.deleteInvoice(id)
      uiStore.showSuccessNotification('Invoice deleted successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to delete invoice')
      throw err
    } finally {
      uiStore.setLoading('deleteInvoice', false)
    }
  }

  // Send invoice via email
  const sendInvoice = async (id, emailData) => {
    try {
      uiStore.setLoading('sendInvoice', true)
      const result = await invoicesStore.sendInvoice(id, emailData)
      uiStore.showSuccessNotification('Invoice sent successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to send invoice')
      throw err
    } finally {
      uiStore.setLoading('sendInvoice', false)
    }
  }

  // Duplicate invoice
  const duplicateInvoice = async (id) => {
    try {
      uiStore.setLoading('duplicateInvoice', true)
      const result = await invoicesStore.duplicateInvoice(id)
      uiStore.showSuccessNotification('Invoice duplicated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to duplicate invoice')
      throw err
    } finally {
      uiStore.setLoading('duplicateInvoice', false)
    }
  }

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const currentYear = new Date().getFullYear()
    const maxNumber = allInvoices.value.reduce((max, invoice) => {
      const match = invoice.number.match(/INV-(\d{4})-(\d{3})/)
      if (match && parseInt(match[1]) === currentYear) {
        const num = parseInt(match[2])
        return num > max ? num : max
      }
      return max
    }, 0)

    return `INV-${currentYear}-${String(maxNumber + 1).padStart(3, '0')}`
  }

  // Update filters
  const updateFilters = (newFilters) => {
    invoicesStore.updateFilters(newFilters)
  }

  // Reset filters
  const resetFilters = () => {
    invoicesStore.resetFilters()
  }

  // Set pagination
  const setPagination = (page, limit) => {
    invoicesStore.setPagination(page, limit)
  }

  // Get invoice by ID
  const getInvoiceById = (id) => {
    return allInvoices.value.find(invoice => invoice.id === id)
  }

  // Get invoices by client
  const getInvoicesByClient = (clientId) => {
    return allInvoices.value.filter(invoice => invoice.clientId === clientId)
  }

  // Get invoices by status
  const getInvoicesByStatus = (status) => {
    return allInvoices.value.filter(invoice => invoice.status === status)
  }

  // Search invoices
  const searchInvoices = (query) => {
    return allInvoices.value.filter(invoice =>
      invoice.client.toLowerCase().includes(query.toLowerCase()) ||
      invoice.number.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Export invoices to different formats
  const exportInvoices = async (format = 'csv', filters = {}) => {
    try {
      uiStore.setLoading('exportInvoices', true)
      const response = await authenticatedFetch('/api/invoices/export', {
        method: 'GET',
        query: { format, ...filters }
      })

      if (format === 'csv') {
        // Download CSV file
        const blob = new Blob([response.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      }

      uiStore.showSuccessNotification('Invoices exported successfully')
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to export invoices')
      throw err
    } finally {
      uiStore.setLoading('exportInvoices', false)
    }
  }

  // Generate PDF for invoice
  const generatePDF = async (id) => {
    try {
      uiStore.setLoading('generatePDF', true)
      const response = await authenticatedFetch(`/api/invoices/${id}/pdf`, {
        method: 'GET'
      })

      // Download PDF file
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const invoice = getInvoiceById(id)
      a.download = `${invoice?.number || 'invoice'}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)

      uiStore.showSuccessNotification('PDF generated successfully')
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to generate PDF')
      throw err
    } finally {
      uiStore.setLoading('generatePDF', false)
    }
  }

  // Mark invoice as paid
  const markAsPaid = async (id) => {
    try {
      uiStore.setLoading('markAsPaid', true)
      const result = await invoicesStore.updateInvoice(id, { status: 'paid' })
      uiStore.showSuccessNotification('Invoice marked as paid')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to mark invoice as paid')
      throw err
    } finally {
      uiStore.setLoading('markAsPaid', false)
    }
  }

  // Clear current invoice
  const clearCurrentInvoice = () => {
    invoicesStore.clearCurrentInvoice()
  }

  // Clear error
  const clearError = () => {
    invoicesStore.clearError()
  }

  return {
    // State
    invoices,
    allInvoices,
    currentInvoice,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Actions
    fetchInvoices,
    fetchInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    sendInvoice,
    duplicateInvoice,
    generateInvoiceNumber,
    updateFilters,
    resetFilters,
    setPagination,
    getInvoiceById,
    getInvoicesByClient,
    getInvoicesByStatus,
    searchInvoices,
    exportInvoices,
    generatePDF,
    markAsPaid,
    clearCurrentInvoice,
    clearError
  }
}