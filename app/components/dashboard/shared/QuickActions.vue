<script setup>
import {
  FileTextIcon,
  ReceiptIcon,
  MailIcon,
  HistoryIcon
} from 'lucide-vue-next'

const props = defineProps({
  actions: {
    type: Array,
    default: () => [
      {
        title: 'Create Invoice',
        icon: 'fileText',
        bgColor: 'bg-indigo-500',
        hoverColor: 'hover:bg-indigo-600'
      },
      {
        title: 'Generate Receipt',
        icon: 'receipt',
        bgColor: 'bg-green-500',
        hoverColor: 'hover:bg-green-600'
      },
      {
        title: 'Send Document',
        icon: 'mail',
        bgColor: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600'
      },
      {
        title: 'View History',
        icon: 'history',
        bgColor: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-600'
      }
    ]
  }
})

const emit = defineEmits(['action'])

const getIcon = (iconName) => {
  const icons = {
    fileText: FileTextIcon,
    receipt: ReceiptIcon,
    mail: MailIcon,
    history: HistoryIcon
  }
  return icons[iconName] || FileTextIcon
}

const handleAction = (action) => {
  emit('action', action)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
    </div>
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        v-for="(action, index) in actions"
        :key="index"
        :class="[
          action.bgColor,
          action.hoverColor,
          'text-white p-4 rounded-lg flex items-center justify-between transition-colors duration-200'
        ]"
        @click="handleAction(action)"
      >
        <span class="font-medium">{{ action.title }}</span>
        <component
          :is="getIcon(action.icon)"
          class="h-5 w-5"
        />
      </button>
    </div>
  </div>
</template>