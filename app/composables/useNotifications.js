import { useUIStore } from '../../stores/ui'

export const useNotifications = () => {
  const uiStore = useUIStore()
  const { authenticatedFetch } = useAuth()

  // Computed properties
  const notifications = computed(() => uiStore.notifications)
  const unreadCount = computed(() => uiStore.notifications.filter(n => !n.read).length)
  const hasNotifications = computed(() => uiStore.notifications.length > 0)

  // Show success notification
  const showSuccess = (message, title = 'Success', options = {}) => {
    return uiStore.showSuccessNotification(message, title, options)
  }

  // Show error notification
  const showError = (message, title = 'Error', options = {}) => {
    return uiStore.showErrorNotification(message, title, options)
  }

  // Show warning notification
  const showWarning = (message, title = 'Warning', options = {}) => {
    return uiStore.showNotification({
      type: 'warning',
      message,
      title,
      ...options
    })
  }

  // Show info notification
  const showInfo = (message, title = 'Info', options = {}) => {
    return uiStore.showNotification({
      type: 'info',
      message,
      title,
      ...options
    })
  }

  // Show custom notification
  const showNotification = (notification) => {
    return uiStore.showNotification(notification)
  }

  // Hide specific notification
  const hideNotification = (id) => {
    return uiStore.hideNotification(id)
  }

  // Clear all notifications
  const clearAll = () => {
    return uiStore.clearNotifications()
  }

  // Mark notification as read
  const markAsRead = (id) => {
    return uiStore.markNotificationAsRead(id)
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    return uiStore.markAllNotificationsAsRead()
  }

  // Show loading notification
  const showLoading = (message, title = 'Loading...', options = {}) => {
    return uiStore.showNotification({
      type: 'loading',
      message,
      title,
      persistent: true,
      closable: false,
      ...options
    })
  }

  // Show progress notification
  const showProgress = (message, progress, title = 'Processing...', options = {}) => {
    return uiStore.showNotification({
      type: 'progress',
      message,
      title,
      progress,
      persistent: true,
      closable: false,
      ...options
    })
  }

  // Update progress notification
  const updateProgress = (id, progress, message) => {
    return uiStore.updateNotification(id, { progress, message })
  }

  // Show confirmation dialog
  const confirm = (message, title = 'Confirm Action', options = {}) => {
    return uiStore.confirmAction(message, title, options)
  }

  // Show toast notification (auto-dismiss)
  const showToast = (message, type = 'info', options = {}) => {
    const defaultOptions = {
      type,
      message,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      autoHide: true,
      duration: 3000,
      position: 'top-right'
    }

    return uiStore.showNotification({ ...defaultOptions, ...options })
  }

  // Show persistent notification
  const showPersistent = (message, type = 'info', title, options = {}) => {
    const defaultOptions = {
      type,
      message,
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      autoHide: false,
      persistent: true,
      closable: true
    }

    return uiStore.showNotification({ ...defaultOptions, ...options })
  }

  // Show notification with actions
  const showWithActions = (message, actions, type = 'info', title, options = {}) => {
    const defaultOptions = {
      type,
      message,
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      actions,
      persistent: true,
      closable: true
    }

    return uiStore.showNotification({ ...defaultOptions, ...options })
  }

  // Fetch system notifications
  const fetchNotifications = async () => {
    try {
      const response = await authenticatedFetch('/api/notifications')
      return response
    } catch (err) {
      showError('Failed to fetch notifications')
      throw err
    }
  }

  // Mark notification as read on server
  const markAsReadOnServer = async (id) => {
    try {
      const response = await authenticatedFetch(`/api/notifications/${id}/read`, {
        method: 'PATCH'
      })
      return response
    } catch (err) {
      showError('Failed to mark notification as read')
      throw err
    }
  }

  // Delete notification from server
  const deleteNotification = async (id) => {
    try {
      const response = await authenticatedFetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      })
      hideNotification(id)
      return response
    } catch (err) {
      showError('Failed to delete notification')
      throw err
    }
  }

  // Get notifications by type
  const getByType = (type) => {
    return notifications.value.filter(n => n.type === type)
  }

  // Get unread notifications
  const getUnread = () => {
    return notifications.value.filter(n => !n.read)
  }

  // Get recent notifications (last 24 hours)
  const getRecent = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return notifications.value.filter(n => new Date(n.timestamp) > oneDayAgo)
  }

  // Show notification for form validation errors
  const showValidationErrors = (errors, title = 'Validation Error') => {
    const message = Array.isArray(errors) ? errors.join(', ') : errors
    return showError(message, title)
  }

  // Show notification for API errors
  const showApiError = (error, context = 'operation') => {
    const message = error.response?.data?.message || error.message || `Failed to ${context}`
    return showError(message, `${context} Failed`)
  }

  // Show notification for successful API operation
  const showApiSuccess = (message, context = 'operation') => {
    const title = `${context.charAt(0).toUpperCase() + context.slice(1)} Successful`
    return showSuccess(message, title)
  }

  // Setup notification preferences
  const setupPreferences = (preferences) => {
    return uiStore.setNotificationPreferences(preferences)
  }

  // Get notification preferences
  const getPreferences = () => {
    return uiStore.notificationPreferences
  }

  // Enable/disable notifications
  const toggleNotifications = (enabled) => {
    return uiStore.setNotificationsEnabled(enabled)
  }

  // Request browser notification permission
  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }

  // Show browser notification
  const showBrowserNotification = (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      return new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })
    }
    return null
  }

  // Show notification both in-app and browser
  const showDualNotification = (message, type = 'info', title, browserOptions = {}) => {
    // Show in-app notification
    const inAppId = showNotification({
      type,
      message,
      title: title || type.charAt(0).toUpperCase() + type.slice(1)
    })

    // Show browser notification if permission granted
    const browserNotification = showBrowserNotification(title || 'Notification', {
      body: message,
      ...browserOptions
    })

    return { inAppId, browserNotification }
  }

  return {
    // State
    notifications,
    unreadCount,
    hasNotifications,

    // Basic notifications
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNotification,

    // Notification management
    hideNotification,
    clearAll,
    markAsRead,
    markAllAsRead,

    // Special notifications
    showLoading,
    showProgress,
    updateProgress,
    confirm,
    showToast,
    showPersistent,
    showWithActions,

    // Server operations
    fetchNotifications,
    markAsReadOnServer,
    deleteNotification,

    // Utility methods
    getByType,
    getUnread,
    getRecent,

    // Helper methods
    showValidationErrors,
    showApiError,
    showApiSuccess,

    // Preferences
    setupPreferences,
    getPreferences,
    toggleNotifications,

    // Browser notifications
    requestBrowserPermission,
    showBrowserNotification,
    showDualNotification
  }
}