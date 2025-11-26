<script setup>
import { computed } from 'vue'
import SearchInput from '../shared/SearchInput.vue'
import FilterSelect from '../shared/FilterSelect.vue'
import StatusBadge from '../shared/StatusBadge.vue'
import ActionButtons from '../shared/ActionButtons.vue'
import {
  PlusIcon,
  EyeIcon,
  DownloadIcon,
  EditIcon
} from 'lucide-vue-next'

const props = defineProps({
  receipts: {
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
  filterCategory: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:searchTerm', 'update:filterCategory', 'create', 'edit', 'view', 'download'])

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Service', label: 'Service' },
  { value: 'Product', label: 'Product' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Other', label: 'Other' }
]

const getCardActions = (receipt) => [
  {
    name: 'view',
    icon: 'eye',
    variant: 'primary',
    label: 'View Receipt'
  },
  {
    name: 'download',
    icon: 'download',
    variant: 'success',
    label: 'Download PDF'
  },
  {
    name: 'edit',
    icon: 'edit',
    variant: 'primary',
    label: 'Edit Receipt'
  }
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleAction = (action, receipt) => {
  emit(action.name, receipt)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Header with Filters -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 sm:flex-2">
          <SearchInput
            :model-value="searchTerm"
            placeholder="Search receipts..."
            @update:model-value="$emit('update:searchTerm', $event)"
          />
        </div>
        <div class="sm:w-48">
          <FilterSelect
            :model-value="filterCategory"
            :options="categoryOptions"
            @update:model-value="$emit('update:filterCategory', $event)"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-12 flex justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p class="mt-2 text-gray-500">Loading receipts...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="receipts.length === 0" class="p-12 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">No receipts found</h3>
      <p class="text-gray-500 mb-4">Get started by generating your first receipt.</p>
      <button
        class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        @click="$emit('create')"
      >
        <PlusIcon :size="20" class="mr-2" />
        Generate Receipt
      </button>
    </div>

    <!-- Receipt Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <div
        v-for="receipt in receipts"
        :key="receipt.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ receipt.number }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatDate(receipt.date) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {{ receipt.category }}
            </span>
            <button
              class="text-blue-600 hover:text-blue-800 transition-colors"
              title="Edit"
              @click="$emit('edit', receipt)"
            >
              <EditIcon :size="16" />
            </button>
          </div>
        </div>

        <!-- Client Info -->
        <div class="mb-4">
          <p class="text-sm text-gray-600">{{ receipt.client }}</p>
          <p class="text-xs text-gray-500">{{ receipt.email }}</p>
          <p class="text-2xl font-semibold text-gray-900 mt-2">
            {{ formatCurrency(receipt.amount) }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            class="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            @click="$emit('view', receipt)"
          >
            <EyeIcon :size="16" class="mr-1" />
            View
          </button>
          <button
            class="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            @click="$emit('download', receipt)"
          >
            <DownloadIcon :size="16" class="mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>