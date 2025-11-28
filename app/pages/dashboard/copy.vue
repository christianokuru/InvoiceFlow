<script setup>
import { ref, computed } from 'vue'
import { CopyIcon, CheckIcon, FileTextIcon, ReceiptIcon, SearchIcon } from 'lucide-vue-next'

// Page metadata
definePageMeta({
  layout: 'dashboard',
  title: 'Copy Documents'
})

// Mock data - same as React UI for consistency
const mockDocuments = ref([
  {
    id: '1',
    type: 'invoice',
    number: 'INV-2024-001',
    client: 'Acme Corp',
    amount: 2500,
    date: '2024-01-15',
    status: 'paid'
  },
  {
    id: '2',
    type: 'invoice',
    number: 'INV-2024-002',
    client: 'TechStart Inc',
    amount: 1800,
    date: '2024-01-20',
    status: 'pending'
  },
  {
    id: '3',
    type: 'receipt',
    number: 'REC-2024-001',
    client: 'Global Solutions',
    amount: 3200,
    date: '2024-01-22',
    status: 'completed'
  },
  {
    id: '4',
    type: 'invoice',
    number: 'INV-2024-003',
    client: 'Design Studio',
    amount: 1500,
    date: '2024-01-25',
    status: 'paid'
  },
  {
    id: '5',
    type: 'receipt',
    number: 'REC-2024-002',
    client: 'Marketing Pro',
    amount: 2100,
    date: '2024-01-28',
    status: 'completed'
  }
])

// State
const searchTerm = ref('')
const copiedDocuments = ref(new Set())
const copyResults = ref([])
const isProcessing = ref(false)

