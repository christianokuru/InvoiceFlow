<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value)
  }
})

const getStatusClasses = (status) => {
  const statusMap = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    processing: 'bg-indigo-100 text-indigo-800'
  }

  return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

const getSizeClasses = (size) => {
  return size === 'sm' ? 'text-xs px-2 py-1' : 'text-xs px-2.5 py-1.5'
}

const badgeClasses = [
  'inline-flex items-center rounded-full font-medium',
  getSizeClasses(props.size),
  getStatusClasses(props.status)
].join(' ')
</script>

<template>
  <span :class="badgeClasses">
    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
  </span>
</template>