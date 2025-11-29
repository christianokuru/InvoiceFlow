<script setup>
import DashboardStats from '~/components/dashboard/shared/DashboardStats.vue'
import RevenueChart from '~/components/dashboard/analytics/RevenueChart.vue'
import PieChart from '~/components/dashboard/analytics/PieChart.vue'
import RecentActivity from '~/components/dashboard/shared/RecentActivity.vue'
import QuickActions from '~/components/dashboard/shared/QuickActions.vue'

definePageMeta({
  layout: 'dashboard'
})

// Dashboard stats data
const dashboardStats = [
  {
    icon: 'revenue',
    title: 'Total Revenue',
    value: '$24,345.00',
    trend: '+12.5%',
    trendUp: true,
    color: 'blue'
  },
  {
    icon: 'invoices',
    title: 'Invoices',
    value: '36',
    subtitle: '8 pending',
    color: 'indigo'
  },
  {
    icon: 'receipts',
    title: 'Receipts',
    value: '42',
    subtitle: 'Last: Today',
    color: 'green'
  }
]

// Mock analytics data
const monthlyRevenue = [
  { label: 'Jan', revenue: 15000 },
  { label: 'Feb', revenue: 22000 },
  { label: 'Mar', revenue: 18000 },
  { label: 'Apr', revenue: 25000 },
  { label: 'May', revenue: 28000 },
  { label: 'Jun', revenue: 24345 }
]

const activityData = [
  { type: 'invoice', value: 36, percentage: 40 },
  { type: 'receipt', value: 42, percentage: 47 },
  { type: 'email', value: 8, percentage: 9 },
  { type: 'payment', value: 4, percentage: 4 }
]

// Recent activities data
const recentActivities = [
  {
    icon: 'invoice',
    type: 'invoice',
    title: 'Invoice #1234 created',
    time: '2 hours ago',
    amount: '$1,234.56'
  },
  {
    icon: 'receipt',
    type: 'receipt',
    title: 'Receipt #5678 generated',
    time: '4 hours ago',
    amount: '$890.00'
  },
  {
    icon: 'email',
    type: 'email',
    title: 'Invoice sent to client',
    time: '1 day ago',
    amount: '$2,450.00'
  },
  {
    icon: 'payment',
    type: 'payment',
    title: 'Payment received',
    time: '2 days ago',
    amount: '$3,200.00'
  }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">
        Manage your invoices and receipts
      </p>
    </div>

    <!-- Stats Grid -->
    <DashboardStats :stats="dashboardStats" />

    <!-- Analytics Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueChart
        title="Monthly Revenue"
        :data="monthlyRevenue"
      />
      <PieChart
        title="Activity Breakdown"
        :data="activityData"
      />
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RecentActivity :activities="recentActivities" />
      <QuickActions />
    </div>
  </div>
</template>