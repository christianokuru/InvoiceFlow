<script setup>
import { useAuthStore } from '../../../stores/auth'
import { useRouter } from 'vue-router'
import LoginForm from '~/components/auth/LoginForm.vue'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const handleLoginSuccess = async () => {
  console.log('Login successful, user authenticated')

  setTimeout(() => {
    router.push('/dashboard')
  }, 1000)
}

const handleLoginError = (error) => {
  console.error('Login error:', error)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <LoginForm
      @success="handleLoginSuccess"
      @error="handleLoginError"
    />
  </div>
</template>