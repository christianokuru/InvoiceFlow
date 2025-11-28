export const useReceipts = () => {
  const receiptsStore = useReceiptsStore()
  const uiStore = useUIStore()
  const { authenticatedFetch } = useAuth()

  // Computed properties
  const receipts = computed(() => receiptsStore.filteredReceipts)
  const allReceipts = computed(() => receiptsStore.allReceipts)
  const currentReceipt = computed(() => receiptsStore.receipt)
  const loading = computed(() => receiptsStore.isLoading)
  const error = computed(() => receiptsStore.receiptsError)
  const stats = computed(() => receiptsStore.receiptStats)
  const pagination = computed(() => receiptsStore.pagination)
  const filters = computed(() => receiptsStore.filters)

  // Fetch receipts with optional parameters
  const fetchReceipts = async (params = {}) => {
    try {
      uiStore.setLoading('receipts', true)
      return await receiptsStore.fetchReceipts(params)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch receipts')
      throw err
    } finally {
      uiStore.setLoading('receipts', false)
    }
  }

  // Fetch single receipt
  const fetchReceipt = async (id) => {
    try {
      uiStore.setLoading('receipt', true)
      return await receiptsStore.fetchReceipt(id)
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to fetch receipt')
      throw err
    } finally {
      uiStore.setLoading('receipt', false)
    }
  }

  // Create new receipt
  const createReceipt = async (receiptData) => {
    try {
      uiStore.setLoading('createReceipt', true)
      const result = await receiptsStore.createReceipt(receiptData)
      uiStore.showSuccessNotification('Receipt created successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to create receipt')
      throw err
    } finally {
      uiStore.setLoading('createReceipt', false)
    }
  }

  // Update existing receipt
  const updateReceipt = async (id, receiptData) => {
    try {
      uiStore.setLoading('updateReceipt', true)
      const result = await receiptsStore.updateReceipt(id, receiptData)
      uiStore.showSuccessNotification('Receipt updated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to update receipt')
      throw err
    } finally {
      uiStore.setLoading('updateReceipt', false)
    }
  }

  // Delete receipt
  const deleteReceipt = async (id) => {
    const confirmed = await uiStore.confirmAction(
      'Are you sure you want to delete this receipt? This action cannot be undone.',
      'Delete Receipt'
    )

    if (!confirmed) {
      return { success: false, cancelled: true }
    }

    try {
      uiStore.setLoading('deleteReceipt', true)
      const result = await receiptsStore.deleteReceipt(id)
      uiStore.showSuccessNotification('Receipt deleted successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to delete receipt')
      throw err
    } finally {
      uiStore.setLoading('deleteReceipt', false)
    }
  }

  // Send receipt via email
  const sendReceipt = async (id, emailData) => {
    try {
      uiStore.setLoading('sendReceipt', true)
      const result = await receiptsStore.sendReceipt(id, emailData)
      uiStore.showSuccessNotification('Receipt sent successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to send receipt')
      throw err
    } finally {
      uiStore.setLoading('sendReceipt', false)
    }
  }

  // Duplicate receipt
  const duplicateReceipt = async (id) => {
    try {
      uiStore.setLoading('duplicateReceipt', true)
      const result = await receiptsStore.duplicateReceipt(id)
      uiStore.showSuccessNotification('Receipt duplicated successfully')
      return result
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to duplicate receipt')
      throw err
    } finally {
      uiStore.setLoading('duplicateReceipt', false)
    }
  }

  // Generate receipt number
  const generateReceiptNumber = () => {
    const currentYear = new Date().getFullYear()
    const maxNumber = allReceipts.value.reduce((max, receipt) => {
      const match = receipt.number.match(/RCP-(\d{4})-(\d{3})/)
      if (match && parseInt(match[1]) === currentYear) {
        const num = parseInt(match[2])
        return num > max ? num : max
      }
      return max
    }, 0)

    return `RCP-${currentYear}-${String(maxNumber + 1).padStart(3, '0')}`
  }

  // Update filters
  const updateFilters = (newFilters) => {
    receiptsStore.updateFilters(newFilters)
  }

  // Reset filters
  const resetFilters = () => {
    receiptsStore.resetFilters()
  }

  // Set pagination
  const setPagination = (page, limit) => {
    receiptsStore.setPagination(page, limit)
  }

  // Get receipt by ID
  const getReceiptById = (id) => {
    return allReceipts.value.find(receipt => receipt.id === id)
  }

  // Get receipts by client
  const getReceiptsByClient = (clientId) => {
    return allReceipts.value.filter(receipt => receipt.clientId === clientId)
  }

  // Get receipts by payment method
  const getReceiptsByPaymentMethod = (paymentMethod) => {
    return allReceipts.value.filter(receipt => receipt.paymentMethod === paymentMethod)
  }

  // Search receipts
  const searchReceipts = (query) => {
    return allReceipts.value.filter(receipt =>
      receipt.client.toLowerCase().includes(query.toLowerCase()) ||
      receipt.number.toLowerCase().includes(query.toLowerCase()) ||
      receipt.description?.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Export receipts to different formats
  const exportReceipts = async (format = 'csv', filters = {}) => {
    try {
      uiStore.setLoading('exportReceipts', true)
      const response = await authenticatedFetch('/api/receipts/export', {
        method: 'GET',
        query: { format, ...filters }
      })

      if (format === 'csv') {
        // Download CSV file
        const blob = new Blob([response.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `receipts-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
      }

      uiStore.showSuccessNotification('Receipts exported successfully')
      return response
    } catch (err) {
      uiStore.showErrorNotification(err.message, 'Failed to export receipts')
      throw err
    } finally {
      uiStore.setLoading('exportReceipts', false)
    }
  }

  // Generate PDF for receipt
  const generatePDF = async (id) => {
    try {
      uiStore.setLoading('generatePDF', true)
      const response = await authenticatedFetch(`/api/receipts/${id}/pdf`, {
        method: 'GET'
      })

      // Download PDF file
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const receipt = getReceiptById(id)
      a.download = `${receipt?.number || 'receipt'}.pdf`
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

  // Clear current receipt
  const clearCurrentReceipt = () => {
    receiptsStore.clearCurrentReceipt()
  }

  // Clear error
  const clearError = () => {
    receiptsStore.clearError()
  }

  return {
    // State
    receipts,
    allReceipts,
    currentReceipt,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Actions
    fetchReceipts,
    fetchReceipt,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    sendReceipt,
    duplicateReceipt,
    generateReceiptNumber,
    updateFilters,
    resetFilters,
    setPagination,
    getReceiptById,
    getReceiptsByClient,
    getReceiptsByPaymentMethod,
    searchReceipts,
    exportReceipts,
    generatePDF,
    clearCurrentReceipt,
    clearError
  }
}