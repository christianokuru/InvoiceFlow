<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { MenuIcon, XIcon, HomeIcon, UserIcon, CogIcon, LogOutIcon, TrendingUpIcon, StarIcon, CreditCardIcon, FileTextIcon, PhoneIcon, InfoIcon } from 'lucide-vue-next'
import Button from '~/components/ui/Button.vue'
import Dropdown from '~/components/ui/Dropdown.vue'
import { useMicroInteractions } from '~/composables/useMicroInteractions'
import { useAccessibility } from '~/composables/useAccessibility'
import { useMobileUX } from '~/composables/useMobileUX'

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

// Get current route for active state
const route = useRoute()

// Initialize accessibility and mobile UX
const accessibility = useAccessibility()
const mobileUX = useMobileUX()

const showMobileMenu = ref(false)

// Handle body scroll when menu is open (enhanced with accessibility)
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    document.body.style.overflow = 'hidden'

    // Trigger haptic feedback on mobile
    if (mobileUX.isMobile.value) {
      mobileUX.triggerHapticFeedback('light')
    }

    // Announce to screen readers
    accessibility.announceToScreenReader('Mobile menu opened', 'polite')

    // Create focus trap for mobile menu
    setTimeout(() => {
      const mobileMenu = document.querySelector('.mobile-menu-sheet')
      if (mobileMenu) {
        accessibility.createFocusTrap(mobileMenu, 'mobile-menu')
      }
    }, 100)
  } else {
    document.body.style.overflow = ''

    // Announce to screen readers
    accessibility.announceToScreenReader('Mobile menu closed', 'polite')

    // Remove focus trap
    accessibility.removeFocusTrap('mobile-menu')
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  document.body.style.overflow = ''

  // Announce to screen readers
  accessibility.announceToScreenReader('Mobile menu closed', 'polite')

  // Remove focus trap
  accessibility.removeFocusTrap('mobile-menu')
}

// Initialize micro-interactions
const microInteractions = useMicroInteractions()