// Filter documents based on search
const filteredDocuments = computed(() => {
  if (!searchTerm.value) return mockDocuments.value

  return mockDocuments.value.filter(doc =>
    doc.number.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    doc.client.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Generate new document number
const generateNewNumber = (document) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')

  const prefix = document.type === 'invoice' ? 'INV' : 'REC'
  return `${prefix}-${year}-${month}-${random}`
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

// Get today's date
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

// Handle document copy
const handleCopy = async (document) => {
  if (copiedDocuments.value.has(document.id)) {
    return // Already copied
  }

  isProcessing.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Create copy of the document
    const copiedDocument = {
      ...document,
      id: `${document.id}-copy-${Date.now()}`,
      number: generateNewNumber(document),
      date: getTodayDate(),
      status: document.type === 'invoice' ? 'draft' : 'completed'
    }

    // Add to copied documents
    copiedDocuments.value.add(document.id)
    copyResults.value.unshift({
      original: document,
      copy: copiedDocument,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error copying document:', error)
  } finally {
    isProcessing.value = false
  }
}

// Get document type color
const getDocumentTypeColor = (type) => {
  return type === 'invoice' ? 'indigo' : 'green'
}

// Get status badge color
const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Clear copy results
const clearResults = () => {
  copyResults.value = []
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Copy Documents</h1>
      <p class="mt-1 text-sm text-gray-500">
        Duplicate existing invoices and receipts with new numbers and dates
      </p>
    </div>

    <!-- Search Bar -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="relative">
        <SearchIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          :size="18"
        />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search documents by number, client, or type..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Copy Results -->
    <div v-if="copyResults.length > 0" class="bg-green-50 rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h3 class="text-sm font-medium text-green-800">
            Recently Copied Documents
          </h3>
          <p class="text-xs text-green-600 mt-1">
            {{ copyResults.length }} document{{ copyResults.length !== 1 ? 's' : '' }} copied successfully
          </p>
        </div>
        <button
          @click="clearResults"
          class="text-sm text-green-700 hover:text-green-900 transition-colors"
        >
          Clear
        </button>
      </div>

      <div class="space-y-2 max-h-40 overflow-y-auto">
        <div
          v-for="result in copyResults.slice(0, 3)"
          :key="result.copy.id"
          class="flex items-center justify-between text-xs bg-white rounded p-2"
        >
          <div class="flex items-center space-x-2">
            <CheckIcon :size="14" class="text-green-600" />
            <span class="font-medium text-gray-900">{{ result.original.number }}</span>
            <span class="text-gray-400">→</span>
            <span class="font-medium text-green-600">{{ result.copy.number }}</span>
          </div>
          <span class="text-gray-500">
            {{ formatDate(result.timestamp) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Documents List -->
    <div class="bg-white rounded-lg shadow">
      <!-- List Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Available Documents</h3>
            <p class="mt-1 text-sm text-gray-600">
              Select a document to create a copy. The copy will have a new number and today's date.
            </p>
          </div>
          <div class="text-sm text-gray-500">
            {{ filteredDocuments.length }} document{{ filteredDocuments.length !== 1 ? 's' : '' }}
          </div>
        </div>
      </div>

      <!-- Documents Grid/List -->
      <div class="divide-y divide-gray-200">
        <div
          v-for="document in filteredDocuments"
          :key="document.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <!-- Document Type Icon -->
              <div
                class="p-3 rounded-lg"
                :class="{
                  'bg-indigo-100': document.type === 'invoice',
                  'bg-green-100': document.type === 'receipt'
                }"
              >
                <FileTextIcon
                  v-if="document.type === 'invoice'"
                  :size="24"
                  class="text-indigo-600"
                />
                <ReceiptIcon
                  v-else
                  :size="24"
                  class="text-green-600"
                />
              </div>

              <!-- Document Info -->
              <div>
                <div class="flex items-center space-x-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ document.number }}
                  </h4>
                  <span
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="getStatusBadgeColor(document.status)"
                  >
                    {{ document.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ document.client }}</p>
                <div class="flex items-center space-x-4 mt-2">
                  <span class="text-xs text-gray-500">
                    Type: <span class="capitalize">{{ document.type }}</span>
                  </span>
                  <span class="text-xs text-gray-500">
                    Date: {{ formatDate(document.date) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Amount and Actions -->
            <div class="flex items-center space-x-6">
              <div class="text-right">
                <p class="text-lg font-semibold text-gray-900">
                  {{ formatAmount(document.amount) }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatDate(document.date) }}
                </p>
              </div>

              <!-- Copy Button -->
              <button
                @click="handleCopy(document)"
                :disabled="isProcessing || copiedDocuments.has(document.id)"
                class="flex items-center px-4 py-2 rounded-lg transition-all font-medium text-sm"
                :class="{
                  'bg-green-600 text-white hover:bg-green-700': !copiedDocuments.has(document.id),
                  'bg-green-600 text-white cursor-default': copiedDocuments.has(document.id),
                  'bg-gray-300 text-gray-500 cursor-not-allowed': isProcessing && !copiedDocuments.has(document.id)
                }"
              >
                <CheckIcon
                  v-if="copiedDocuments.has(document.id)"
                  :size="16"
                  class="mr-2"
                />
                <CopyIcon
                  v-else
                  :size="16"
                  class="mr-2"
                />
                {{ copiedDocuments.has(document.id) ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Copied Indicator -->
          <div
            v-if="copiedDocuments.has(document.id)"
            class="mt-3 p-2 bg-green-50 rounded text-xs text-green-700"
          >
            ✓ Document copied successfully with new number: {{ generateNewNumber(document) }}
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredDocuments.length === 0"
        class="text-center py-12"
      >
        <div class="text-gray-400 mb-4">
          <FileTextIcon :size="48" class="mx-auto" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 mb-2">No documents found</h3>
        <p class="text-sm text-gray-500">
          {{ searchTerm ? 'Try adjusting your search terms' : 'No documents available to copy' }}
        </p>
      </div>
    </div>

    <!-- Instructions -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-2">How Document Copying Works</h4>
      <ul class="text-xs text-gray-600 space-y-1">
        <li>• Select a document to create an exact copy with a new document number</li>
        <li>• The copy will be assigned today's date as the document date</li>
        <li>• Invoice copies will be created as "draft" status by default</li>
        <li>• Receipt copies will be created as "completed" status by default</li>
        <li>• All document details (client, amount, description) will be preserved</li>
        <li>• You can edit the copied document after creation if needed</li>
      </ul>
    </div>
  </div>
</template>
