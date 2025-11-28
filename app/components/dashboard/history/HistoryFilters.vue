<script setup>
import { FilterIcon, CalendarIcon } from 'lucide-vue-next'

defineProps({
  filterType: {
    type: String,
    default: 'all'
  },
  dateFrom: {
    type: String,
    default: ''
  },
  dateTo: {
    type: String,
    default: ''
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:filterType', 'update:dateFrom', 'update:dateTo', 'clearFilters'])

const clearAllFilters = () => {
  emit('update:filterType', 'all')
  emit('update:dateFrom', '')
  emit('update:dateTo', '')
  emit('clearFilters')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center gap-2 mb-4">
      <FilterIcon class="h-4 w-4 text-gray-400" />
      <h3 class="text-sm font-medium text-gray-700">Filters</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Activity Type Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Activity Type
        </label>
        <select
          :value="filterType"
          @input="$emit('update:filterType', $event.target.value)"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Activities</option>
          <option value="invoice">Invoices</option>
          <option value="receipt">Receipts</option>
          <option value="email">Emails</option>
          <option value="payment">Payments</option>
        </select>
      </div>

      <!-- From Date Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          From Date
        </label>
        <div class="relative">
          <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            :value="dateFrom"
            @input="$emit('update:dateFrom', $event.target.value)"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- To Date Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          To Date
        </label>
        <div class="relative">
          <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            :value="dateTo"
            @input="$emit('update:dateTo', $event.target.value)"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Clear Filters Button -->
      <div class="flex items-end">
        <button
          @click="clearAllFilters"
          class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Filter results count -->
    <div
      v-if="filterType !== 'all' || dateFrom || dateTo"
      class="mt-4 text-sm text-gray-600"
    >
      Showing {{ filteredCount }} of {{ totalCount }} activities
    </div>
  </div>
</template>