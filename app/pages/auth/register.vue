<script setup>
import { useAuthStore } from '../../../stores/auth'
import { useRouter } from 'vue-router'
import RegisterForm from '~/components/auth/RegisterForm.vue'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const handleRegisterSuccess = async () => {
  console.log('Registration successful, user authenticated')
  
  setTimeout(() => {
    router.push('/dashboard')
  }, 1000)
}

const handleRegisterError = (error) => {
  console.error('Registration error:', error)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <RegisterForm
      @success="handleRegisterSuccess"
      @error="handleRegisterError"
    />
  </div>
</template>