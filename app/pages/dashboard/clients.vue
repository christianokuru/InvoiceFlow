<script setup>
import { PlusIcon, SearchIcon, FileTextIcon, DollarSignIcon, MailIcon } from 'lucide-vue-next'
import ClientList from '~/components/dashboard/clients/ClientList.vue'
import ClientModal from '~/components/dashboard/clients/ClientModal.vue'

// Page metadata
definePageMeta({
  layout: 'dashboard',
  title: 'Clients'
})

// Mock data - same as React UI for consistency
const clients = ref([
  {
    id: '1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    totalInvoices: 12,
    totalAmount: 28500,
    status: 'active',
    transactions: [
      { id: '1', type: 'invoice', number: 'INV-2024-001', amount: 2500, date: '2024-01-15', status: 'paid' },
      { id: '2', type: 'payment', amount: 2500, date: '2024-01-20', status: 'completed' },
      { id: '3', type: 'invoice', number: 'INV-2024-002', amount: 1800, date: '2024-01-25', status: 'pending' }
    ]
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'hello@techstart.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    totalInvoices: 8,
    totalAmount: 15200,
    status: 'active',
    transactions: [
      { id: '4', type: 'invoice', number: 'INV-2024-003', amount: 3200, date: '2024-01-22', status: 'paid' },
      { id: '5', type: 'payment', amount: 3200, date: '2024-01-23', status: 'completed' }
    ]
  },
  {
    id: '3',
    name: 'Global Solutions',
    email: 'info@global.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    totalInvoices: 15,
    totalAmount: 42000,
    status: 'active',
    transactions: [
      { id: '6', type: 'invoice', number: 'INV-2024-004', amount: 1500, date: '2024-01-10', status: 'overdue' },
      { id: '7', type: 'invoice', number: 'INV-2024-005', amount: 2100, date: '2024-01-28', status: 'pending' }
    ]
  },
  {
    id: '4',
    name: 'Design Studio',
    email: 'team@design.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    totalInvoices: 6,
    totalAmount: 9800,
    status: 'inactive',
    transactions: [
      { id: '8', type: 'invoice', number: 'INV-2024-006', amount: 1200, date: '2024-01-05', status: 'paid' },
      { id: '9', type: 'payment', amount: 1200, date: '2024-01-08', status: 'completed' }
    ]
  },
  {
    id: '5',
    name: 'Marketing Pro',
    email: 'contact@marketing.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    totalInvoices: 10,
    totalAmount: 22100,
    status: 'active',
    transactions: [
      { id: '10', type: 'invoice', number: 'INV-2024-007', amount: 3500, date: '2024-01-30', status: 'pending' }
    ]
  }
])

// UI state
const activeTab = ref('clients')
const searchTerm = ref('')
const filterStatus = ref('all')
const isModalOpen = ref(false)
const editingClient = ref(null)
const loading = ref(false)

// Computed filtered clients
const filteredClients = computed(() => {
  return clients.value.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'all' || client.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

// Modal handlers
const openCreateModal = () => {
  editingClient.value = null
  isModalOpen.value = true
}

const openEditModal = (client) => {
  editingClient.value = client
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingClient.value = null
}

// Form submission handler
const handleClientSubmit = async (formData) => {
  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (editingClient.value) {
      // Update existing client
      const index = clients.value.findIndex(c => c.id === editingClient.value.id)
      if (index !== -1) {
        clients.value[index] = {
          ...clients.value[index],
          ...formData
        }
      }
    } else {
      // Create new client
      const newClient = {
        id: String(clients.value.length + 1),
        ...formData,
        totalInvoices: 0,
        totalAmount: 0,
        transactions: []
      }
      clients.value.push(newClient)
    }

    closeModal()
  } catch (error) {
    console.error('Error saving client:', error)
  } finally {
    loading.value = false
  }
}

// Transaction history data
const transactionHistory = computed(() => {
  const allTransactions = []
  clients.value.forEach(client => {
    client.transactions.forEach(transaction => {
      allTransactions.push({
        ...transaction,
        clientName: client.name,
        clientEmail: client.email
      })
    })
  })
  return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Format helpers
const formatAmount = (amount) => {
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

const getTransactionIcon = (type) => {
  switch (type) {
    case 'invoice':
      return FileTextIcon
    case 'payment':
      return DollarSignIcon
    default:
      return FileTextIcon
  }
}

const getTransactionIconClass = (type) => {
  switch (type) {
    case 'invoice':
      return 'text-indigo-500'
    case 'payment':
      return 'text-green-500'
    default:
      return 'text-gray-500'
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Clients</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage your client relationships
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusIcon :size="20" class="mr-2" />
        Add Client
      </button>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'clients'"
          :class="activeTab === 'clients' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          Client List
        </button>
        <button
          @click="activeTab = 'transactions'"
          :class="activeTab === 'transactions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors"
        >
          Transaction History
        </button>
      </nav>
    </div>

    <!-- Clients Tab -->
    <div v-if="activeTab === 'clients'">
      <!-- Search and Filter Bar -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 relative">
              <SearchIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                :size="20"
              />
              <input
                type="text"
                placeholder="Search clients..."
                v-model="searchTerm"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              v-model="filterStatus"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div v-if="searchTerm || filterStatus !== 'all'" class="mt-4 text-sm text-gray-600">
            Showing {{ filteredClients.length }} of {{ clients.length }} clients
          </div>
        </div>

        <!-- Client List -->
        <ClientList
          :clients="filteredClients"
          :loading="loading"
          :on-edit="openEditModal"
        />
      </div>
    </div>

    <!-- Transaction History Tab -->
    <div v-if="activeTab === 'transactions'">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">All Client Transactions</h3>
          <p class="mt-1 text-sm text-gray-500">
            Complete transaction history across all clients
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
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
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="transaction in transactionHistory"
                :key="transaction.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <component
                      :is="getTransactionIcon(transaction.type)"
                      :size="20"
                      :class="getTransactionIconClass(transaction.type)"
                    />
                    <span class="ml-2 text-sm font-medium text-gray-900 capitalize">
                      {{ transaction.type }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ transaction.number || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ transaction.clientName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.clientEmail }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {{ formatAmount(transaction.amount) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(transaction.status)}`">
                    {{ transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.date) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Client Modal -->
    <ClientModal
      :is-open="isModalOpen"
      :client="editingClient"
      :loading="loading"
      @close="closeModal"
      @submit="handleClientSubmit"
    />
  </div>
</template>