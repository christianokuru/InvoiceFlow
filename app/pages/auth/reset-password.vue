<script setup>
const route = useRoute()
const router = useRouter()

definePageMeta({
  layout: 'auth'
})

const token = ref(route.query.token || '')
const email = ref(route.query.email || '')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordStrength = computed(() => {
  if (!password.value) return { strength: '', color: '', text: '' }
  
  let score = 0
  
  if (password.value.length >= 8) score++
  if (password.value.length >= 12) score++
  if (/[a-z]/.test(password.value)) score++
  if (/[A-Z]/.test(password.value)) score++
  if (/\d/.test(password.value)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) score++
  
  if (score <= 2) return { strength: 'weak', color: 'bg-red-500', text: 'Weak' }
  if (score <= 4) return { strength: 'fair', color: 'bg-yellow-500', text: 'Fair' }
  if (score <= 5) return { strength: 'good', color: 'bg-blue-500', text: 'Good' }
  return { strength: 'strong', color: 'bg-green-500', text: 'Strong' }
})

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return null
  return password.value === confirmPassword.value
})

const canSubmit = computed(() => {
  return token.value && email.value && password.value && confirmPassword.value && passwordsMatch.value && !loading.value
})

const handleResetPassword = async () => {
  if (!canSubmit.value) return
  
  error.value = ''
  loading.value = true
  
  try {
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token: token.value,
        email: email.value,
        password: password.value
      }
    })
    
    if (response.success) {
      success.value = true
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    }
  } catch (err) {
    console.error('Reset password error:', err)
    
    if (err.data?.error?.message) {
      error.value = err.data.error.message
    } else if (err.data?.error?.code === 'EXPIRED_TOKEN') {
      error.value = 'Your reset link has expired. Please request a new one.'
    } else if (err.data?.error?.code === 'INVALID_TOKEN') {
      error.value = 'Invalid reset link. Please request a new one.'
    } else if (err.data?.error?.code === 'NO_RESET_REQUEST') {
      error.value = 'No password reset request found. Please request a new reset link.'
    } else if (err.data?.error?.code === 'WEAK_PASSWORD') {
      error.value = err.data.error.details?.join(', ') || 'Password does not meet security requirements.'
    } else {
      error.value = 'Failed to reset password. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!token.value || !email.value) {
    error.value = 'Invalid reset link. Please request a new password reset.'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">


    <div class="max-w-md w-full space-y-8 relative z-10">
      <div class="text-center animate-fade-in-down">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mb-6 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p class="text-gray-600">Enter your new password below</p>
      </div>

      <div v-if="success" class="card p-6 animate-fade-in-up">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">Password Reset Successfully!</h3>
        <p class="text-gray-600 text-center mb-4">Your password has been reset. Redirecting you to login...</p>
        <div class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>

      <div v-else class="card p-8 animate-fade-in-up">
        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-in-left">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>

          <div>
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              readonly
              class="form-input w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label for="password" class="form-label">New Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="form-input w-full pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <div v-if="password" class="mt-2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-gray-600">Password strength:</span>
                <span class="text-xs font-medium" :class="{
                  'text-red-600': passwordStrength.strength === 'weak',
                  'text-yellow-600': passwordStrength.strength === 'fair',
                  'text-blue-600': passwordStrength.strength === 'good',
                  'text-green-600': passwordStrength.strength === 'strong'
                }">{{ passwordStrength.text }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300" 
                  :class="passwordStrength.color"
                  :style="{ width: passwordStrength.strength === 'weak' ? '25%' : passwordStrength.strength === 'fair' ? '50%' : passwordStrength.strength === 'good' ? '75%' : '100%' }"
                ></div>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-2">
              Password must contain at least 6 characters, including uppercase, lowercase, and numbers
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="form-input w-full pr-10"
                :class="{
                  'border-green-500 focus:ring-green-500': passwordsMatch === true,
                  'border-red-500 focus:ring-red-500': passwordsMatch === false
                }"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <p v-if="passwordsMatch === false" class="text-xs text-red-600 mt-1">Passwords do not match</p>
            <p v-if="passwordsMatch === true" class="text-xs text-green-600 mt-1">Passwords match</p>
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Resetting Password...' : 'Reset Password' }}</span>
          </button>

          <div class="text-center">
            <NuxtLink to="/auth/login" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Back to Login
            </NuxtLink>
          </div>
        </form>
      </div>

      <div class="text-center text-sm text-gray-500 animate-fade-in">
        <p>Need help? <a href="mailto:support@invoiceflow.com" class="text-primary-600 hover:text-primary-700 font-medium">Contact Support</a></p>
      </div>
    </div>
  </div>
</template>