<template>
  <div class="min-h-screen bg-gray-50">
    <!-- App Header for marketing pages -->
    <AppHeader
      :is-authenticated="isAuthenticated"
      :user-name="userName"
      :user-email="userEmail"
      :navigation="navigation"
      :current-path="$route.path"
      @signin="$emit('signin')"
      @signup="$emit('signup')"
      @dashboard="$emit('dashboard')"
      @toggle-mobile-menu="toggleMobileMenu"
    />

    <!-- Mobile menu overlay -->
    <div
      v-if="showMobileMenu"
      class="fixed inset-0 z-50 md:hidden"
    >
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeMobileMenu" />
      <div class="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div class="flex items-center justify-between p-4 border-b">
          <span class="text-lg font-semibold">Menu</span>
          <button @click="closeMobileMenu" class="p-2 hover:bg-gray-100 rounded">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- App Footer -->
    <AppFooter
      :product-links="productLinks"
      :company-links="companyLinks"
      :support-links="supportLinks"
      :legal-links="legalLinks"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// TODO: Replace with actual auth store
const isAuthenticated = ref(false)
const userName = ref('John Doe')
const userEmail = ref('john@example.com')

const showMobileMenu = ref(false)

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const productLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'API', href: '/api' },
  { name: 'Documentation', href: '/docs' }
]

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Partners', href: '/partners' }
]

const supportLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Status', href: '/status' },
  { name: 'Community', href: '/community' }
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Security', href: '/security' }
]

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

defineEmits<{
  signin: []
  signup: []
  dashboard: []
}>()
</script>