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
      <Navbar :user-name="userName" />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/layout/Sidebar.vue'
import Navbar from '~/components/layout/Navbar.vue'

const sidebarExpanded = ref(true)
const activeView = ref('dashboard')
const userName = ref('John Doe')

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

const setActiveView = (view: string) => {
  activeView.value = view
}
</script>