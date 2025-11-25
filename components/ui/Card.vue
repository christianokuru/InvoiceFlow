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

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'elevated'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'md',
  variant: 'default',
  rounded: 'md'
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
    'rounded-full': props.rounded === 'full',
  }
])

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}

const headerPaddingClass = computed(() => paddingClasses[props.padding])
const contentPaddingClass = computed(() => paddingClasses[props.padding])
const footerPaddingClass = computed(() => paddingClasses[props.padding])
</script>