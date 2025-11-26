<script setup>
import { computed } from 'vue'
import {
  ReceiptIcon,
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  MailIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon
} from 'lucide-vue-next'

const props = defineProps({
  receipt: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['view', 'edit', 'download'])

const categoryColors = {
  Service: 'border-blue-200 bg-blue-50',
  Product: 'border-purple-200 bg-purple-50',
  Consulting: 'border-indigo-200 bg-indigo-50',
  Other: 'border-gray-200 bg-gray-50'
}

const cardClasses = computed(() => {
  const baseClasses = 'border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer'
  const categoryClass = categoryColors[props.receipt.category] || categoryColors.Other
  const sizeClass = props.compact ? 'p-3' : 'p-4'

  return `${baseClasses} ${categoryClass} ${sizeClass}`
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleView = () => {
  emit('view', props.receipt)
}

const handleEdit = (event) => {
  event.stopPropagation()
  emit('edit', props.receipt)
}

const handleDownload = (event) => {
  event.stopPropagation()
  emit('download', props.receipt)
}

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
</script>

<template>
  <div :class="cardClasses" @click="handleView">
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center">
        <ReceiptIcon :class="compact ? 'h-4 w-4' : 'h-5 w-5'" class="text-green-600 mr-2" />
        <div>
          <p class="font-medium text-gray-900">{{ receipt.number }}</p>
          <p :class="compact ? 'text-xs' : 'text-sm'" class="text-gray-500">
            {{ formatDate(receipt.date) }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span :class="[
          'px-2 py-1 text-xs font-medium rounded-full',
          compact ? 'text-xs' : 'text-sm'
        ]" class="bg-green-100 text-green-800">
          {{ receipt.category }}
        </span>
        <button
          v-if="showActions"
          class="p-1 hover:bg-gray-100 rounded transition-colors"
          @click="handleEdit"
        >
          <EditIcon :class="compact ? 'h-3 w-3' : 'h-4 w-4'" class="text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Client Information -->
    <div class="mb-3">
      <div class="flex items-center mb-1">
        <UserIcon :class="compact ? 'h-3 w-3' : 'h-4 w-4'" class="text-gray-400 mr-1" />
        <p :class="compact ? 'text-sm' : 'text-base'" class="font-medium text-gray-900">
          {{ receipt.client }}
        </p>
      </div>
      <div class="flex items-center">
        <MailIcon :class="compact ? 'h-3 w-3' : 'h-4 w-4'" class="text-gray-400 mr-1" />
        <p :class="compact ? 'text-xs' : 'text-sm'" class="text-gray-500">
          {{ receipt.email }}
        </p>
      </div>
    </div>

    <!-- Amount -->
    <div class="mb-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <DollarSignIcon :class="compact ? 'h-4 w-4' : 'h-5 w-5'" class="text-gray-400 mr-1" />
          <p :class="compact ? 'text-lg' : 'text-2xl'" class="font-bold text-gray-900">
            {{ formatCurrency(receipt.amount) }}
          </p>
        </div>
        <div class="flex items-center text-gray-500" :class="compact ? 'text-xs' : 'text-sm'">
          <CalendarIcon :class="compact ? 'h-3 w-3' : 'h-4 w-4'" class="mr-1" />
          {{ formatDate(receipt.date) }}
        </div>
      </div>
    </div>

    <!-- Description -->
    <div v-if="receipt.description && !compact" class="mb-4">
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ truncateText(receipt.description, 100) }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div v-if="showActions" class="flex gap-2" @click.stop>
      <button
        class="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        @click="handleView"
      >
        <EyeIcon :size="16" class="mr-1" />
        View
      </button>
      <button
        class="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        @click="handleDownload"
      >
        <DownloadIcon :size="16" class="mr-1" />
        Download
      </button>
    </div>
  </div>
</template>