<script setup>
import { computed, ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import Dropdown from '~/components/ui/Dropdown.vue'

const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
    default: ''
  },
  userEmail: {
    type: String,
    default: ''
  },
  navigation: {
    type: Array,
    default: () => [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  },
  currentPath: {
    type: String,
    default: '/'
  }
})

const emit = defineEmits(['signin', 'signup', 'dashboard', 'toggle-mobile-menu'])

const showMobileMenu = ref(false)

const userInitials = computed(() => {
  return props.userName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const userMenuItems = computed(() => [
  {
    label: 'Your Profile',
    value: 'profile'
  },
  {
    label: 'Settings',
    value: 'settings'
  },
  {
    label: 'Sign out',
    value: 'signout'
  }
])

const isActive = (href) => {
  if (props.currentPath === href) return true
  if (href === '/' && props.currentPath === '/') return true
  if (href !== '/' && props.currentPath.startsWith(href)) return true
  return false
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleUserMenuAction = (item) => {
  console.log('User menu action:', item.value)
  // Handle user menu actions here
}

const handleSignIn = () => {
  navigateTo('/auth/login')
}

const handleSignUp = () => {
  navigateTo('/auth/register')
}

const handleDashboard = () => {
  navigateTo('/dashboard')
}
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left side - Logo and Navigation -->
        <div class="flex items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <svg class="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-xl font-bold text-gray-900">InvoiceFlow</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:ml-10 md:flex space-x-8">
            <template v-for="item in navigation" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="{ 'text-blue-600 bg-blue-50': isActive(item.href) }"
              >
                {{ item.name }}
              </NuxtLink>
            </template>
          </nav>
        </div>

        <!-- Right side - Actions and User -->
        <div class="flex items-center space-x-4">
          <!-- Sign In / Sign Up buttons -->
          <div v-if="!isAuthenticated" class="flex items-center space-x-3">
            <Button variant="ghost" size="sm" @click="handleSignIn">
              Sign In
            </Button>
            <Button variant="primary" size="sm" @click="handleSignUp">
              Get Started
            </Button>
          </div>

          <!-- User menu (when authenticated) -->
          <div v-else class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Dashboard button -->
            <Button variant="primary" size="sm" @click="handleDashboard">
              Go to Dashboard
            </Button>

            <!-- User dropdown -->
            <Dropdown
              :items="userMenuItems"
              trigger-text=""
              placement="bottom-right"
              @select="handleUserMenuAction"
            >
              <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span class="text-sm font-medium text-white">{{ userInitials }}</span>
              </div>
            </Dropdown>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="$emit('toggle-mobile-menu')"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <template v-for="item in navigation" :key="item.name">
          <NuxtLink
            :to="item.href"
            class="text-gray-500 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
            :class="{ 'text-blue-600 bg-blue-50': isActive(item.href) }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </div>

      <!-- Mobile user section -->
      <div v-if="isAuthenticated" class="pt-4 pb-3 border-t border-gray-200">
        <div class="px-2 space-y-1">
          <button
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
            @click="closeMobileMenu"
          >
            Your Profile
          </button>
          <button
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
            @click="closeMobileMenu"
          >
            Settings
          </button>
          <button
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
            @click="closeMobileMenu"
          >
            Sign out
          </button>
        </div>
      </div>

      <div v-else class="pt-4 pb-3 border-t border-gray-200">
        <div class="px-4 space-y-3">
          <Button variant="ghost" size="sm" class="w-full" @click="handleSignIn">
            Sign In
          </Button>
          <Button variant="primary" size="sm" class="w-full" @click="handleSignUp">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>