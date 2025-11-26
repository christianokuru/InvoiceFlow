<script setup>
import { SearchIcon } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3">
      <SearchIcon class="h-4 w-4 text-gray-400" />
    </div>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>