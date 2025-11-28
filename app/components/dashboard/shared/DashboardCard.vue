<script setup>
const props = defineProps({
  icon: {
    type: [Object, String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  trend: {
    type: String,
    default: ''
  },
  trendUp: {
    type: Boolean,
    default: true
  },
  isCurrency: {
    type: Boolean,
    default: false
  }
})

const formattedValue = computed(() => {
  if (props.isCurrency) {
    return `$${props.value}`
  }
  return props.value
})
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
    <div class="flex items-center justify-between">
      <div class="p-3 rounded-full bg-gray-50">
        <component
          v-if="typeof icon === 'object'"
          :is="icon"
          class="h-6 w-6 text-blue-500"
        />
        <span
          v-else
          class="text-2xl"
        >
          {{ icon }}
        </span>
      </div>
      <div
        v-if="trend"
        :class="[
          'text-sm font-medium',
          trendUp ? 'text-green-500' : 'text-red-500'
        ]"
      >
        {{ trend }}
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-lg font-medium text-gray-500">{{ title }}</h3>
      <p class="mt-1 text-3xl font-semibold text-gray-900">{{ formattedValue }}</p>
      <p v-if="subtitle" class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
    </div>
  </div>
</template>