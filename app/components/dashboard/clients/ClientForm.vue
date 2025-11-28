<script setup>
import { useFormValidation } from '~/composables/useFormValidation'

const props = defineProps({
  client: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  status: 'active'
})

// Validation rules
const validationRules = {
  name: [
    { required: true, message: 'Client name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' }
  ],
  email: [
    { required: true, message: 'Email address is required' },
    { email: true, message: 'Please enter a valid email address' }
  ],
  phone: [
    { required: true, message: 'Phone number is required' },
    { phone: true, message: 'Please enter a valid phone number' }
  ],
  location: [
    { required: true, message: 'Address is required' }
  ],
  status: [
    { required: true, message: 'Status is required' }
  ]
}

// Initialize form data when client prop changes
watch(() => props.client, (newClient) => {
  if (newClient) {
    formData.value = {
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      location: newClient.location,
      status: newClient.status
    }
  } else {
    formData.value = {
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'active'
    }
  }
}, { immediate: true })

// Use validation composable
const { errors, isValid, validateField, validateForm, clearErrors } = useFormValidation(
  validationRules,
  formData
)

// Handle form submission
const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value })
  }
}

// Handle input changes with validation
const handleInputChange = (field, value) => {
  formData.value[field] = value
  validateField(field, value)
}

// Format amount for display
const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Client Name <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        :value="formData.name"
        @input="handleInputChange('name', $event.target.value)"
        :class="`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.name ? 'border-red-500' : 'border-gray-300'
        }`"
        placeholder="Enter client name"
        :disabled="loading"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span class="text-red-500">*</span>
        </label>
        <input
          type="email"
          :value="formData.email"
          @input="handleInputChange('email', $event.target.value)"
          :class="`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`"
          placeholder="client@example.com"
          :disabled="loading"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span class="text-red-500">*</span>
        </label>
        <input
          type="tel"
          :value="formData.phone"
          @input="handleInputChange('phone', $event.target.value)"
          :class="`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`"
          placeholder="+1 (555) 123-4567"
          :disabled="loading"
        />
        <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Address <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        :value="formData.location"
        @input="handleInputChange('location', $event.target.value)"
        :class="`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.location ? 'border-red-500' : 'border-gray-300'
        }`"
        placeholder="City, State"
        :disabled="loading"
      />
      <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Status <span class="text-red-500">*</span>
      </label>
      <select
        :value="formData.status"
        @change="handleInputChange('status', $event.target.value)"
        :class="`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors.status ? 'border-red-500' : 'border-gray-300'
        }`"
        :disabled="loading"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
    </div>

    <div v-if="client" class="p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-gray-600 mb-2">
        <strong>Note:</strong> Total Invoices and Total Amount are
        calculated automatically from backend data and cannot be
        edited manually.
      </p>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <div>
          <p class="text-xs text-gray-500">Total Invoices</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ client.totalInvoices }}
          </p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Total Amount</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ formatAmount(client.totalAmount) }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex gap-3 pt-4">
      <button
        type="button"
        @click="emit('cancel')"
        :disabled="loading"
        class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isValid"
        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ client ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>{{ client ? 'Update Client' : 'Add Client' }}</span>
      </button>
    </div>
  </form>
</template>