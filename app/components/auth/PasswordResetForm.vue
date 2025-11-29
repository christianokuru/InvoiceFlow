<script setup>
import { ref, reactive } from 'vue'
import { CheckCircleIcon } from 'lucide-vue-next'
import { useToaster } from '~/composables/useToaster'

const emit = defineEmits(['success', 'error'])

const { success, error } = useToaster()

const form = reactive({
  email: ''
})

const errors = reactive({})
const isLoading = ref(false)
const isEmailSent = ref(false)
const submittedEmail = ref('')

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateField = (field) => {
  if (import.meta.client) {
    switch (field) {
      case 'email':
        if (!form.email) {
          errors.email = 'Email address is required'
        } else if (!validateEmail(form.email)) {
          errors.email = 'Please enter a valid email address'
        } else {
          delete errors.email
        }
        break
    }
  }
}

const validateForm = () => {
  if (import.meta.client) {
    validateField('email')
    return Object.keys(errors).length === 0
  }
  return false
}

const resetForm = () => {
  form.email = ''
  isEmailSent.value = false
  submittedEmail.value = ''
  Object.keys(errors).forEach(key => delete errors[key])
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Validation Error', 'Please fix the errors in the form')
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: {
        email: form.email
      }
    })

    if (response.success) {
      submittedEmail.value = form.email
      isEmailSent.value = true
      
      success('Reset Email Sent!', `Password reset instructions have been sent to ${form.email}`)
      
      emit('success', {
        email: form.email,
        emailSent: response.data.emailSent
      })
    }
  } catch (err) {
    console.error('Password reset error:', err)
    
    let errorMessage = 'Failed to send reset email. Please try again.'
    
    if (err.data?.error?.code === 'INVALID_EMAIL') {
      errorMessage = 'Please enter a valid email address.'
    } else if (err.data?.error?.code === 'RECENT_RESET_REQUEST') {
      errorMessage = err.data.error.message || 'A password reset link was recently sent. Please check your email or wait before requesting another.'
    } else if (err.data?.error?.code === 'EMAIL_SEND_ERROR') {
      errorMessage = 'Failed to send password reset email. Please try again or contact support.'
    } else if (err.data?.error?.message) {
      errorMessage = err.data.error.message
    }
    
    error('Reset Failed', errorMessage)
    emit('error', errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <div class="space-y-6">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <NuxtLink
            to="/auth/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            sign back in to your account
          </NuxtLink>
        </p>
      </div>

      <div v-if="isEmailSent" class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircleIcon class="h-6 w-6 text-green-600" />
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
        <p class="mt-2 text-sm text-gray-600">
          We sent a password reset link to
          <br />
          <span class="font-medium text-gray-900">{{ submittedEmail }}</span>
        </p>
        <p class="mt-2 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or
          <button
            @click="resetForm"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            try again
          </button>
        </p>
      </div>

      <form v-else class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors?.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Enter your email address"
              @blur="validateField('email')"
            />
            <p v-if="errors?.email" class="mt-2 text-sm text-red-600" id="email-error">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Send reset link</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Password Reset</span>
          </div>
        </div>
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">
            We'll send you an email with instructions to reset your password.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>