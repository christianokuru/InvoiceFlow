<script setup>
import { ref, reactive } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { useToaster } from '~/composables/useToaster'
import { useAuthStore } from '../../../stores/auth'

const emit = defineEmits(['success', 'error'])

const { success, error } = useToaster()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({})
const isLoading = ref(false)
const showPassword = ref(false)

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}

const validateField = (field) => {
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
    case 'password':
      if (!form.password) {
        errors.password = 'Password is required'
      } else if (!validatePassword(form.password)) {
        errors.password = 'Password must be at least 6 characters long'
      } else {
        delete errors.password
      }
      break
  }
}

const validateForm = () => {
  validateField('email')
  validateField('password')
  return Object.keys(errors).length === 0
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Validation Error', 'Please fix the errors in the form')
    return
  }

  isLoading.value = true

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe
    })

    success('Welcome back!', `Successfully signed in as ${form.email}`)
    emit('success')
  } catch (err) {
    console.error('Login error:', err)
    
    let errorMessage = 'Invalid email or password. Please try again.'
    
    if (err.data?.error?.code === 'INVALID_CREDENTIALS') {
      errorMessage = 'Invalid email or password. Please check your credentials and try again.'
    } else if (err.data?.error?.code === 'ACCOUNT_INACTIVE') {
      errorMessage = 'Your account has been deactivated. Please contact support.'
    } else if (err.data?.error?.code === 'INVALID_EMAIL') {
      errorMessage = 'Please enter a valid email address.'
    } else if (err.data?.error?.message) {
      errorMessage = err.data.error.message
    }
    
    error('Sign In Failed', errorMessage)
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
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <NuxtLink
            to="/auth/register"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </NuxtLink>
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
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
              placeholder="Enter your email"
              @blur="validateField('email')"
            />
            <p v-if="errors?.email" class="mt-2 text-sm text-red-600" id="email-error">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1 relative">
            <input
              id="password"
              v-model="form.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              :class="[
                'block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors?.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Enter your password"
              @blur="validateField('password')"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
              @click="togglePassword"
              aria-label="Toggle password visibility"
            >
              <EyeIcon v-if="!showPassword" class="h-5 w-5" />
              <EyeOffIcon v-else class="h-5 w-5" />
            </button>
          </div>
          <p v-if="errors?.password" class="mt-2 text-sm text-red-600" id="password-error">
            {{ errors.password }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Sign in</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
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
            <span class="px-2 bg-gray-50 text-gray-500">Demo Account</span>
          </div>
        </div>
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">
            Use any email and password to sign in for demo purposes
          </p>
        </div>
      </div>
    </div>
  </div>
</template>