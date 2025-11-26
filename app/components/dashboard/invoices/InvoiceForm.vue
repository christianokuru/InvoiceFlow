<script setup>
import { computed, ref, watch } from 'vue'
import Input from '../../ui/Input.vue'
import FilterSelect from '../shared/FilterSelect.vue'

const props = defineProps({
  invoice: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  generatedInvoiceNumber: {
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
  status: 'pending',
  description: ''
})

// Form errors
const errors = ref({
  client: '',
  email: '',
  amount: '',
  description: ''
})

// Status options
const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' }
]

const resetForm = () => {
  formData.value = {
    client: '',
    email: '',
    amount: '',
    status: 'pending',
    description: ''
  }
  errors.value = {
    client: '',
    email: '',
    amount: '',
    description: ''
  }
}

// Initialize form with invoice data if editing
watch(() => props.invoice, (newInvoice) => {
  if (newInvoice) {
    formData.value = {
      client: newInvoice.client || '',
      email: newInvoice.email || '',
      amount: newInvoice.amount?.toString() || '',
      status: newInvoice.status || 'pending',
      description: newInvoice.description || ''
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
    <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Invoice Number
        </label>
        <p class="text-sm text-gray-900 font-mono">
          {{ invoice ? invoice.number : generatedInvoiceNumber }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <p class="text-sm text-gray-900">
          {{ invoice ? invoice.date : generatedDate }}
        </p>
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

    <!-- Amount and Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
          Amount <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            id="amount"
            v-model="formData.amount"
            type="text"
            inputmode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            :class="[
              'w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              errors.amount ? 'border-red-500' : 'border-gray-300'
            ]"
            @blur="validateField('amount', formData.amount)"
            @input="handleInputChange('amount', $event.target.value)"
          />
        </div>
        <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
          Status <span class="text-red-500">*</span>
        </label>
        <FilterSelect
          id="status"
          v-model="formData.status"
          :options="statusOptions"
          placeholder="Select status"
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
        placeholder="Enter invoice description or services provided..."
        :class="[
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none',
          errors.description ? 'border-red-500' : 'border-gray-300'
        ]"
        @blur="validateField('description', formData.description)"
        @input="handleInputChange('description', $event.target.value)"
      ></textarea>
      <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
      <div class="mt-1 text-xs text-gray-500">
        {{ formData.description.length }}/500 characters
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-4">
      <button
        type="button"
        class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        @click="handleCancel"
        :disabled="loading"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
        :disabled="loading || !isFormValid"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ invoice ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>
          {{ invoice ? 'Update Invoice' : 'Create Invoice' }}
        </span>
      </button>
    </div>
  </form>
</template>