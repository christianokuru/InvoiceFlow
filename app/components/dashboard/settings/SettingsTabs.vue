<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="$emit('tabChange', tab.key)"
        :class="[
          tab.key === activeTab
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200'
        ]"
      >
        <div class="flex items-center space-x-2">
          <component :is="tab.icon" class="h-5 w-5" />
          <span>{{ tab.label }}</span>
        </div>
      </button>
    </nav>
  </div>
</template>

<script setup>
import {
  UserIcon,
  BuildingOfficeIcon,
  BellIcon,
  PaintBrushIcon
} from '@heroicons/vue/24/outline'

defineProps({
  activeTab: {
    type: String,
    default: 'account'
  }
})

defineEmits(['tabChange'])

const tabs = [
  {
    key: 'account',
    label: 'Account',
    icon: UserIcon,
    description: 'Profile information and security'
  },
  {
    key: 'business',
    label: 'Business',
    icon: BuildingOfficeIcon,
    description: 'Business details and branding'
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: BellIcon,
    description: 'Email and SMS preferences'
  },
  {
    key: 'appearance',
    label: 'Appearance',
    icon: PaintBrushIcon,
    description: 'Theme and display settings'
  }
]
</script>