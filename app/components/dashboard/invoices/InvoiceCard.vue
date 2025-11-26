<script setup>
import { computed } from 'vue'
import StatusBadge from '../shared/StatusBadge.vue'
import ActionButtons from '../shared/ActionButtons.vue'
import {
  FileTextIcon,
  CalendarIcon,
  DollarSignIcon
} from 'lucide-vue-next'

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'send', 'download', 'view'])

const statusColor = computed(() => {
  const statusMap = {
    paid: 'border-green-200 bg-green-50',
    pending: 'border-yellow-200 bg-yellow-50',
    overdue: 'border-red-200 bg-red-50',
    draft: 'border-gray-200 bg-gray-50'
  }
  return statusMap[props.invoice.status] || 'border-gray-200 bg-white'
})

const getActions = () => [
  {
    name: 'edit',
    icon: 'edit',
    variant: 'primary',
    label: 'Edit Invoice'
  },
  {
    name: 'send',
    icon: 'send',
    variant: 'success',
    label: 'Send Email'
  },
  {
    name: 'download',
    icon: 'download',
    variant: 'primary',
    label: 'Download PDF'
  }
]

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

const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date() && props.invoice.status === 'pending'
}

const handleAction = (action) => {
  emit(action.name, props.invoice)
}

const handleView = () => {
  emit('view', props.invoice)
}
</script>

<template>
  <div
    :class="[
      'border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer',
      statusColor,
      compact ? 'p-3' : 'p-4'
    ]"
    @click="handleView"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center">
        <FileTextIcon :class="compact ? 'h-4 w-4' : 'h-5 w-5'" class="text-gray-400 mr-2" />
        <div>
          <p class="font-medium text-gray-900">{{ invoice.number }}</p>
          <p :class="compact ? 'text-xs' : 'text-sm'" class="text-gray-500">
            {{ formatDate(invoice.date) }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <StatusBadge :status="invoice.status" size="sm" />
        <button
          class="p-1 hover:bg-gray-100 rounded transition-colors"
          @click.stop="$emit('edit', invoice)"
        >
          <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Client Info -->
    <div class="mb-3">
      <p :class="compact ? 'text-sm' : 'text-base'" class="font-medium text-gray-900">
        {{ invoice.client }}
      </p>
      <p :class="compact ? 'text-xs' : 'text-sm'" class="text-gray-500">
        {{ invoice.email }}
      </p>
    </div>

    <!-- Amount and Due Date -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p :class="compact ? 'text-lg' : 'text-xl'" class="font-bold text-gray-900">
          {{ formatCurrency(invoice.amount) }}
        </p>
      </div>
      <div class="text-right">
        <div class="flex items-center text-gray-500" :class="compact ? 'text-xs' : 'text-sm'">
          <CalendarIcon :class="compact ? 'h-3 w-3' : 'h-4 w-4'" class="mr-1" />
          Due: {{ formatDate(invoice.dueDate) }}
        </div>
        <p
          v-if="isOverdue(invoice.dueDate)"
          class="text-xs text-red-600 font-medium mt-1"
        >
          Overdue
        </p>
      </div>
    </div>

    <!-- Description (if not compact) -->
    <div v-if="!compact && invoice.description" class="mb-3">
      <p class="text-sm text-gray-600 line-clamp-2">{{ invoice.description }}</p>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2" @click.stop>
      <ActionButtons
        :actions="getActions()"
        size="sm"
        @action="handleAction"
      />
    </div>
  </div>
</template>