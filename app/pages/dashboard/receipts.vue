<script setup>
import { ref, computed, onMounted } from 'vue'
import { PlusIcon } from 'lucide-vue-next'
import ReceiptList from '~/components/dashboard/receipts/ReceiptList.vue'
import ReceiptModal from '~/components/dashboard/receipts/ReceiptModal.vue'

definePageMeta({
  layout: 'dashboard'
})

// Reactive data
const receipts = ref([])
const loading = ref(false)
const isModalOpen = ref(false)
const editingReceipt = ref(null)
const modalLoading = ref(false)
const searchTerm = ref('')
const filterCategory = ref('all')

// Mock data (this will come from API later)
const mockReceipts = [
  {
    id: '1',
    number: 'REC-2024-001',
    client: 'Acme Corp',
    email: 'contact@acme.com',
    amount: 2500,
    date: '2024-01-15',
    category: 'Service',
    description: 'Website maintenance'
  },
  {
    id: '2',
    number: 'REC-2024-002',
    client: 'TechStart Inc',
    email: 'hello@techstart.com',
    amount: 1800,
    date: '2024-01-20',
    category: 'Product',
    description: 'Software license'
  },
  {
    id: '3',
    number: 'REC-2024-003',
    client: 'Global Solutions',
    email: 'info@global.com',
    amount: 3200,
    date: '2024-01-22',
    category: 'Consulting',
    description: 'Business consultation'
  },
  {
    id: '4',
    number: 'REC-2024-004',
    client: 'Design Studio',
    email: 'team@design.com',
    amount: 1500,
    date: '2024-01-25',
    category: 'Service',
    description: 'Design services'
  },
  {
    id: '5',
    number: 'REC-2024-005',
    client: 'Marketing Pro',
    email: 'contact@marketing.com',
    amount: 2100,
    date: '2024-01-28',
    category: 'Product',
    description: 'Marketing tools'
  }
]

// Computed properties
const filteredReceipts = computed(() => {
  return receipts.value.filter((receipt) => {
    const matchesSearch =
      receipt.client.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      receipt.number.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      receipt.email.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesCategory =
      filterCategory.value === 'all' || receipt.category === filterCategory.value

    return matchesSearch && matchesCategory
  })
})

// Methods
const loadReceipts = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    receipts.value = [...mockReceipts]
  } catch (error) {
    console.error('Error loading receipts:', error)
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  editingReceipt.value = null
  isModalOpen.value = true
}

const openEditModal = (receipt) => {
  editingReceipt.value = { ...receipt }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingReceipt.value = null
}

const handleReceiptSubmit = async (formData) => {
  modalLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (editingReceipt.value) {
      // Update existing receipt
      const index = receipts.value.findIndex(rec => rec.id === editingReceipt.value.id)
      if (index !== -1) {
        receipts.value[index] = {
          ...receipts.value[index],
          ...formData
        }
      }
    } else {
      // Create new receipt
      const newReceipt = {
        id: String(receipts.value.length + 1),
        ...formData
      }
      receipts.value.unshift(newReceipt)
    }

    closeModal()
  } catch (error) {
    console.error('Error saving receipt:', error)
  } finally {
    modalLoading.value = false
  }
}

const handleViewReceipt = async (receipt) => {
  try {
    // Simulate viewing receipt details
    console.log('Viewing receipt:', receipt.number)
    // This would typically open a receipt preview modal or navigate to a detail page
    alert(`Viewing receipt ${receipt.number}\nClient: ${receipt.client}\nAmount: $${receipt.amount.toLocaleString()}`)
  } catch (error) {
    console.error('Error viewing receipt:', error)
  }
}

const handleDownloadReceipt = async (receipt) => {
  try {
    // Simulate PDF download
    await new Promise(resolve => setTimeout(resolve, 500))
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${receipt.number}.pdf`
    link.click()
  } catch (error) {
    console.error('Error downloading receipt:', error)
  }
}

const handleEditReceipt = (receipt) => {
  openEditModal(receipt)
}

// Lifecycle
onMounted(() => {
  loadReceipts()
})

// SEO
useHead({
  title: 'Receipts - InvoiceFlow',
  meta: [
    { name: 'description', content: 'Generate and manage receipts' }
  ]
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Receipts</h1>
        <p class="mt-1 text-sm text-gray-500">
          Generate and manage receipts
        </p>
      </div>
      <button
        class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        @click="openCreateModal"
      >
        <PlusIcon :size="20" class="mr-2" />
        Generate Receipt
      </button>
    </div>

    <!-- Receipt List -->
    <ReceiptList
      :receipts="filteredReceipts"
      :loading="loading"
      :search-term="searchTerm"
      :filter-category="filterCategory"
      @update:search-term="searchTerm = $event"
      @update:filter-category="filterCategory = $event"
      @create="openCreateModal"
      @edit="handleEditReceipt"
      @view="handleViewReceipt"
      @download="handleDownloadReceipt"
    />

    <!-- Receipt Modal -->
    <ReceiptModal
      v-model:isOpen="isModalOpen"
      :receipt="editingReceipt"
      :loading="modalLoading"
      @close="closeModal"
      @submit="handleReceiptSubmit"
    />
  </div>
</template>