onMounted(() => {
  // Initialize micro-interactions for navigation elements
  setTimeout(() => {
    microInteractions.initializeInteractions()
  }, 100)
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

const userInitials = computed(() => {
  return props.userName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const navigationWithIcons = computed(() => {
  const iconMap = {
    'Features': StarIcon,
    'Pricing': CreditCardIcon,
    'About': InfoIcon,
    'Contact': PhoneIcon
  }

  return props.navigation.map(item => ({
    ...item,
    icon: iconMap[item.name] || HomeIcon
  }))
})

const userMenuItems = computed(() => [
  {
    label: 'Your Profile',
    value: 'profile',
    icon: UserIcon
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: CogIcon
  },
  {
    label: 'Sign out',
    value: 'signout',
    icon: LogOutIcon
  }
])

const isActive = (href) => {
  const currentPath = route.path
  // Exact match for homepage
  if (href === '/' && currentPath === '/') return true
  // Exact match for other pages
  if (href === currentPath) return true
  // Parent path match (for nested routes)
  if (href !== '/' && currentPath.startsWith(href)) return true
  return false
}

const handleUserMenuAction = (item) => {
  console.log('User menu action:', item.value)
  closeMobileMenu()
  // Handle user menu actions here
}

const handleSignIn = () => {
  closeMobileMenu()

  // Trigger haptic feedback on mobile
  if (mobileUX.isMobile.value) {
    mobileUX.triggerHapticFeedback('light')
  }

  // Announce to screen readers
  accessibility.announceToScreenReader('Navigating to sign in page', 'polite')

  navigateTo('/auth/login')
}

const handleSignUp = () => {
  closeMobileMenu()

  // Trigger haptic feedback on mobile
  if (mobileUX.isMobile.value) {
    mobileUX.triggerHapticFeedback('medium')
  }

  // Announce to screen readers
  accessibility.announceToScreenReader('Navigating to registration page', 'polite')

  navigateTo('/auth/register')
}

const handleDashboard = () => {
  closeMobileMenu()

  // Trigger haptic feedback on mobile
  if (mobileUX.isMobile.value) {
    mobileUX.triggerHapticFeedback('medium')
  }

  // Announce to screen readers
  accessibility.announceToScreenReader('Navigating to dashboard', 'polite')

  navigateTo('/dashboard')
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
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
          <nav class="hidden md:ml-10 md:flex space-x-1">
            <template v-for="item in navigation" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="relative text-gray-500 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group"
                :class="[
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50 shadow-sm'
                    : 'hover:bg-gray-50'
                ]"
              >
                <span class="relative z-10">{{ item.name }}</span>
                <!-- Active state indicator -->
                <div
                  v-if="isActive(item.href)"
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-bounce-subtle"
                ></div>
                <!-- Hover effect -->
                <div class="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </NuxtLink>
            </template>
          </nav>
        </div>

        <!-- Right side - Actions and User -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Sign In / Sign Up buttons -->
          <div v-if="!isAuthenticated" class="hidden sm:flex items-center space-x-3">
            <Button variant="ghost" size="sm" @click="handleSignIn" class="px-3 py-1.5 text-sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm" @click="handleSignUp" class="px-4 py-1.5 text-sm">
              Get Started
            </Button>
          </div>

          <!-- User menu (when authenticated) -->
          <div v-else class="hidden sm:flex items-center space-x-4">
            <!-- Notifications -->
            <button class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Dashboard button -->
            <Button variant="primary" size="sm" @click="handleDashboard" class="px-3 py-1.5 text-sm">
              Dashboard
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
          <div class="sm:hidden">
            <button
              @click="toggleMobileMenu"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200 clickable"
              :aria-expanded="showMobileMenu"
              aria-controls="mobile-menu-sheet"
              aria-label="Toggle mobile navigation menu"
            >
              <MenuIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    </header>

  <!-- Mobile Navigation Sheet -->
  <!-- Backdrop -->
  <div
    v-if="showMobileMenu"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="closeMobileMenu"
    @touchmove.prevent
    style="backdrop-filter: blur(4px);"
  ></div>

  <!-- Sliding Sheet -->
  <div
    id="mobile-menu-sheet"
    class="mobile-menu-sheet fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 md:hidden transform transition-all duration-300 ease-in-out"
    :class="showMobileMenu ? 'translate-x-0' : 'translate-x-full'"
    role="dialog"
    aria-modal="true"
    aria-labelledby="mobile-menu-title"
    aria-hidden="!showMobileMenu"
  >
    <!-- Sheet Header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative">
      <button
        @click="closeMobileMenu"
        class="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 clickable"
        aria-label="Close mobile menu"
      >
        <XIcon class="h-6 w-6 text-white" />
      </button>

      <div class="mt-4">
        <h2 id="mobile-menu-title" class="text-xl font-bold">InvoiceFlow</h2>
        <p class="text-blue-100 text-sm">Your Business Companion</p>
      </div>

      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
        </div>
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="p-6 border-b border-gray-100">
      <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Navigation</h4>
      <nav class="space-y-2">
        <NuxtLink
          v-for="item in navigationWithIcons"
          :key="item.name"
          :to="item.href"
          class="relative flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group overflow-hidden"
          :class="[
            isActive(item.href)
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-blue-100'
              : 'hover:shadow-sm'
          ]"
          @click="closeMobileMenu"
        >
          <!-- Animated background effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

          <component
            :is="item.icon"
            class="relative z-10 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            :class="isActive(item.href) ? 'text-blue-600' : ''"
          />
          <span class="relative z-10 font-medium">{{ item.name }}</span>

          <!-- Active state indicator with animation -->
          <div v-if="isActive(item.href)" class="ml-auto relative z-10">
            <div class="flex items-center space-x-1">
              <div class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <div class="w-1 h-1 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
            </div>
          </div>
        </NuxtLink>
      </nav>
    </div>

    <!-- User Section -->
    <div class="flex-1 p-6">
      <div v-if="isAuthenticated">
        <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account</h4>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">{{ userInitials }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ userName }}</p>
              <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <button
            v-for="menuItem in userMenuItems"
            :key="menuItem.value"
            @click="handleUserMenuAction(menuItem)"
            class="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
          >
            <component :is="menuItem.icon" class="h-5 w-5 text-gray-400 group-hover:scale-110 transition-transform duration-200" />
            <span class="font-medium">{{ menuItem.label }}</span>
          </button>

          <button
            @click="handleDashboard"
            class="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 group mt-4"
          >
            <TrendingUpIcon class="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span class="font-medium">Go to Dashboard</span>
          </button>
        </div>
      </div>

      <div v-else>
        <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Get Started</h4>
        <div class="space-y-3">
          <Button
            variant="ghost"
            size="lg"
            class="w-full justify-start px-4 py-3 hover:bg-gray-50 transition-all duration-200"
            @click="handleSignIn"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="lg"
            class="w-full justify-start px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            @click="handleSignUp"
          >
            Get Started
          </Button>
        </div>

        <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div class="flex items-center space-x-3 mb-2">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <h5 class="font-semibold text-gray-900">14-Day Free Trial</h5>
          </div>
          <p class="text-sm text-gray-600">No credit card required. Start managing your invoices today!</p>
        </div>
      </div>
    </div>
  </div>
</template>