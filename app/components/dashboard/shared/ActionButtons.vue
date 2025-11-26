<script setup>
import {
  EditIcon,
  SendIcon,
  DownloadIcon,
  MoreVerticalIcon,
  EyeIcon,
  TrashIcon,
  CopyIcon
} from 'lucide-vue-next'

const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value)
  }
})

const emit = defineEmits(['action'])

const getIcon = (iconName) => {
  const icons = {
    edit: EditIcon,
    send: SendIcon,
    download: DownloadIcon,
    eye: EyeIcon,
    delete: TrashIcon,
    copy: CopyIcon,
    more: MoreVerticalIcon
  }
  return icons[iconName] || MoreVerticalIcon
}

const getButtonClasses = (variant, size) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const sizeClasses = size === 'sm'
    ? 'p-1.5 text-sm'
    : 'p-2 text-sm'

  const variantClasses = {
    primary: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:ring-blue-500',
    success: 'text-green-600 hover:text-green-800 hover:bg-green-50 focus:ring-green-500',
    danger: 'text-red-600 hover:text-red-800 hover:bg-red-50 focus:ring-red-500',
    secondary: 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-gray-500'
  }

  return [
    baseClasses,
    sizeClasses,
    variantClasses[variant] || variantClasses.secondary
  ].join(' ')
}

const handleAction = (action) => {
  emit('action', action)
}
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="action in actions"
      :key="action.name"
      :class="getButtonClasses(action.variant, size)"
      :title="action.label || action.name"
      @click="handleAction(action)"
    >
      <component
        :is="getIcon(action.icon)"
        :class="size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'"
      />
    </button>
  </div>
</template>