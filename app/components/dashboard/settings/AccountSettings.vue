<template>
  <div class="space-y-8">
    <!-- Profile Photo Section -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Profile Photo</h3>
      <div class="flex items-center space-x-6">
        <div class="shrink-0 relative">
          <div class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
            <img
              v-if="form.profilePhoto"
              :src="form.profilePhoto"
              :alt="form.name"
              class="h-full w-full object-cover"
            />
            <UserIcon v-else class="h-12 w-12 text-gray-400" />
          </div>
          <div v-if="uploadingPhoto" class="absolute inset-0 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          </div>
        </div>
        <div class="flex-1">
          <input
            ref="photoInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handlePhotoChange"
          />
          <button
            type="button"
            :disabled="uploadingPhoto"
            @click="$refs.photoInput.click()"
            class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ uploadingPhoto ? 'Uploading...' : 'Change Photo' }}
          </button>
          <button
            v-if="form.profilePhoto"
            type="button"
            @click="removePhoto"
            class="ml-3 bg-red-50 py-2 px-3 border border-red-300 rounded-md shadow-sm text-sm leading-4 font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Remove
          </button>
          <p class="mt-1 text-sm text-gray-500">JPG, PNG or GIF. Max 2MB. Drag & drop supported.</p>
          <div v-if="photoError" class="mt-1 text-sm text-red-600">
            {{ photoError }}
          </div>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('firstName')"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
              {{ errors.firstName }}
            </p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('lastName')"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
              {{ errors.lastName }}
            </p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div class="relative">
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('email')"
            />
            <div v-if="!errors.email && form.email && isValidEmail(form.email)" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <CheckIcon class="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              :class="[
                'mt-1 block w-full pl-10 rounded-md shadow-sm sm:text-sm',
                errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validateField('phone')"
            />
            <div v-if="!errors.phone && form.phone && isValidPhone(form.phone)" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <CheckIcon class="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p class="mt-1 text-sm text-gray-500">Include country code for international numbers</p>
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
            {{ errors.phone }}
          </p>
        </div>

        <div class="flex justify-between items-center pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-500">
            <span v-if="hasChanges" class="text-amber-600 font-medium">
              ⚠️ You have unsaved changes
            </span>
            <span v-else>
              All changes saved
            </span>
          </div>
          <div class="space-x-3">
            <button
              type="button"
              @click="resetForm"
              :disabled="loading || !hasChanges"
              class="bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading || !hasChanges || hasErrors"
              class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Password Change -->
    <div class="border-t pt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Security</h3>

      <!-- Security Status -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <ShieldCheckIcon class="h-5 w-5 text-blue-600 mr-2" />
          <div class="flex-1">
            <h4 class="text-sm font-medium text-blue-900">Account Security</h4>
            <p class="text-sm text-blue-700 mt-1">Your account security level: <span class="font-semibold">{{ securityLevel }}</span></p>
          </div>
          <LockClosedIcon v-if="securityScore >= 80" class="h-6 w-6 text-green-600" />
          <LockOpenIcon v-else class="h-6 w-6 text-amber-600" />
        </div>
      </div>

      <!-- Password Change Form -->
      <form @submit.prevent="handlePasswordChange" class="space-y-6">
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <div class="relative">
            <input
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              :class="[
                'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                passwordErrors.currentPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
              ]"
              @blur="validatePasswordField('currentPassword')"
            />
            <button
              type="button"
              @click="showCurrentPassword = !showCurrentPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <EyeIcon v-if="!showCurrentPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p v-if="passwordErrors.currentPassword" class="mt-1 text-sm text-red-600">
            {{ passwordErrors.currentPassword }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div class="relative">
              <input
                id="newPassword"
                v-model="passwordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  passwordErrors.newPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validatePasswordField('newPassword')"
                @input="checkPasswordStrength"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showNewPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <!-- Password Requirements -->
            <div class="mt-3 space-y-1">
              <div class="flex items-center text-sm">
                <CheckIcon :class="passwordRequirements.length ? 'text-green-500' : 'text-gray-300'" class="h-4 w-4 mr-2" />
                <span :class="passwordRequirements.length ? 'text-green-700' : 'text-gray-500'">
                  At least 8 characters
                </span>
              </div>
              <div class="flex items-center text-sm">
                <CheckIcon :class="passwordRequirements.uppercase ? 'text-green-500' : 'text-gray-300'" class="h-4 w-4 mr-2" />
                <span :class="passwordRequirements.uppercase ? 'text-green-700' : 'text-gray-500'">
                  One uppercase letter
                </span>
              </div>
              <div class="flex items-center text-sm">
                <CheckIcon :class="passwordRequirements.lowercase ? 'text-green-500' : 'text-gray-300'" class="h-4 w-4 mr-2" />
                <span :class="passwordRequirements.lowercase ? 'text-green-700' : 'text-gray-500'">
                  One lowercase letter
                </span>
              </div>
              <div class="flex items-center text-sm">
                <CheckIcon :class="passwordRequirements.number ? 'text-green-500' : 'text-gray-300'" class="h-4 w-4 mr-2" />
                <span :class="passwordRequirements.number ? 'text-green-700' : 'text-gray-500'">
                  One number
                </span>
              </div>
              <div class="flex items-center text-sm">
                <CheckIcon :class="passwordRequirements.special ? 'text-green-500' : 'text-gray-300'" class="h-4 w-4 mr-2" />
                <span :class="passwordRequirements.special ? 'text-green-700' : 'text-gray-500'">
                  One special character
                </span>
              </div>
            </div>

            <!-- Password Strength Meter -->
            <div class="mt-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Password strength:</span>
                <span :class="passwordStrengthColorClass">{{ passwordStrengthText }}</span>
              </div>
              <div class="mt-1 bg-gray-200 rounded-full h-2">
                <div
                  :class="passwordStrengthColorClass.replace('text', 'bg')"
                  class="h-2 rounded-full transition-all duration-300"
                  :style="{ width: passwordStrengthPercentage + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :class="[
                  'mt-1 block w-full rounded-md shadow-sm sm:text-sm',
                  passwordErrors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                ]"
                @blur="validatePasswordField('confirmPassword')"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
              <div v-if="passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword" class="absolute inset-y-0 right-10 flex items-center">
                <CheckIcon class="h-5 w-5 text-green-500" />
              </div>
            </div>
            <p v-if="passwordErrors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ passwordErrors.confirmPassword }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-500">
            Last password change: {{ lastPasswordChange || 'Never' }}
          </div>
          <button
            type="submit"
            :disabled="loading || !isPasswordValid"
            class="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  UserIcon,
  CheckIcon,
  PhoneIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

const loading = ref(false)
const uploadingPhoto = ref(false)
const photoError = ref('')
const originalForm = ref({})
const errors = ref({})
const passwordErrors = ref({})

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  profilePhoto: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRequirements = ref({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false
})

const lastPasswordChange = ref('')

const emit = defineEmits(['save', 'error'])

// Computed properties
const hasChanges = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
})

