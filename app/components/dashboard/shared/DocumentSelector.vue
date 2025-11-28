<script setup>
import { ref, computed, watch } from 'vue'
import { SearchIcon, FileTextIcon, ReceiptIcon, CalendarIcon, DollarSignIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  documents: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select a document...'
  },
  showTypeSeparation: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'document-selected'])

const searchTerm = ref('')
const selectedDocument = ref(props.modelValue)

// Filter documents based on search
const filteredDocuments = computed(() => {
  if (!searchTerm.value) return props.documents

  return props.documents.filter(doc =>
    doc.number.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Separate documents by type
const invoices = computed(() =>
  filteredDocuments.value.filter(doc => doc.type.toLowerCase() === 'invoice')
)

const receipts = computed(() =>
  filteredDocuments.value.filter(doc => doc.type.toLowerCase() === 'receipt')
)

// Handle document selection
const selectDocument = (document) => {
  selectedDocument.value = document.id
  emit('update:modelValue', document.id)
  emit('document-selected', document)
}

// Format amount
const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  selectedDocument.value = newValue
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
        placeholder="Search documents..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Document Selection -->
    <div class="space-y-6">
      <!-- Invoices Section -->
      <div v-if="showTypeSeparation && invoices.length > 0">
        <h3 class="text-sm font-medium text-gray-700 flex items-center">
          <FileTextIcon :size="16" class="mr-2 text-indigo-500" />
          Invoices ({{ invoices.length }})
        </h3>
        <div class="space-y-2">
          <div
            v-for="document in invoices"
            :key="document.id"
            @click="selectDocument(document)"
            class="border border-gray-200 rounded-lg p-3 cursor-pointer transition-colors hover:bg-indigo-50 hover:border-indigo-300"
            :class="{
              'border-indigo-500 bg-indigo-50': selectedDocument === document.id
            }"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <div class="p-2 rounded bg-indigo-100 mr-3">
                    <FileTextIcon :size="16" class="text-indigo-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ document.number }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ document.client }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">
                  {{ formatAmount(document.amount) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(document.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Receipts Section -->
      <div v-if="showTypeSeparation && receipts.length > 0">
        <h3 class="text-sm font-medium text-gray-700 flex items-center">
          <ReceiptIcon :size="16" class="mr-2 text-green-500" />
          Receipts ({{ receipts.length }})
        </h3>
        <div class="space-y-2">
          <div
            v-for="document in receipts"
            :key="document.id"
            @click="selectDocument(document)"
            class="border border-gray-200 rounded-lg p-3 cursor-pointer transition-colors hover:bg-green-50 hover:border-green-300"
            :class="{
              'border-green-500 bg-green-50': selectedDocument === document.id
            }"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <div class="p-2 rounded bg-green-100 mr-3">
                    <ReceiptIcon :size="16" class="text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ document.number }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ document.client }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">
                  {{ formatAmount(document.amount) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(document.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Combined List (when type separation is disabled) -->
      <div v-if="!showTypeSeparation">
        <div class="space-y-2">
          <div
            v-for="document in filteredDocuments"
            :key="document.id"
            @click="selectDocument(document)"
            class="border border-gray-200 rounded-lg p-3 cursor-pointer transition-colors hover:bg-gray-50"
            :class="{
              'border-blue-500 bg-blue-50': selectedDocument === document.id
            }"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <div
                    class="p-2 rounded mr-3"
                    :class="{
                      'bg-indigo-100': document.type.toLowerCase() === 'invoice',
                      'bg-green-100': document.type.toLowerCase() === 'receipt'
                    }"
                  >
                    <FileTextIcon
                      v-if="document.type.toLowerCase() === 'invoice'"
                      :size="16"
                      class="text-indigo-600"
                    />
                    <ReceiptIcon
                      v-else
                      :size="16"
                      class="text-green-600"
                    />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ document.number }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ document.client }} • {{ document.type }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">
                  {{ formatAmount(document.amount) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(document.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No documents found -->
      <div v-if="filteredDocuments.length === 0" class="text-center py-8">
        <div class="text-gray-400 mb-2">
          <FileTextIcon :size="48" class="mx-auto" />
        </div>
        <p class="text-sm text-gray-500">No documents found</p>
        <p class="text-xs text-gray-400">Try adjusting your search terms</p>
      </div>
    </div>
  </div>
</template>