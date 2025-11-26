<script setup>
import { computed, ref, watch } from 'vue'
import Input from '../../ui/Input.vue'
import FilterSelect from '../shared/FilterSelect.vue'

const props = defineProps({
  receipt: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  generatedReceiptNumber: {
    type: String,
    default: ''
  },
  generatedDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit', 'cancel'])

// Form data
const formData = ref({
  client: '',
  email: '',
  amount: '',
  category: 'Service',
  description: ''
})

// Form errors
const errors = ref({
  client: '',
  email: '',
  amount: '',
  description: ''
})

// Category options
const categoryOptions = [
  { value: 'Service', label: 'Service' },
  { value: 'Product', label: 'Product' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Other', label: 'Other' }
]

const resetForm = () => {
  formData.value = {
    client: '',
    email: '',
    amount: '',
    category: 'Service',
    description: ''
  }
  errors.value = {
    client: '',
    email: '',
    amount: '',
    description: ''
  }
}

// Initialize form with receipt data if editing
watch(() => props.receipt, (newReceipt) => {
  if (newReceipt) {
    formData.value = {
      client: newReceipt.client || '',
      email: newReceipt.email || '',
      amount: newReceipt.amount?.toString() || '',
      category: newReceipt.category || 'Service',
      description: newReceipt.description || ''
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateAmount = (amount) => {
  const amountRegex = /^\d+(\.\d{1,2})?$/
  return amountRegex.test(amount) && parseFloat(amount) > 0
}

const validateField = (field, value) => {
  switch (field) {
    case 'client':
      errors.value.client = !value.trim() ? 'Client name is required' : ''
      break
    case 'email':
      if (!value.trim()) {
        errors.value.email = 'Email address is required'
      } else if (!validateEmail(value)) {
        errors.value.email = 'Please enter a valid email address'
      } else {
        errors.value.email = ''
      }
      break
    case 'amount':
      if (!value.trim()) {
        errors.value.amount = 'Amount is required'
      } else if (!validateAmount(value)) {
        errors.value.amount = 'Please enter a valid amount'
      } else {
        errors.value.amount = ''
      }
      break
    case 'description':
      errors.value.description = !value.trim() ? 'Description is required' : ''
      break
  }
}

const handleInputChange = (field, value) => {
  formData.value[field] = value
  validateField(field, value)
}

const validateForm = () => {
  // Validate all fields
  validateField('client', formData.value.client)
  validateField('email', formData.value.email)
  validateField('amount', formData.value.amount)
  validateField('description', formData.value.description)

  // Check if there are any errors
  return Object.values(errors.value).every(error => !error)
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', {
      ...formData.value,
      amount: parseFloat(formData.value.amount)
    })
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const isFormValid = computed(() => {
  return Object.values(errors.value).every(error => !error) &&
         formData.value.client.trim() &&
         formData.value.email.trim() &&
         formData.value.amount.trim() &&
         formData.value.description.trim()
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Auto-generated fields display -->
    <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Receipt Number
        </label>
        <div class="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100-4h-.5a1 1 0 000-2H8a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm text-gray-900 font-mono">
            {{ receipt ? receipt.number : generatedReceiptNumber }}
          </p>
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <div class="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm text-gray-900">
            {{ receipt ? receipt.date : generatedDate }}
          </p>
        </div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        id="client-name"
        v-model="formData.client"
        label="Client Name"
        placeholder="Enter client name"
        required
        :error="errors.client"
        @blur="validateField('client', formData.client)"
        @update:model-value="handleInputChange('client', $event)"
      />

      <Input
        id="client-email"
        v-model="formData.email"
        type="email"
        label="Email Address"
        placeholder="client@example.com"
        required
        :error="errors.email"
        @blur="validateField('email', formData.email)"
        @update:model-value="handleInputChange('email', $event)"
      />
    </div>

    <!-- Amount and Category -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
          Amount <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            id="amount"
            v-model="formData.amount"
            type="text"
            inputmode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            :class="[
              'block w-full pl-7 pr-3 py-2 border rounded-md text-sm font-mono',
              'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500',
              'placeholder:text-gray-400',
              errors.amount ? 'border-red-300 text-red-900' : 'border-gray-300'
            ]"
            @blur="validateField('amount', formData.amount)"
            @input="handleInputChange('amount', $event.target.value)"
          />
        </div>
        <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
      </div>

      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
          Category <span class="text-red-500">*</span>
        </label>
        <FilterSelect
          id="category"
          v-model="formData.category"
          :options="categoryOptions"
          placeholder="Select category"
        />
      </div>
    </div>

    <!-- Description -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        Description <span class="text-red-500">*</span>
      </label>
      <textarea
        id="description"
        v-model="formData.description"
        rows="4"
        placeholder="Enter receipt description..."
        :class="[
          'block w-full px-3 py-2 border rounded-md resize-none',
          'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500',
          'placeholder:text-gray-400',
          errors.description ? 'border-red-300' : 'border-gray-300'
        ]"
        @blur="validateField('description', formData.description)"
        @input="handleInputChange('description', $event.target.value)"
      ></textarea>
      <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
      <div class="mt-1 text-xs text-gray-500 text-right">
        {{ formData.description.length }}/500 characters
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-4">
      <button
        type="button"
        class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleCancel"
        :disabled="loading"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400 disabled:cursor-not-allowed"
        :disabled="loading || !isFormValid"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ receipt ? 'Updating...' : 'Generating...' }}
        </span>
        <span v-else>
          {{ receipt ? 'Update Receipt' : 'Generate Receipt' }}
        </span>
      </button>
    </div>
  </form>
</template>