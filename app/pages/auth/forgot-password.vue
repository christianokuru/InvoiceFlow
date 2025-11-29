<!-- pages/auth/forgot-password.vue  (Parent component)-->
<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Password Reset Form Component -->
    <PasswordResetForm
      @success="handleResetSuccess"
      @error="handleResetError"
    />
  </div>
</template>

<script setup>
import PasswordResetForm from '~/components/auth/PasswordResetForm.vue'

definePageMeta({
  layout: 'auth'
})

const handleResetSuccess = async (data) => {
  // In a real app, you would handle password reset here
  console.log('Password reset email sent:', data)
}


const handleResetError = (error) => {
  // Error is already handled by the PasswordResetForm component with toasts
  console.error('Password reset error:', error)
}
</script>
