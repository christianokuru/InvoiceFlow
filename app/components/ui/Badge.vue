<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'error', 'info', 'primary'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  dot: {
    type: Boolean,
    default: false
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 12
    case 'md': return 14
    case 'lg': return 16
    default: return 14
  }
})

const badgeClasses = computed(() => [
  'inline-flex items-center font-medium',
  {
    // Variants
    'bg-gray-100 text-gray-800': props.variant === 'default',
    'bg-green-100 text-green-800': props.variant === 'success',
    'bg-yellow-100 text-yellow-800': props.variant === 'warning',
    'bg-red-100 text-red-800': props.variant === 'error',
    'bg-blue-100 text-blue-800': props.variant === 'info',
    'bg-blue-600 text-white': props.variant === 'primary',

    // Sizes
    'px-1.5 py-0.5 text-xs rounded': props.size === 'sm',
    'px-2 py-1 text-sm rounded-full': props.size === 'md',
    'px-3 py-1.5 text-sm rounded-full': props.size === 'lg',

    // Dot indicator
    'relative': props.dot
  }
])
</script>

<template>
  <span :class="badgeClasses">
    <component v-if="icon" :is="icon" :size="iconSize" class="mr-1" />
    <slot>{{ text }}</slot>
    <span v-if="dot" class="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-current opacity-75"></span>
  </span>
</template>