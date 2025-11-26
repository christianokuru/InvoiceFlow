<script setup>
import { computed } from 'vue'
import SearchInput from '../shared/SearchInput.vue'
import FilterSelect from '../shared/FilterSelect.vue'
import StatusBadge from '../shared/StatusBadge.vue'
import ActionButtons from '../shared/ActionButtons.vue'
import {
  PlusIcon,
  FilterIcon,
  EditIcon,
  SendIcon,
  DownloadIcon,
  MoreVerticalIcon
} from 'lucide-vue-next'

const props = defineProps({
  invoices: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  searchTerm: {
    type: String,
    default: ''
  },
  filterStatus: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:searchTerm', 'update:filterStatus', 'create', 'edit', 'send', 'download', 'filter'])

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' }
]

const getActions = (invoice) => [
  {
    name: 'edit',
    icon: 'edit',
    variant: 'primary',
    label: 'Edit Invoice'
  },
  {
    name: 'send',
    icon: 'send',
    variant: 'success',
    label: 'Send Email'
  },
  {
    name: 'download',
    icon: 'download',
    variant: 'primary',
    label: 'Download PDF'
  },
  {
    name: 'more',
    icon: 'more',
    variant: 'secondary',
    label: 'More Options'
  }
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const handleAction = (action, invoice) => {
  emit(action.name, invoice)
}

const handleFilter = () => {
  emit('filter')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header with Filters -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <SearchInput
            :model-value="searchTerm"
            placeholder="Search invoices..."
            @update:model-value="$emit('update:searchTerm', $event)"
          />
        </div>
        <div class="flex gap-2">
          <FilterSelect
            :model-value="filterStatus"
            :options="statusOptions"
            @update:model-value="$emit('update:filterStatus', $event)"
          />
          <button
            class="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            @click="handleFilter"
          >
            <FilterIcon :size="20" class="mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-12 flex justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-gray-500">Loading invoices...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="invoices.length === 0" class="p-12 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">No invoices found</h3>
      <p class="text-gray-500 mb-4">Get started by creating your first invoice.</p>
      <button
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="$emit('create')"
      >
        <PlusIcon :size="20" class="mr-2" />
        Create Invoice
      </button>
    </div>

    <!-- Invoice Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="invoice in invoices"
            :key="invoice.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ invoice.number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ invoice.client }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ invoice.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatCurrency(invoice.amount) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <StatusBadge :status="invoice.status" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ invoice.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ invoice.dueDate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <ActionButtons
                :actions="getActions(invoice)"
                size="sm"
                @action="(action) => handleAction(action, invoice)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>