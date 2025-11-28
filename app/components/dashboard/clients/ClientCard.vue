<script setup>
import { MailIcon, PhoneIcon, MapPinIcon, EditIcon } from 'lucide-vue-next'

const props = defineProps({
  client: {
    type: Object,
    required: true
  },
  onEdit: {
    type: Function,
    required: true
  }
})

const getStatusClass = (status) => {
  return status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>

<template>
  <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ client.name }}
        </h3>
        <span
          :class="`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(client.status)}`"
        >
          {{ client.status.charAt(0).toUpperCase() + client.status.slice(1) }}
        </span>
      </div>
      <button
        @click="onEdit(client)"
        class="text-blue-600 hover:text-blue-800 transition-colors"
        title="Edit Client"
      >
        <EditIcon :size="20" />
      </button>
    </div>

    <div class="space-y-2 mb-4">
      <div class="flex items-center text-sm text-gray-600">
        <MailIcon :size="16" class="mr-2 text-gray-400" />
        {{ client.email }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <PhoneIcon :size="16" class="mr-2 text-gray-400" />
        {{ client.phone }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <MapPinIcon :size="16" class="mr-2 text-gray-400" />
        {{ client.location }}
      </div>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <div class="grid grid-cols-2 gap-4">
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
  </div>
</template>