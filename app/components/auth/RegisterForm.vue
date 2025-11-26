<!-- components/auth/RegisterForm.vue  -->
<template>
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <NuxtLink
            to="/auth/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>

      <!-- Registration Form -->
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <div class="mt-1">
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors.name ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Enter your full name"
              @blur="validateField('name')"
            />
            <p v-if="errors.name" class="mt-2 text-sm text-red-600" id="name-error">
              {{ errors.name }}
            </p>
          </div>
        </div>

        <!-- Email Field -->
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
                errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Enter your email"
              @blur="validateField('email')"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-600" id="email-error">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <!-- Password Field -->
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
              autocomplete="new-password"
              required
              :class="[
                'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Create a password"
              @blur="validateField('password')"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="togglePassword"
            >
              <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-400" />
              <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-2 text-sm text-red-600" id="password-error">
            {{ errors.password }}
          </p>
          <!-- Password Requirements -->
          <div class="mt-2">
            <p class="text-xs text-gray-500">Password must:</p>
            <ul class="mt-1 text-xs text-gray-500 space-y-1">
              <li :class="passwordRequirements.length ? 'text-green-600' : 'text-gray-400'">
                {{ passwordRequirements.length ? '✓' : '○' }} Be at least 8 characters long
              </li>
              <li :class="passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'">
                {{ passwordRequirements.uppercase ? '✓' : '○' }} Contain at least one uppercase letter
              </li>
              <li :class="passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'">
                {{ passwordRequirements.lowercase ? '✓' : '○' }} Contain at least one lowercase letter
              </li>
              <li :class="passwordRequirements.number ? 'text-green-600' : 'text-gray-400'">
                {{ passwordRequirements.number ? '✓' : '○' }} Contain at least one number
              </li>
            </ul>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <div class="mt-1 relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
              :class="[
                'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                errors.confirmPassword ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
              ]"
              placeholder="Confirm your password"
              @blur="validateField('confirmPassword')"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="toggleConfirmPassword"
            >
              <EyeIcon v-if="showConfirmPassword" class="h-5 w-5 text-gray-400" />
              <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600" id="confirmPassword-error">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex items-center">
          <input
            id="agree-to-terms"
            v-model="form.agreeToTerms"
            name="agree-to-terms"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="agree-to-terms" class="ml-2 block text-sm text-gray-900">
            I agree to the
            <NuxtLink
              to="/terms"
              class="text-blue-600 hover:text-blue-500"
            >
              Terms of Service
            </NuxtLink>
            and
            <NuxtLink
              to="/privacy"
              class="text-blue-600 hover:text-blue-500"
            >
              Privacy Policy
            </NuxtLink>
          </label>
        </div>
        <p v-if="errors.agreeToTerms" class="mt-1 text-sm text-red-600">
          {{ errors.agreeToTerms }}
        </p>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isLoading || !form.agreeToTerms"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Create account</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>
        </div>
      </form>

      <!-- Demo Notice -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Start Free Trial</span>
          </div>
        </div>
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">
            No credit card required. Start your 14-day free trial today.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { useToaster } from '~/composables/useToaster'

const emit = defineEmits(['success', 'error'])

const { success, error } = useToaster()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const errors = reactive({})
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password requirements checker
const passwordRequirements = computed(() => ({
  length: form.password.length >= 8,
  uppercase: /[A-Z]/.test(form.password),
  lowercase: /[a-z]/.test(form.password),
  number: /\d/.test(form.password),
}))

const validateName = (name) => {
  return name.trim().length >= 2
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return passwordRequirements.value.length &&
         passwordRequirements.value.uppercase &&
         passwordRequirements.value.lowercase &&
         passwordRequirements.value.number
}

const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!form.name) {
        errors.name = 'Full name is required'
      } else if (!validateName(form.name)) {
        errors.name = 'Name must be at least 2 characters long'
      } else {
        delete errors.name
      }
      break
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
        errors.password = 'Password does not meet the requirements'
      } else {
        delete errors.password
      }
      // Also validate confirm password if it has a value
      if (form.confirmPassword) {
        validateField('confirmPassword')
      }
      break
    case 'confirmPassword':
      if (!form.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      } else {
        delete errors.confirmPassword
      }
      break
    case 'agreeToTerms':
      if (!form.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the terms and conditions'
      } else {
        delete errors.agreeToTerms
      }
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('password')
  validateField('confirmPassword')
  validateField('agreeToTerms')
  return Object.keys(errors).length === 0
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleSubmit = async () => {
  if (!validateForm()) {
    error('Validation Error', 'Please fix the errors in the form')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Demo success - in real app, this would be an actual API call
    success('Account Created!', `Welcome to InvoiceFlow, ${form.name}!`)
    emit('success', {
      name: form.name,
      email: form.email
    })
  } catch (err) {
    const errorMessage = 'Failed to create account. Please try again.'
    error('Registration Failed', errorMessage)
    emit('error', errorMessage)
  } finally {
    isLoading.value = false
  }
}

</script>
