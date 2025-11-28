<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">History</h1>
        <p class="mt-1 text-sm text-gray-500">
          Track all your activities and transactions
        </p>
      </div>
    </div>

    <!-- Filters -->
    <HistoryFilters
      v-model:filter-type="filterType"
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      :filtered-count="filteredHistory.length"
      :total-count="mockHistory.length"
      @clear-filters="clearFilters"
    />

    <!-- History Timeline -->
    <HistoryTimeline :items="filteredHistory" />
  </div>
</template>

<script setup>
import HistoryFilters from '~/components/dashboard/history/HistoryFilters.vue'
import HistoryTimeline from '~/components/dashboard/history/HistoryTimeline.vue'

definePageMeta({
  layout: 'dashboard'
})

// Mock data - will be replaced with backend data
const mockHistory = [
  {
    id: '1',
    type: 'invoice',
    title: 'Invoice Created',
    description: 'INV-2024-005 for Marketing Pro',
    amount: 2100,
    date: '2024-01-28',
    time: '10:30 AM'
  },
  {
    id: '2',
    type: 'email',
    title: 'Email Sent',
    description: 'Invoice sent to client@techstart.com',
    date: '2024-01-27',
    time: '3:45 PM'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment from Design Studio',
    amount: 1500,
    date: '2024-01-26',
    time: '2:15 PM'
  },
  {
    id: '4',
    type: 'receipt',
    title: 'Receipt Generated',
    description: 'REC-2024-005 for Marketing Pro',
    amount: 2100,
    date: '2024-01-25',
    time: '11:20 AM'
  },
  {
    id: '5',
    type: 'invoice',
    title: 'Invoice Updated',
    description: 'INV-2024-003 status changed to overdue',
    date: '2024-01-24',
    time: '9:00 AM'
  },
  {
    id: '6',
    type: 'email',
    title: 'Email Sent',
    description: 'Receipt sent to multiple clients',
    date: '2024-01-23',
    time: '4:30 PM'
  },
  {
    id: '7',
    type: 'payment',
    title: 'Payment Received',
    description: 'Payment from Acme Corp',
    amount: 2500,
    date: '2024-01-22',
    time: '1:45 PM'
  },
  {
    id: '8',
    type: 'receipt',
    title: 'Receipt Generated',
    description: 'REC-2024-004 for Design Studio',
    amount: 1500,
    date: '2024-01-20',
    time: '10:00 AM'
  },
  {
    id: '9',
    type: 'invoice',
    title: 'Invoice Created',
    description: 'INV-2024-002 for TechStart Inc',
    amount: 1800,
    date: '2024-01-18',
    time: '2:30 PM'
  }
]

// Reactive state
const filterType = ref('all')
const dateFrom = ref('')
const dateTo = ref('')

// Computed filtered history
const filteredHistory = computed(() => {
  return mockHistory.filter((item) => {
    const matchesType = filterType.value === 'all' || item.type === filterType.value
    let matchesDate = true

    if (dateFrom.value || dateTo.value) {
      const itemDate = new Date(item.date)
      if (dateFrom.value) {
        const fromDate = new Date(dateFrom.value)
        matchesDate = matchesDate && itemDate >= fromDate
      }
      if (dateTo.value) {
        const toDate = new Date(dateTo.value)
        matchesDate = matchesDate && itemDate <= toDate
      }
    }

    return matchesType && matchesDate
  })
})

// Methods
const clearFilters = () => {
  filterType.value = 'all'
  dateFrom.value = ''
  dateTo.value = ''
}
</script>
