<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Revenue Chart'
  },
  height: {
    type: String,
    default: '300px'
  }
})

const maxRevenue = computed(() => {
  return Math.max(...props.data.map(item => item.revenue))
})
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>

    <!-- Simple Bar Chart using CSS -->
    <div class="space-y-2" :style="{ height }">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex items-center gap-3"
      >
        <div class="w-16 text-sm text-gray-600">{{ item.label }}</div>
        <div class="flex-1 relative h-6 bg-gray-100 rounded">
          <div
            class="absolute inset-y-0 left-0 bg-blue-500 rounded transition-all duration-500"
            :style="{ width: `${(item.revenue / maxRevenue) * 100}%` }"
          />
          <div class="absolute inset-0 flex items-center px-2">
            <span class="text-xs text-white font-medium">${{ item.revenue.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded"></div>
        <span>Revenue</span>
      </div>
    </div>
  </div>
</template>