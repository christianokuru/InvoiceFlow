<template>
  <div
    class="bg-blue-600 text-white flex flex-col transition-all duration-300 ease-in-out"
    :class="sidebarClasses"
  >
    <!-- Logo/Brand -->
    <div class="flex items-center justify-between h-16 px-4 border-b border-blue-700">
      <div v-if="expanded" class="flex items-center">
        <svg class="w-8 h-8 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <span class="text-xl font-bold">InvoiceApp</span>
      </div>

      <!-- Collapse Toggle -->
      <button
        @click="$emit('toggle')"
        class="p-1 rounded-md hover:bg-blue-700 transition-colors"
        :class="{ 'mx-auto': !expanded }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 py-4 space-y-2">
      <template v-for="item in navItems" :key="item.id">
        <!-- Regular navigation item -->
        <button
          v-if="!item.children"
          :class="getNavItemClasses(item)"
          @click="$emit('update:activeView', item.view)"
        >
          <component :is="item.icon" :size="20" />
          <span v-if="expanded" class="ml-3">{{ item.label }}</span>
        </button>

        <!-- Navigation item with children (dropdown) -->
        <div v-else>
          <button
            :class="getNavItemClasses(item)"
            @click="toggleDropdown(item.id)"
          >
            <component :is="item.icon" :size="20" />
            <span v-if="expanded" class="ml-3 flex-1 text-left">{{ item.label }}</span>
            <svg
              v-if="expanded"
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-90': openDropdowns.includes(item.id) }"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Submenu -->
          <div
            v-if="expanded"
            class="mt-1 space-y-1"
            :class="{ 'block': openDropdowns.includes(item.id), 'hidden': !openDropdowns.includes(item.id) }"
          >
            <button
              v-for="child in item.children"
              :key="child.id"
              :class="getSubItemClasses(child)"
              @click="$emit('update:activeView', child.view)"
            >
              <component :is="child.icon" :size="16" />
              <span class="ml-3">{{ child.label }}</span>
            </button>
          </div>
        </div>
      </template>
    </nav>

    <!-- User Section -->
    <div class="border-t border-blue-700 p-4">
      <div v-if="expanded" class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span class="text-sm font-medium">{{ userInitials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ userName }}</p>
          <p class="text-xs text-blue-200 truncate">{{ userEmail }}</p>
        </div>
      </div>

      <div v-else class="flex justify-center">
        <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span class="text-sm font-medium">{{ userInitials }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface NavItem {
  id: string
  label: string
  icon: any
  view: string
  children?: NavItem[]
  badge?: string | number
}

interface Props {
  expanded: boolean
  activeView: string
  navItems: NavItem[]
  userName?: string
  userEmail?: string
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'John Doe',
  userEmail: 'john@example.com'
})

defineEmits<{
  toggle: []
  'update:activeView': [view: string]
}>()

const openDropdowns = ref<string[]>([])

const sidebarClasses = computed(() => [
  'h-screen',
  {
    'w-64': props.expanded,
    'w-20': !props.expanded
  }
])

const userInitials = computed(() => {
  return props.userName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const getNavItemClasses = (item: NavItem) => [
  'w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
  {
    'bg-blue-700 text-white': props.activeView === item.view,
    'text-blue-100 hover:bg-blue-700 hover:text-white': props.activeView !== item.view
  }
]

const getSubItemClasses = (item: NavItem) => [
  'w-full flex items-center px-8 py-2 rounded-lg text-sm transition-colors duration-200',
  {
    'bg-blue-800 text-white': props.activeView === item.view,
    'text-blue-200 hover:bg-blue-800 hover:text-white': props.activeView !== item.view
  }
]

const toggleDropdown = (itemId: string) => {
  const index = openDropdowns.value.indexOf(itemId)
  if (index === -1) {
    openDropdowns.value.push(itemId)
  } else {
    openDropdowns.value.splice(index, 1)
  }
}
</script>