<script setup>
import {
  FileTextIcon,
  ReceiptIcon,
  MailIcon,
  DollarSignIcon,
  HelpCircleIcon
} from 'lucide-vue-next'

defineProps({
  item: {
    type: Object,
    required: true
  },
  isLast: {
    type: Boolean,
    default: false
  }
})

const getIcon = (type) => {
  switch (type) {
    case 'invoice':
      return FileTextIcon
    case 'receipt':
      return ReceiptIcon
    case 'email':
      return MailIcon
    case 'payment':
      return DollarSignIcon
    default:
      return HelpCircleIcon
  }
}

const getIconColor = (type) => {
  switch (type) {
    case 'invoice':
      return 'text-indigo-500'
    case 'receipt':
      return 'text-green-500'
    case 'email':
      return 'text-blue-500'
    case 'payment':
      return 'text-green-600'
    default:
      return 'text-gray-500'
  }
}
</script>

<template>
  <div class="relative pb-8">
    <!-- Connector line -->
    <span
      v-if="!isLast"
      class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
      aria-hidden="true"
    />

    <!-- Timeline item -->
    <div class="relative flex items-start space-x-3">
      <!-- Icon circle -->
      <div class="relative">
        <div class="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
          <component
            :is="getIcon(item.type)"
            :class="[getIconColor(item.type), 'h-5 w-5']"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">
              {{ item.title }}
            </p>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ item.description }}
            </p>
          </div>
          <div v-if="item.amount" class="text-right">
            <p class="text-sm font-semibold text-gray-900">
              ${{ item.amount.toLocaleString() }}
            </p>
          </div>
        </div>
        <div class="mt-2 text-xs text-gray-500">
          {{ item.date }} at {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>