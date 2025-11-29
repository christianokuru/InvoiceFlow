import { useAuthStore } from '../../stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (import.meta.client) {
    authStore.initializeAuth()
  }

  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/',
    '/about',
    '/contact',
    '/terms',
    '/privacy'
  ]

  const isPublicRoute = publicRoutes.some(route => to.path.startsWith(route))

  if (!isPublicRoute && !authStore.isLoggedIn) {
    return navigateTo('/auth/login')
  }

  if (isPublicRoute && authStore.isLoggedIn && to.path.startsWith('/auth/')) {
    return navigateTo('/dashboard')
  }
})