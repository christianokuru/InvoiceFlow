<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar
      :expanded="sidebarExpanded"
      :active-view="activeView"
      @toggle="toggleSidebar"
      @update:activeView="setActiveView"
    />

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar -->
      <Navbar :user-name="userName" :user-email="userEmail" @notification-click="handleNotificationClick" @user-menu-click="handleUserMenuClick" />

      <!-- Page Content with transitions -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <transition name="page" mode="out-in">
          <slot :key="activeView" />
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'
import { useAuth } from '~/composables/useAuth'
import Sidebar from '~/components/layout/Sidebar.vue'
import Navbar from '~/components/layout/Navbar.vue'

const route = useRoute()
const router = useRouter()

const sidebarExpanded = ref(true)
const activeView = ref('dashboard')

// Get user data from auth
const { user } = useAuth()

const userName = computed(() => {
  return user.value?.firstName && user.value?.lastName
    ? `${user.value.firstName} ${user.value.lastName}`
    : user.value?.email?.split('@')[0] || 'John Doe'
})

const userEmail = computed(() => {
  return user.value?.email || 'user@example.com'
})

// Sync activeView with current route
const updateActiveViewFromRoute = () => {
  const path = route.path
  if (path.includes('/dashboard/invoices')) {
    activeView.value = 'invoices'
  } else if (path.includes('/dashboard/receipts')) {
    activeView.value = 'receipts'
  } else if (path.includes('/dashboard/history')) {
    activeView.value = 'history'
  } else if (path.includes('/dashboard/send')) {
    activeView.value = 'send'
  } else if (path.includes('/dashboard/copy')) {
    activeView.value = 'copy'
  } else if (path.includes('/dashboard/clients')) {
    activeView.value = 'clients'
  } else if (path.includes('/dashboard/settings')) {
    activeView.value = 'settings'
  } else {
    activeView.value = 'dashboard'
  }
}

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

const setActiveView = (view) => {
  activeView.value = view

  // Navigate to the corresponding route
  switch (view) {
    case 'dashboard':
      router.push('/dashboard')
      break
    case 'invoices':
      router.push('/dashboard/invoices')
      break
    case 'receipts':
      router.push('/dashboard/receipts')
      break
    case 'history':
      router.push('/dashboard/history')
      break
    case 'send':
      router.push('/dashboard/send')
      break
    case 'copy':
      router.push('/dashboard/copy')
      break
    case 'clients':
      router.push('/dashboard/clients')
      break
  }
}

const handleNotificationClick = () => {
  // Handle notification click
  console.log('Notification clicked')
}

const handleUserMenuClick = () => {
  // Handle user menu click
  console.log('User menu clicked')
}

// Watch route changes to update activeView
watch(() => route.path, updateActiveViewFromRoute, { immediate: true })

// Initialize activeView from current route
updateActiveViewFromRoute()
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>