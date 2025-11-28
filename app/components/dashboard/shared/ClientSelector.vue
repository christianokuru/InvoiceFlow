<script setup>
import { ref, computed, watch } from 'vue'
import { SearchIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  clients: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select clients...'
  },
  showSelectAll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const searchTerm = ref('')
const selectedClients = ref([...props.modelValue])

// Filter clients based on search
const filteredClients = computed(() => {
  if (!searchTerm.value) return props.clients

  return props.clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    (client.location && client.location.toLowerCase().includes(searchTerm.value.toLowerCase()))
  )
})

// Toggle client selection
const toggleClient = (clientId) => {
  const index = selectedClients.value.indexOf(clientId)
  if (index > -1) {
    selectedClients.value.splice(index, 1)
  } else {
    selectedClients.value.push(clientId)
  }
  emit('update:modelValue', [...selectedClients.value])
}

// Select all clients
const selectAll = () => {
  selectedClients.value = filteredClients.value.map(client => client.id)
  emit('update:modelValue', [...selectedClients.value])
}

// Clear all selections
const clearAll = () => {
  selectedClients.value = []
  emit('update:modelValue', [])
}

// Check if client is selected
const isClientSelected = (clientId) => {
  return selectedClients.value.includes(clientId)
}

// Check if all filtered clients are selected
const allFilteredSelected = computed(() => {
  return filteredClients.value.length > 0 &&
         filteredClients.value.every(client => selectedClients.value.includes(client.id))
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  selectedClients.value = [...newValue]
})
</script>

<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div class="relative">
      <SearchIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        :size="18"
      />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search clients..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Select All / Clear All -->
    <div v-if="showSelectAll && filteredClients.length > 0" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div class="text-sm text-gray-700">
        {{ selectedClients.length }} of {{ filteredClients.length }} clients selected
      </div>
      <div class="flex gap-2">
        <button
          v-if="!allFilteredSelected"
          @click="selectAll"
          class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Select All
        </button>
        <button
          v-if="selectedClients.length > 0"
          @click="clearAll"
          class="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Client List -->
    <div class="space-y-2 max-h-80 overflow-y-auto">
      <div
        v-for="client in filteredClients"
        :key="client.id"
        @click="toggleClient(client.id)"
        class="border border-gray-200 rounded-lg p-4 cursor-pointer transition-colors hover:bg-blue-50 hover:border-blue-300"
        :class="{
          'border-blue-500 bg-blue-50': isClientSelected(client.id)
        }"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-start flex-1">
            <!-- Checkbox -->
            <div class="mr-3 mt-1">
              <input
                type="checkbox"
                :checked="isClientSelected(client.id)"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                @click.stop
              />
            </div>

            <!-- Client Info -->
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ client.name }}
                </h4>
                <span
                  v-if="client.status"
                  class="ml-2 px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': client.status === 'active',
                    'bg-gray-100 text-gray-800': client.status === 'inactive'
                  }"
                >
                  {{ client.status }}
                </span>
              </div>

              <div class="space-y-1">
                <div v-if="client.email" class="flex items-center text-xs text-gray-600">
                  <MailIcon :size="12" class="mr-1 text-gray-400" />
                  {{ client.email }}
                </div>
                <div v-if="client.phone" class="flex items-center text-xs text-gray-600">
                  <PhoneIcon :size="12" class="mr-1 text-gray-400" />
                  {{ client.phone }}
                </div>
                <div v-if="client.location" class="flex items-center text-xs text-gray-600">
                  <MapPinIcon :size="12" class="mr-1 text-gray-400" />
                  {{ client.location }}
                </div>
              </div>

              <!-- Stats (if available) -->
              <div v-if="client.totalInvoices || client.totalAmount" class="mt-3 pt-3 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-3">
                  <div v-if="client.totalInvoices">
                    <p class="text-xs text-gray-500">Total Invoices</p>
                    <p class="text-sm font-semibold text-gray-900">{{ client.totalInvoices }}</p>
                  </div>
                  <div v-if="client.totalAmount">
                    <p class="text-xs text-gray-500">Total Amount</p>
                    <p class="text-sm font-semibold text-gray-900">
                      ${{ client.totalAmount.toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No clients found -->
    <div v-if="filteredClients.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">
        <svg class="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <p class="text-sm text-gray-500">No clients found</p>
      <p class="text-xs text-gray-400">Try adjusting your search terms</p>
    </div>

    <!-- Selected Summary -->
    <div v-if="selectedClients.length > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-blue-900">
          {{ selectedClients.length }} client{{ selectedClients.length !== 1 ? 's' : '' }} selected
        </p>
        <button
          @click="clearAll"
          class="text-sm text-blue-700 hover:text-blue-900 transition-colors"
        >
          Clear selection
        </button>
      </div>
    </div>
  </div>
</template>