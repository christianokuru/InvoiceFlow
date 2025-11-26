<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Register Form Component -->
    <RegisterForm
      @success="handleRegisterSuccess"
      @error="handleRegisterError"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import RegisterForm from '~/components/auth/RegisterForm.vue'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const handleRegisterSuccess = async (data) => {
  // In a real app, you would handle registration and authentication here
  console.log('Registration successful:', data)

  // Show success message and redirect to login
  setTimeout(() => {
    router.push('/auth/login')
  }, 2000)
}


const handleRegisterError = (error) => {
  // Error is already handled by the RegisterForm component with toasts
  console.error('Registration error:', error)
}
</script>
