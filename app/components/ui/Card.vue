<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outlined', 'elevated'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg'].includes(value)
  },
  rounded: {
    type: String,
    default: 'lg',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  }
})

const cardClasses = computed(() => [
  'bg-white transition-all duration-200',
  {
    // Variants
    'border border-gray-200': props.variant === 'default' || props.variant === 'outlined',
    'shadow-lg': props.variant === 'elevated',
    'shadow-sm': props.variant === 'default',

    // Hover effects
    'hover:shadow-md hover:-translate-y-0.5': props.hoverable,

    // Border radius
    'rounded-none': props.rounded === 'none',
    'rounded': props.rounded === 'sm',
    'rounded-lg': props.rounded === 'md',
    'rounded-xl': props.rounded === 'lg',
    'rounded-2xl': props.rounded === 'xl',
    'rounded-full': props.rounded === 'full',
  }
])

const paddingClasses = {
  none: '',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4'
}

const headerPaddingClass = computed(() => paddingClasses[props.padding])
const contentPaddingClass = computed(() => paddingClasses[props.padding])
const footerPaddingClass = computed(() => paddingClasses[props.padding])
</script>

<template>
  <div :class="cardClasses" :hoverable="hoverable">
    <div v-if="$slots.header" class="border-b border-gray-200" :class="headerPaddingClass">
      <slot name="header" />
    </div>
    <div :class="contentPaddingClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-200" :class="footerPaddingClass">
      <slot name="footer" />
    </div>
  </div>
</template>