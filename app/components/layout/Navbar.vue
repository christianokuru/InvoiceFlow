<template>
  <header class="bg-white border-b border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center flex-1">
          <div class="max-w-xs w-full">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search class="h-4 w-4 text-gray-400" />
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
            <Bell class="h-6 w-6" />
          </button>
          <div class="border-l border-gray-200 h-6 mx-2"></div>

          <!-- Profile dropdown -->
          <div class="relative">
            <button
              ref="userMenuButton"
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none hover:bg-gray-100 rounded-md px-3 py-2 transition-colors"
            >
              <span class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <User class="h-5 w-5" />
              </span>
              <span class="hidden md:block">{{ userName }}</span>
              <ChevronDown
                class="h-4 w-4 text-gray-400 transition-transform"
                :class="{ 'rotate-180': userMenuOpen }"
              />
            </button>

            <!-- Dropdown panel -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="userMenuOpen"
                ref="userMenuPanel"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
              >
                <div class="py-1">
                  <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div class="font-medium">{{ userName }}</div>
                    <div class="text-gray-500 truncate">{{ userEmail }}</div>
                  </div>
                </div>

                <div class="py-1">
                  <router-link
                    to="/dashboard/settings"
                    @click="closeUserMenu"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings class="h-4 w-4 mr-3 text-gray-400" />
                    Settings
                  </router-link>
                  <router-link
                    to="/dashboard"
                    @click="closeUserMenu"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Home class="h-4 w-4 mr-3 text-gray-400" />
                    Dashboard
                  </router-link>
                </div>

                <div class="py-1">
                  <button
                    @click="handleLogout"
                    class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut class="h-4 w-4 mr-3" />
                    Log out
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from '#app'
import { useAuth } from '~/composables/useAuth'
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Settings,
  Home,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const { user, logout } = useAuth()

const props = defineProps({
  userName: {
    type: String,
    default: 'John Doe'
  },
  userEmail: {
    type: String,
    default: 'user@example.com'
  }
})

const emit = defineEmits(['notification-click', 'user-menu-click'])

const userMenuOpen = ref(false)
const userMenuButton = ref(null)
const userMenuPanel = ref(null)

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (
    userMenuOpen.value &&
    userMenuButton.value &&
    userMenuPanel.value &&
    !userMenuButton.value.contains(event.target) &&
    !userMenuPanel.value.contains(event.target)
  ) {
    userMenuOpen.value = false
  }
}

const handleNotificationClick = () => {
  emit('notification-click')
}

const handleUserMenuClick = () => {
  emit('user-menu-click')
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    await logout()
    closeUserMenu()
  } catch (error) {
    console.error('Logout error:', error)
    // Force redirect even if logout fails
    router.push('/auth/login')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
