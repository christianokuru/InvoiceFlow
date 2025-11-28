<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Chart'
  }
})

const colors = {
  invoice: 'bg-indigo-500',
  receipt: 'bg-green-500',
  email: 'bg-blue-500',
  payment: 'bg-purple-500',
  paid: 'bg-green-500',
  pending: 'bg-yellow-500',
  overdue: 'bg-red-500'
}

const total = computed(() => {
  return props.data.reduce((sum, item) => sum + item.value, 0)
})

// Calculate angles for pie slices
const pieSlices = computed(() => {
  let currentAngle = 0
  return props.data.map(item => {
    const startAngle = currentAngle
    const percentage = (item.value / total.value) * 100
    const angle = (percentage / 100) * 360
    currentAngle += angle
    return {
      ...item,
      startAngle,
      angle,
      percentage: Math.round(percentage)
    }
  })
})
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>

    <!-- Simple Bar Chart instead of Pie Chart for better CSS compatibility -->
    <div class="space-y-3 mb-6">
      <div
        v-for="(item, index) in pieSlices"
        :key="index"
        class="space-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" :class="colors[item.type] || 'bg-gray-500'"></div>
            <span class="text-sm text-gray-700 capitalize">{{ item.type }}</span>
          </div>
          <div class="text-sm text-gray-900 font-medium">{{ item.value }} ({{ item.percentage }}%)</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="colors[item.type] || 'bg-gray-500'"
            :style="{ width: `${item.percentage}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Total Display -->
    <div class="text-center p-4 bg-gray-50 rounded-lg">
      <div class="text-2xl font-bold text-gray-900">{{ total }}</div>
      <div class="text-sm text-gray-500">Total</div>
    </div>
  </div>
</template>