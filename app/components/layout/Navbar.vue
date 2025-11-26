<template>
  <header class="bg-white border-b border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center flex-1">
          <div class="max-w-xs w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon class="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button
            class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @click="handleNotificationClick"
          >
            <BellIcon class="h-6 w-6" />
          </button>
          <div class="border-l border-gray-200 h-6 mx-2"></div>
          <div class="flex items-center">
            <button
              class="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
              @click="handleUserMenuClick"
            >
              <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <UserIcon class="h-5 w-5" />
              </span>
              <span class="hidden md:block">{{ userName }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { SearchIcon, BellIcon, UserIcon } from 'lucide-vue-next'

const props = defineProps({
  userName: {
    type: String,
    default: 'John Doe'
  }
})

const emit = defineEmits(['notification-click', 'user-menu-click'])

const handleNotificationClick = () => {
  emit('notification-click')
}

const handleUserMenuClick = () => {
  emit('user-menu-click')
}
</script>
