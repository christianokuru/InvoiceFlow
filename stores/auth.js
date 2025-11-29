import { ref, computed, readonly } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const refreshToken = ref(null)
  const session = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value && !!accessToken.value)
  const authError = computed(() => error.value)

  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      if (response.success) {
        user.value = response.data.user
        accessToken.value = response.data.tokens.accessToken
        refreshToken.value = response.data.tokens.refreshToken
        session.value = response.data.session
        isAuthenticated.value = true

        if (import.meta.client) {
          localStorage.setItem('accessToken', response.data.tokens.accessToken)
          localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.data?.error?.message || 'Login failed'
      isAuthenticated.value = false
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (response.success) {
        user.value = response.data.user
        accessToken.value = response.data.tokens.accessToken
        refreshToken.value = response.data.tokens.refreshToken
        isAuthenticated.value = true

        if (import.meta.client) {
          localStorage.setItem('accessToken', response.data.tokens.accessToken)
          localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        return { success: true, data: response.data }
      }
    } catch (err) {
      error.value = err.data?.error?.message || 'Registration failed'
      isAuthenticated.value = false
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      if (accessToken.value) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken.value}`
          }
        }).catch(err => {
          console.warn('Logout API call failed:', err)
        })
      }
    } finally {
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      session.value = null
      isAuthenticated.value = false
      error.value = null

      if (import.meta.client) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }

      loading.value = false
    }
  }

  const refreshAuthToken = async () => {
    if (!refreshToken.value) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await $fetch('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value }
      })

      if (response.success) {
        accessToken.value = response.data.tokens.accessToken
        refreshToken.value = response.data.tokens.refreshToken

        if (import.meta.client) {
          localStorage.setItem('accessToken', response.data.tokens.accessToken)
          localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
        }

        return { success: true, data: response.data }
      }
    } catch (err) {
      await logout()
      throw err
    }
  }

  const initializeAuth = () => {
    if (import.meta.client) {
      const storedAccessToken = localStorage.getItem('accessToken')
      const storedRefreshToken = localStorage.getItem('refreshToken')
      const storedUser = localStorage.getItem('user')

      if (storedAccessToken && storedRefreshToken && storedUser) {
        try {
          accessToken.value = storedAccessToken
          refreshToken.value = storedRefreshToken
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
        } catch (err) {
          console.error('Failed to parse stored user data:', err)
          logout()
        }
      }
    }
  }

  const setUser = (userData) => {
    user.value = userData
    if (import.meta.client && userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user: readonly(user),
    accessToken: readonly(accessToken),
    refreshToken: readonly(refreshToken),
    session: readonly(session),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    error: readonly(error),
    currentUser,
    isLoggedIn,
    authError,
    login,
    register,
    logout,
    refreshAuthToken,
    initializeAuth,
    setUser,
    clearError
  }
})