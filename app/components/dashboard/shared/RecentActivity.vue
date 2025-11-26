<script setup>
import {
  FileTextIcon,
  ReceiptIcon,
  MailIcon,
  DollarSignIcon
} from 'lucide-vue-next'

const props = defineProps({
  activities: {
    type: Array,
    required: true
  }
})

const getIcon = (iconName) => {
  const icons = {
    invoice: FileTextIcon,
    receipt: ReceiptIcon,
    email: MailIcon,
    payment: DollarSignIcon
  }
  return icons[iconName] || FileTextIcon
}

const getIconColor = (type) => {
  const colorMap = {
    invoice: 'text-indigo-500',
    receipt: 'text-green-500',
    email: 'text-blue-500',
    payment: 'text-green-600'
  }
  return colorMap[type] || 'text-gray-500'
}
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
    </div>
    <div class="divide-y divide-gray-200">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <component
              :is="getIcon(activity.icon)"
              :class="['h-5 w-5', getIconColor(activity.type)]"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
            <p class="text-sm text-gray-500">{{ activity.time }}</p>
          </div>
        </div>
        <div class="text-sm font-medium text-gray-900">
          {{ activity.amount }}
        </div>
      </div>
    </div>
  </div>
</template>