export const useLocalStorage = () => {
  const { showError, showSuccess } = useNotifications()

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    if (!process.client) return false

    try {
      const testKey = '__test__'
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  }

  // Generic get item
  const getItem = (key, defaultValue = null) => {
    if (!isLocalStorageAvailable()) return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error)
      return defaultValue
    }
  }

  // Generic set item
  const setItem = (key, value) => {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage is not available')
      return false
    }

    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error)
      showError('Failed to save data locally', 'Storage Error')
      return false
    }
  }

  // Remove item
  const removeItem = (key) => {
    if (!isLocalStorageAvailable()) return false

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error)
      showError('Failed to remove data', 'Storage Error')
      return false
    }
  }

  // Clear all localStorage
  const clear = () => {
    if (!isLocalStorageAvailable()) return false

    try {
      localStorage.clear()
      showSuccess('All local data cleared', 'Storage Cleared')
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      showError('Failed to clear local data', 'Storage Error')
      return false
    }
  }

  // Get all keys
  const getKeys = () => {
    if (!isLocalStorageAvailable()) return []

    try {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) keys.push(key)
      }
      return keys
    } catch (error) {
      console.error('Error getting localStorage keys:', error)
      return []
    }
  }

  // Get storage size (approximate)
  const getStorageSize = () => {
    if (!isLocalStorageAvailable()) return 0

    try {
      let total = 0
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length
        }
      }
      return total
    } catch (error) {
      console.error('Error calculating localStorage size:', error)
      return 0
    }
  }

  // Reactive state management
  const useReactiveState = (key, defaultValue = null) => {
    const state = ref(getItem(key, defaultValue))

    // Watch for changes and update localStorage
    watch(state, (newValue) => {
      setItem(key, newValue)
    }, { deep: true })

    // Sync with other tabs
    if (process.client) {
      window.addEventListener('storage', (event) => {
        if (event.key === key && event.newValue !== null) {
          try {
            state.value = JSON.parse(event.newValue)
          } catch (error) {
            console.error('Error parsing storage event:', error)
          }
        }
      })
    }

    return state
  }

  // Typed helpers
  const useString = (key, defaultValue = '') => {
    return useReactiveState(key, defaultValue)
  }

  const useNumber = (key, defaultValue = 0) => {
    return useReactiveState(key, defaultValue)
  }

  const useBoolean = (key, defaultValue = false) => {
    return useReactiveState(key, defaultValue)
  }

  const useObject = (key, defaultValue = {}) => {
    return useReactiveState(key, defaultValue)
  }

  const useArray = (key, defaultValue = []) => {
    return useReactiveState(key, defaultValue)
  }

  const useDate = (key, defaultValue = null) => {
    const state = ref(getItem(key, defaultValue))

    watch(state, (newValue) => {
      setItem(key, newValue)
    })

    if (process.client) {
      window.addEventListener('storage', (event) => {
        if (event.key === key && event.newValue !== null) {
          try {
            const parsed = JSON.parse(event.newValue)
            state.value = parsed ? new Date(parsed) : null
          } catch (error) {
            console.error('Error parsing date from storage event:', error)
          }
        }
      })
    }

    return state
  }

  // Session storage wrapper (for tab-specific data)
  const setSessionItem = (key, value) => {
    if (!process.client) return false

    try {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error setting item in sessionStorage: ${key}`, error)
      return false
    }
  }

  const getSessionItem = (key, defaultValue = null) => {
    if (!process.client) return defaultValue

    try {
      const item = sessionStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting item from sessionStorage: ${key}`, error)
      return defaultValue
    }
  }

  const removeSessionItem = (key) => {
    if (!process.client) return false

    try {
      sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing item from sessionStorage: ${key}`, error)
      return false
    }
  }

  const clearSession = () => {
    if (!process.client) return false

    try {
      sessionStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
      return false
    }
  }

  // Reactive session state
  const useSessionState = (key, defaultValue = null) => {
    const state = ref(getSessionItem(key, defaultValue))

    watch(state, (newValue) => {
      setSessionItem(key, newValue)
    }, { deep: true })

    return state
  }

  // Cache management
  const setCache = (key, value, ttl = 3600000) => { // Default TTL: 1 hour
    const cacheItem = {
      value,
      timestamp: Date.now(),
      ttl
    }
    return setItem(`cache_${key}`, cacheItem)
  }

  const getCache = (key) => {
    const cacheItem = getItem(`cache_${key}`)

    if (!cacheItem) return null

    const now = Date.now()
    if (now - cacheItem.timestamp > cacheItem.ttl) {
      removeItem(`cache_${key}`)
      return null
    }

    return cacheItem.value
  }

  const clearCache = () => {
    const keys = getKeys()
    const cacheKeys = keys.filter(key => key.startsWith('cache_'))
    cacheKeys.forEach(key => removeItem(key))
    return true
  }

  // User preferences
  const setUserPreference = (key, value) => {
    return setItem(`pref_${key}`, value)
  }

  const getUserPreference = (key, defaultValue = null) => {
    return getItem(`pref_${key}`, defaultValue)
  }

  const useUserPreference = (key, defaultValue = null) => {
    return useReactiveState(`pref_${key}`, defaultValue)
  }

  // Form data persistence
  const saveFormData = (formId, formData) => {
    return setItem(`form_${formId}`, formData)
  }

  const loadFormData = (formId, defaultValue = {}) => {
    return getItem(`form_${formId}`, defaultValue)
  }

  const clearFormData = (formId) => {
    return removeItem(`form_${formId}`)
  }

  const useFormData = (formId, defaultValue = {}) => {
    return useReactiveState(`form_${formId}`, defaultValue)
  }

  // App state management
  const setAppState = (state) => {
    return setItem('app_state', state)
  }

  const getAppState = (defaultValue = {}) => {
    return getItem('app_state', defaultValue)
  }

  const useAppState = (defaultValue = {}) => {
    return useReactiveState('app_state', defaultValue)
  }

  // Theme management
  const setTheme = (theme) => {
    return setItem('theme', theme)
  }

  const getTheme = (defaultValue = 'light') => {
    return getItem('theme', defaultValue)
  }

  const useTheme = (defaultValue = 'light') => {
    return useReactiveState('theme', defaultValue)
  }

  // Language management
  const setLanguage = (language) => {
    return setItem('language', language)
  }

  const getLanguage = (defaultValue = 'en') => {
    return getItem('language', defaultValue)
  }

  const useLanguage = (defaultValue = 'en') => {
    return useReactiveState('language', defaultValue)
  }

  // Export data
  const exportData = () => {
    const data = {}
    const keys = getKeys()

    keys.forEach(key => {
      data[key] = getItem(key)
    })

    return JSON.stringify(data, null, 2)
  }

  const downloadExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `local-storage-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import data
  const importData = (jsonData, overwrite = false) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData

      let imported = 0
      let skipped = 0

      Object.entries(data).forEach(([key, value]) => {
        if (overwrite || !getItem(key)) {
          setItem(key, value)
          imported++
        } else {
          skipped++
        }
      })

      showSuccess(`Imported ${imported} items${skipped > 0 ? `, skipped ${skipped} existing items` : ''}`, 'Import Complete')
      return { imported, skipped }
    } catch (error) {
      console.error('Error importing data:', error)
      showError('Failed to import data', 'Import Error')
      throw error
    }
  }

  // Storage quota management
  const getQuotaUsage = () => {
    if (!isLocalStorageAvailable()) return { used: 0, available: 0, percentage: 0 }

    const used = getStorageSize()
    // Most browsers have ~5MB limit for localStorage
    const available = 5 * 1024 * 1024 // 5MB in bytes
    const percentage = (used / available) * 100

    return { used, available, percentage }
  }

  const isQuotaExceeded = () => {
    const { percentage } = getQuotaUsage()
    return percentage >= 90
  }

  const cleanupExpiredCache = () => {
    const keys = getKeys()
    let cleaned = 0

    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        const cacheItem = getItem(key)
        if (cacheItem && (Date.now() - cacheItem.timestamp > cacheItem.ttl)) {
          removeItem(key)
          cleaned++
        }
      }
    })

    if (cleaned > 0) {
      showSuccess(`Cleaned up ${cleaned} expired cache items`, 'Cache Cleanup')
    }

    return cleaned
  }

  return {
    // Basic operations
    getItem,
    setItem,
    removeItem,
    clear,
    getKeys,
    getStorageSize,

    // Reactive state management
    useReactiveState,
    useString,
    useNumber,
    useBoolean,
    useObject,
    useArray,
    useDate,

    // Session storage
    setSessionItem,
    getSessionItem,
    removeSessionItem,
    clearSession,
    useSessionState,

    // Cache management
    setCache,
    getCache,
    clearCache,

    // User preferences
    setUserPreference,
    getUserPreference,
    useUserPreference,

    // Form data
    saveFormData,
    loadFormData,
    clearFormData,
    useFormData,

    // App state
    setAppState,
    getAppState,
    useAppState,

    // Theme and language
    setTheme,
    getTheme,
    useTheme,
    setLanguage,
    getLanguage,
    useLanguage,

    // Import/Export
    exportData,
    downloadExport,
    importData,

    // Quota management
    getQuotaUsage,
    isQuotaExceeded,
    cleanupExpiredCache,

    // Utilities
    isLocalStorageAvailable
  }
}