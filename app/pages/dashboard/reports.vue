<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <p class="mt-1 text-sm text-gray-500">
          Comprehensive insights into your business performance
        </p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="selectedPeriod"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="text-sm text-gray-500">Total Revenue</div>
        <div class="text-2xl font-bold text-gray-900">${{ totalRevenue.toLocaleString() }}</div>
        <div class="text-sm text-green-600">+{{ revenueGrowth }}%</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <div class="text-sm text-gray-500">Total Invoices</div>
        <div class="text-2xl font-bold text-gray-900">{{ totalInvoices }}</div>
        <div class="text-sm text-blue-600">{{ paidInvoices }} paid</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <div class="text-sm text-gray-500">Total Receipts</div>
        <div class="text-2xl font-bold text-gray-900">{{ totalReceipts }}</div>
        <div class="text-sm text-purple-600">{{ avgReceiptValue }} avg</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <div class="text-sm text-gray-500">Active Clients</div>
        <div class="text-2xl font-bold text-gray-900">{{ activeClients }}</div>
        <div class="text-sm text-orange-600">+{{ newClients }} new</div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <RevenueChart
        title="Revenue Trend"
        :data="revenueData"
      />

      <!-- Invoice Status Chart -->
      <PieChart
        title="Invoice Status Breakdown"
        :data="invoiceStatusData"
      />
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Clients -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Top Clients</h3>
        <div class="space-y-3">
          <div
            v-for="(client, index) in topClients"
            :key="index"
            class="flex items-center justify-between"
          >
            <div>
              <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
              <div class="text-xs text-gray-500">{{ client.invoices }} invoices</div>
            </div>
            <div class="text-sm font-semibold text-gray-900">${{ client.amount.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <!-- Recent Performance -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Performance</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Avg. Invoice Value</span>
            <span class="text-sm font-medium text-gray-900">${{ avgInvoiceValue }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Payment Rate</span>
            <span class="text-sm font-medium text-green-600">{{ paymentRate }}%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Avg. Payment Time</span>
            <span class="text-sm font-medium text-gray-900">{{ avgPaymentTime }} days</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Overdue Rate</span>
            <span class="text-sm font-medium text-red-600">{{ overdueRate }}%</span>
          </div>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
        <div class="space-y-3">
          <div
            v-for="(category, index) in categoryData"
            :key="index"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm text-gray-700 capitalize">{{ category.name }}</span>
              <span class="text-sm font-medium text-gray-900">{{ category.count }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                :style="{ width: `${category.percentage}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RevenueChart from '~/components/dashboard/analytics/RevenueChart.vue'
import PieChart from '~/components/dashboard/analytics/PieChart.vue'

definePageMeta({
  layout: 'dashboard'
})

// Reactive state
const selectedPeriod = ref('month')

// Mock data - will be replaced with backend data
const totalRevenue = ref(24345)
const revenueGrowth = ref(12.5)
const totalInvoices = ref(36)
const paidInvoices = ref(28)
const totalReceipts = ref(42)
const avgReceiptValue = ref(580)
const activeClients = ref(15)
const newClients = ref(3)

const avgInvoiceValue = ref(1265)
const paymentRate = ref(78)
const avgPaymentTime = ref(14)
const overdueRate = ref(22)

const revenueData = ref([
  { label: 'Jan', revenue: 15000 },
  { label: 'Feb', revenue: 22000 },
  { label: 'Mar', revenue: 18000 },
  { label: 'Apr', revenue: 25000 },
  { label: 'May', revenue: 28000 },
  { label: 'Jun', revenue: 24345 }
])

const invoiceStatusData = ref([
  { type: 'paid', value: 28, percentage: 78 },
  { type: 'pending', value: 5, percentage: 14 },
  { type: 'overdue', value: 3, percentage: 8 }
])

const topClients = ref([
  { name: 'Acme Corp', invoices: 12, amount: 28500 },
  { name: 'TechStart Inc', invoices: 8, amount: 15200 },
  { name: 'Global Solutions', invoices: 15, amount: 42000 },
  { name: 'Design Studio', invoices: 6, amount: 9800 }
])

const categoryData = ref([
  { name: 'Service', count: 25, percentage: 69 },
  { name: 'Product', count: 8, percentage: 22 },
  { name: 'Consulting', count: 3, percentage: 9 }
])
</script>