const hasErrors = computed(() => {
  return Object.keys(errors.value).some(key => errors.value[key])
})

const securityScore = computed(() => {
  let score = 0
  if (form.value.email) score += 20
  if (form.value.phone) score += 20
  if (form.value.profilePhoto) score += 10
  if (lastPasswordChange.value) score += 25
  if (passwordStrength.value >= 75) score += 25
  return Math.min(score, 100)
})

const securityLevel = computed(() => {
  if (securityScore.value >= 80) return 'Excellent'
  if (securityScore.value >= 60) return 'Good'
  if (securityScore.value >= 40) return 'Fair'
  return 'Needs Improvement'
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = passwordForm.value.newPassword
  if (!password) return 0

  let strength = 0
  if (password.length >= 8) strength += 20
  if (password.length >= 12) strength += 20
  if (/[a-z]/.test(password)) strength += 15
  if (/[A-Z]/.test(password)) strength += 15
  if (/[0-9]/.test(password)) strength += 15
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15

  return Math.min(strength, 100)
})

const passwordStrengthPercentage = computed(() => passwordStrength.value)

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 0) return 'Very Weak'
  if (passwordStrength.value <= 20) return 'Weak'
  if (passwordStrength.value <= 40) return 'Fair'
  if (passwordStrength.value <= 60) return 'Good'
  if (passwordStrength.value <= 80) return 'Strong'
  return 'Excellent'
})

const passwordStrengthColorClass = computed(() => {
  if (passwordStrength.value <= 20) return 'text-red-500'
  if (passwordStrength.value <= 40) return 'text-orange-500'
  if (passwordStrength.value <= 60) return 'text-yellow-500'
  if (passwordStrength.value <= 80) return 'text-blue-500'
  return 'text-green-500'
})

const isPasswordValid = computed(() => {
  return !passwordForm.value.currentPassword || (
    passwordForm.value.newPassword &&
    passwordForm.value.newPassword === passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword.length >= 8 &&
    passwordRequirements.value.length &&
    passwordRequirements.value.uppercase &&
    passwordRequirements.value.lowercase &&
    passwordRequirements.value.number &&
    passwordRequirements.value.special
  )
})

// Validation functions
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const isValidPhone = (phone) => {
  if (!phone) return true // Phone is optional
  const cleaned = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')
  // Basic international phone validation (7-15 digits, optional +)
  return /^[+]?\d{7,15}$/.test(cleaned)
}

