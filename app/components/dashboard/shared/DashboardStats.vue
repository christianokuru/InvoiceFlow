<script setup>
import {
  TrendingUpIcon,
  FileTextIcon,
  ReceiptIcon,
  UsersIcon,
  DollarSignIcon
} from 'lucide-vue-next'

const props = defineProps({
  stats: {
    type: Array,
    required: true
  }
})

const getIcon = (iconName) => {
  const icons = {
    trending: TrendingUpIcon,
    revenue: DollarSignIcon,
    invoices: FileTextIcon,
    receipts: ReceiptIcon,
    clients: UsersIcon
  }
  return icons[iconName] || TrendingUpIcon
}

const getIconColor = (color) => {
  const colorMap = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500'
  }
  return colorMap[color] || 'text-blue-500'
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div class="flex items-center justify-between">
        <div class="p-3 rounded-full bg-gray-50">
          <component
            :is="getIcon(stat.icon)"
            :class="['h-6 w-6', getIconColor(stat.color || 'blue')]"
          />
        </div>
        <div
          v-if="stat.trend"
          :class="[
            'text-sm font-medium',
            stat.trendUp ? 'text-green-500' : 'text-red-500'
          ]"
        >
          {{ stat.trend }}
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-medium text-gray-500">{{ stat.title }}</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stat.value }}</p>
        <p v-if="stat.subtitle" class="mt-1 text-sm text-gray-500">{{ stat.subtitle }}</p>
      </div>
    </div>
  </div>
</template>