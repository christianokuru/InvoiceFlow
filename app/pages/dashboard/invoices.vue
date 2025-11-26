<script setup>
import { ref, computed, onMounted } from 'vue'
import { PlusIcon } from 'lucide-vue-next'
import InvoiceList from '~/components/dashboard/invoices/InvoiceList.vue'
import InvoiceModal from '~/components/dashboard/invoices/InvoiceModal.vue'

definePageMeta({
  layout: 'dashboard'
})

// Reactive data
const invoices = ref([])
const loading = ref(false)
const isModalOpen = ref(false)
const editingInvoice = ref(null)
const modalLoading = ref(false)
const searchTerm = ref('')
const filterStatus = ref('all')

// Mock data (this will come from API later)
const mockInvoices = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: 'Acme Corp',
    email: 'contact@acme.com',
    amount: 2500,
    status: 'paid',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    description: 'Website development services'
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: 'TechStart Inc',
    email: 'hello@techstart.com',
    amount: 1800,
    status: 'pending',
    date: '2024-01-20',
    dueDate: '2024-02-20',
    description: 'Mobile app design'
  },
  {
    id: '3',
    number: 'INV-2024-003',
    client: 'Global Solutions',
    email: 'info@global.com',
    amount: 3200,
    status: 'overdue',
    date: '2024-01-10',
    dueDate: '2024-02-10',
    description: 'Consulting services'
  },
  {
    id: '4',
    number: 'INV-2024-004',
    client: 'Design Studio',
    email: 'team@design.com',
    amount: 1500,
    status: 'paid',
    date: '2024-01-25',
    dueDate: '2024-02-25',
    description: 'Brand identity package'
  },
  {
    id: '5',
    number: 'INV-2024-005',
    client: 'Marketing Pro',
    email: 'contact@marketing.com',
    amount: 2100,
    status: 'pending',
    date: '2024-01-28',
    dueDate: '2024-02-28',
    description: 'SEO optimization'
  }
]

// Computed properties
const filteredInvoices = computed(() => {
  return invoices.value.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      invoice.number.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      invoice.email.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesFilter =
      filterStatus.value === 'all' || invoice.status === filterStatus.value

    return matchesSearch && matchesFilter
  })
})

// Methods
const loadInvoices = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    invoices.value = [...mockInvoices]
  } catch (error) {
    console.error('Error loading invoices:', error)
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  editingInvoice.value = null
  isModalOpen.value = true
}

const openEditModal = (invoice) => {
  editingInvoice.value = { ...invoice }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingInvoice.value = null
}

const handleInvoiceSubmit = async (formData) => {
  modalLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (editingInvoice.value) {
      // Update existing invoice
      const index = invoices.value.findIndex(inv => inv.id === editingInvoice.value.id)
      if (index !== -1) {
        invoices.value[index] = {
          ...invoices.value[index],
          ...formData
        }
      }
    } else {
      // Create new invoice
      const newInvoice = {
        id: String(invoices.value.length + 1),
        ...formData
      }
      invoices.value.unshift(newInvoice)
    }

    closeModal()
  } catch (error) {
    console.error('Error saving invoice:', error)
  } finally {
    modalLoading.value = false
  }
}

const handleSendInvoice = async (invoice) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    alert(`Invoice ${invoice.number} sent to ${invoice.email}`)
  } catch (error) {
    console.error('Error sending invoice:', error)
  }
}

const handleDownloadInvoice = async (invoice) => {
  try {
    // Simulate PDF download
    await new Promise(resolve => setTimeout(resolve, 500))
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${invoice.number}.pdf`
    link.click()
  } catch (error) {
    console.error('Error downloading invoice:', error)
  }
}

const handleEditInvoice = (invoice) => {
  openEditModal(invoice)
}

const handleFilter = () => {
  // This can be expanded to include more complex filtering logic
  console.log('Filter applied:', { searchTerm: searchTerm.value, status: filterStatus.value })
}

// Lifecycle
onMounted(() => {
  loadInvoices()
})

// SEO
useHead({
  title: 'Invoices - InvoiceFlow',
  meta: [
    { name: 'description', content: 'Manage and track all your invoices' }
  ]
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Invoices</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage and track all your invoices
        </p>
      </div>
      <button
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="openCreateModal"
      >
        <PlusIcon :size="20" class="mr-2" />
        Create Invoice
      </button>
        </div>

    <!-- Invoice List -->
    <InvoiceList
      :invoices="filteredInvoices"
      :loading="loading"
      :search-term="searchTerm"
      :filter-status="filterStatus"
      @update:search-term="searchTerm = $event"
      @update:filter-status="filterStatus = $event"
      @create="openCreateModal"
      @edit="handleEditInvoice"
      @send="handleSendInvoice"
      @download="handleDownloadInvoice"
      @filter="handleFilter"
    />

    <!-- Invoice Modal -->
    <InvoiceModal
      v-model:isOpen="isModalOpen"
      :invoice="editingInvoice"
      :loading="modalLoading"
      @close="closeModal"
      @submit="handleInvoiceSubmit"
    />
  </div>
</template>