const validateField = (fieldName) => {
  switch (fieldName) {
    case 'firstName':
      errors.value.firstName = form.value.firstName.trim().length < 2 ? 'First name must be at least 2 characters' : ''
      break
    case 'lastName':
      errors.value.lastName = form.value.lastName.trim().length < 2 ? 'Last name must be at least 2 characters' : ''
      break
    case 'email':
      if (!form.value.email) {
        errors.value.email = 'Email is required'
      } else if (!isValidEmail(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
      } else {
        errors.value.email = ''
      }
      break
    case 'phone':
      if (form.value.phone && !isValidPhone(form.value.phone)) {
        errors.value.phone = 'Please enter a valid phone number (7-15 digits, optional +)'
      } else {
        errors.value.phone = ''
      }
      break
  }
}

const validatePasswordField = (fieldName) => {
  switch (fieldName) {
    case 'currentPassword':
      if (!passwordForm.value.currentPassword) {
        passwordErrors.value.currentPassword = 'Current password is required'
      } else {
        passwordErrors.value.currentPassword = ''
      }
      break
    case 'newPassword':
      if (!passwordForm.value.newPassword) {
        passwordErrors.value.newPassword = 'New password is required'
      } else if (passwordForm.value.newPassword.length < 8) {
        passwordErrors.value.newPassword = 'Password must be at least 8 characters'
      } else {
        passwordErrors.value.newPassword = ''
      }
      break
    case 'confirmPassword':
      if (!passwordForm.value.confirmPassword) {
        passwordErrors.value.confirmPassword = 'Please confirm your new password'
      } else if (passwordForm.value.confirmPassword !== passwordForm.value.newPassword) {
        passwordErrors.value.confirmPassword = 'Passwords do not match'
      } else {
        passwordErrors.value.confirmPassword = ''
      }
      break
  }
}

const checkPasswordStrength = () => {
  const password = passwordForm.value.newPassword
  passwordRequirements.value = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password)
  }
}

// Photo handling
const handlePhotoChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  photoError.value = ''

  // Validate file type
  if (!file.type.startsWith('image/')) {
    photoError.value = 'Please select an image file (JPG, PNG, or GIF)'
    return
  }

  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    photoError.value = 'Image must be less than 2MB'
    return
  }

  uploadingPhoto.value = true

  try {
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.profilePhoto = e.target.result
      emit('save', { type: 'photo', payload: { profilePhoto: e.target.result } })
    }
    reader.readAsDataURL(file)
  } catch (error) {
    photoError.value = 'Failed to upload photo'
    emit('error', { message: 'Failed to upload photo' })
  } finally {
    uploadingPhoto.value = false
  }
}

const removePhoto = () => {
  form.value.profilePhoto = ''
  emit('save', { type: 'photo', payload: { profilePhoto: '' } })
}

// Form handling
const resetForm = () => {
  form.value = { ...originalForm.value }
  errors.value = {}
}

const handleSubmit = async () => {
  // Validate all fields
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('phone')

  if (hasErrors.value) {
    emit('error', { message: 'Please fix the errors before saving' })
    return
  }

  try {
    loading.value = true
    await emit('save', {
      type: 'profile',
      payload: form.value
    })

    // Update original form to track changes
    originalForm.value = { ...form.value }
  } catch (error) {
    emit('error', error || { message: 'Failed to update profile' })
  } finally {
    loading.value = false
  }
}

const handlePasswordChange = async () => {
  validatePasswordField('currentPassword')
  validatePasswordField('newPassword')
  validatePasswordField('confirmPassword')

  if (Object.values(passwordErrors.value).some(error => error)) {
    emit('error', { message: 'Please fix the password errors' })
    return
  }

  if (!isPasswordValid.value) {
    emit('error', { message: 'Please ensure passwords meet all requirements' })
    return
  }

  try {
    loading.value = true
    await emit('save', {
      type: 'password',
      payload: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword
      }
    })

    // Update last password change date
    lastPasswordChange.value = new Date().toLocaleDateString()

    // Reset password form after successful change
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    passwordErrors.value = {}
  } catch (error) {
    emit('error', error || { message: 'Failed to change password' })
  } finally {
    loading.value = false
  }
}

// Initialize form with user data
onMounted(() => {
  if (user.value) {
    form.value = {
      profilePhoto: user.value.profilePhoto || '',
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      email: user.value.email || '',
      phone: user.value.phone || ''
    }
    originalForm.value = { ...form.value }
    lastPasswordChange.value = user.value.lastPasswordChange || ''
  }
})

// Watch for form changes
watch(() => form.value, () => {
  // Auto-save functionality could be added here
}, { deep: true })
</script>