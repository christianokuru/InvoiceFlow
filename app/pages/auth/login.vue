<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Login Form Component -->
    <LoginForm
      @success="handleLoginSuccess"
      @error="handleLoginError"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '~/components/auth/LoginForm.vue'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const handleLoginSuccess = async (data) => {
  // In a real app, you would handle authentication here
  console.log('Login successful:', data)

  // Redirect to dashboard after successful login
  setTimeout(() => {
    router.push('/dashboard')
  }, 1000)
}


const handleLoginError = (error) => {
  // Error is already handled by the LoginForm component with toasts
  console.error('Login error:', error)
}
</script>
