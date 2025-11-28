export const useUIStore = defineStore('ui', () => {
  // State
  const sidebarOpen = ref(true)
  const theme = ref('light')
  const notifications = ref([])
  const loading = ref(false)
  const notificationPreferences = ref({
    enabled: true,
    position: 'top-right',
    duration: 5000,
    showProgress: true
  })

  // Actions
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
  }

  const setLoading = (isLoading) => {
    loading.value = isLoading
  }

  // Notification methods
  let notificationId = 0

  const generateNotificationId = () => {
    return ++notificationId
  }

  const showNotification = (notification) => {
    const id = generateNotificationId()
    const newNotification = {
      id,
      timestamp: new Date(),
      read: false,
      autoHide: true,
      duration: 5000,
      persistent: false,
      closable: true,
      position: 'top-right',
      type: 'info',
      ...notification
    }

    notifications.value.unshift(newNotification)

    // Auto-hide notification if enabled
    if (newNotification.autoHide && !newNotification.persistent) {
      setTimeout(() => {
        hideNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const showSuccessNotification = (message, title = 'Success', options = {}) => {
    return showNotification({
      type: 'success',
      message,
      title,
      ...options
    })
  }

  const showErrorNotification = (message, title = 'Error', options = {}) => {
    return showNotification({
      type: 'error',
      message,
      title,
      persistent: true,
      duration: 8000,
      ...options
    })
  }

  const showWarningNotification = (message, title = 'Warning', options = {}) => {
    return showNotification({
      type: 'warning',
      message,
      title,
      ...options
    })
  }

  const showInfoNotification = (message, title = 'Info', options = {}) => {
    return showNotification({
      type: 'info',
      message,
      title,
      ...options
    })
  }

  const hideNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  const markNotificationAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllNotificationsAsRead = () => {
    notifications.value.forEach(notification => {
      notification.read = true
    })
  }

  const updateNotification = (id, updates) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      Object.assign(notification, updates)
    }
  }

  const setNotificationPreferences = (preferences) => {
    notificationPreferences.value = { ...notificationPreferences.value, ...preferences }
  }

  const setNotificationsEnabled = (enabled) => {
    notificationPreferences.value.enabled = enabled
  }

  const confirmAction = (message, title = 'Confirm Action', options = {}) => {
    return new Promise((resolve) => {
      const id = showNotification({
        type: 'confirmation',
        message,
        title,
        persistent: true,
        actions: [
          {
            label: 'Cancel',
            action: () => {
              hideNotification(id)
              resolve(false)
            },
            variant: 'secondary'
          },
          {
            label: 'Confirm',
            action: () => {
              hideNotification(id)
              resolve(true)
            },
            variant: 'primary'
          }
        ],
        ...options
      })
    })
  }

  return {
    // State
    sidebarOpen: readonly(sidebarOpen),
    theme: readonly(theme),
    notifications: readonly(notifications),
    loading: readonly(loading),
    notificationPreferences: readonly(notificationPreferences),

    // Actions
    toggleSidebar,
    setTheme,
    setLoading,

    // Notification methods
    showNotification,
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
    showInfoNotification,
    hideNotification,
    clearNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    updateNotification,
    setNotificationPreferences,
    setNotificationsEnabled,
    confirmAction
  }
})