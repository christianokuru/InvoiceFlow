import { ref, computed, readonly } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const refreshToken = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value && !!token.value)
  const authError = computed(() => error.value)

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      user.value = data.user
      token.value = data.token
      refreshToken.value = data.refreshToken
      isAuthenticated.value = true

      // Store tokens in localStorage
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)

      return { success: true, data }
    } catch (err) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const { data } = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      user.value = data.user
      token.value = data.token
      refreshToken.value = data.refreshToken
      isAuthenticated.value = true

      // Store tokens in localStorage
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)

      return { success: true, data }
    } catch (err) {
      error.value = err.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      if (token.value) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`
          }
        })
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state regardless of API call success
      user.value = null
      token.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      error.value = null

      // Clear localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')

      loading.value = false
    }
  }

  const refreshAuthToken = async () => {
    if (!refreshToken.value) {
      throw new Error('No refresh token available')
    }

    try {
      const { data } = await $fetch('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value }
      })

      token.value = data.token
      refreshToken.value = data.refreshToken

      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)

      return { success: true, data }
    } catch (err) {
      // If refresh fails, logout the user
      await logout()
      throw err
    }
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedToken && storedRefreshToken) {
      token.value = storedToken
      refreshToken.value = storedRefreshToken
      isAuthenticated.value = true

      // Optionally verify token with backend
      // This would be implemented based on your backend API
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    refreshToken: readonly(refreshToken),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    error: readonly(error),

    // Getters
    currentUser,
    isLoggedIn,
    authError,

    // Actions
    login,
    register,
    logout,
    refreshAuthToken,
    initializeAuth,
    clearError
  }
})