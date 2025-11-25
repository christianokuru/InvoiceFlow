<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- App Header -->
    <AppHeader
      :is-authenticated="false"
      :navigation="[
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]"
      :current-path="$route.path"
      @signin="$emit('signin')"
      @signup="$emit('signup')"
      @dashboard="$emit('dashboard')"
    />

    <!-- Main Content - Centered -->
    <main class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>

    <!-- App Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/marketing/AppHeader.vue'
import AppFooter from '~/components/marketing/AppFooter.vue'

defineEmits<{
  signin: []
  signup: []
  dashboard: []
}>()
</script>