import { useAuthStore } from '../../stores/auth'
import { useRouter, useRoute } from '#app'
import { computed } from 'vue'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  // Computed properties
  const user = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isLoggedIn)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.authError)

  // Login function
  const login = async (credentials) => {
    try {
      const result = await authStore.login(credentials)

      // Redirect to dashboard after successful login
      await router.push('/dashboard')

      return result
    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const result = await authStore.register(userData)

      // Redirect to dashboard after successful registration
      await router.push('/dashboard')

      return result
    } catch (err) {
      console.error('Registration error:', err)
      throw err
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authStore.logout()

      // Redirect to login page after logout
      await router.push('/auth/login')
    } catch (err) {
      console.error('Logout error:', err)
      // Force redirect even if logout fails
      await router.push('/auth/login')
    }
  }

  // Initialize auth state
  const initializeAuth = () => {
    authStore.initializeAuth()
  }

  // Check if current route requires authentication
  const requiresAuth = computed(() => {
    return route.meta.requiresAuth !== false && route.path.startsWith('/dashboard')
  })

  // Redirect to login if not authenticated
  const checkAuth = () => {
    if (requiresAuth.value && !isAuthenticated.value) {
      router.push('/auth/login')
    }
  }

  // Refresh authentication token
  const refreshToken = async () => {
    try {
      return await authStore.refreshAuthToken()
    } catch (err) {
      console.error('Token refresh error:', err)
      await logout()
      throw err
    }
  }

  // Get current user profile
  const getProfile = async () => {
    try {
      const { data } = await $fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      })

      return data
    } catch (err) {
      console.error('Get profile error:', err)
      throw err
    }
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const { data } = await $fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
        body: profileData
      })

      return data
    } catch (err) {
      console.error('Update profile error:', err)
      throw err
    }
  }

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const { data } = await $fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        },
        body: passwordData
      })

      return data
    } catch (err) {
      console.error('Change password error:', err)
      throw err
    }
  }

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      const { data } = await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      })

      return data
    } catch (err) {
      console.error('Password reset request error:', err)
      throw err
    }
  }

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      const { data } = await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: {
          token,
          password: newPassword
        }
      })

      return data
    } catch (err) {
      console.error('Password reset error:', err)
      throw err
    }
  }

  // Verify email
  const verifyEmail = async (token) => {
    try {
      const { data } = await $fetch('/api/auth/verify-email', {
        method: 'POST',
        body: { token }
      })

      return data
    } catch (err) {
      console.error('Email verification error:', err)
      throw err
    }
  }

  // Resend verification email
  const resendVerification = async () => {
    try {
      const { data } = await $fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authStore.token}`
        }
      })

      return data
    } catch (err) {
      console.error('Resend verification error:', err)
      throw err
    }
  }

  // Clear authentication error
  const clearError = () => {
    authStore.clearError()
  }

  // Computed property for authorization header
  const authHeader = computed(() => {
    return authStore.token ? `Bearer ${authStore.token}` : null
  })

  // Get user settings
  const getSettings = async () => {
    try {
      const { data } = await authenticatedFetch('/api/users/settings')
      return data
    } catch (err) {
      console.error('Get settings error:', err)
      throw err
    }
  }

  // Update user settings
  const updateSettings = async (settingsData) => {
    try {
      const { data } = await authenticatedFetch('/api/users/settings', {
        method: 'PUT',
        body: settingsData
      })

      // Update local user data if successful
      if (data.data) {
        authStore.setUser(data.data)
      }

      return data
    } catch (err) {
      console.error('Update settings error:', err)
      throw err
    }
  }

  // Upload profile photo
  const uploadPhoto = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const { data } = await authenticatedFetch('/api/upload/photo', {
        method: 'POST',
        body: formData
      })

      return data
    } catch (err) {
      console.error('Upload photo error:', err)
      throw err
    }
  }

  // Test notification
  const testNotification = async (type) => {
    try {
      const { data } = await authenticatedFetch('/api/notifications/test', {
        method: 'POST',
        body: { type }
      })

      return data
    } catch (err) {
      console.error('Test notification error:', err)
      throw err
    }
  }

  // Utility function to make authenticated requests
  const authenticatedFetch = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': authHeader.value
    }

    return await $fetch(url, {
      ...options,
      headers
    })
  }

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    authHeader,
    requiresAuth,

    // Actions
    login,
    register,
    logout,
    initializeAuth,
    checkAuth,
    refreshToken,
    getProfile,
    updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    resendVerification,
    clearError,

    // Settings Actions
    getSettings,
    updateSettings,
    uploadPhoto,
    testNotification,

    // Utilities
    authenticatedFetch
  }
}