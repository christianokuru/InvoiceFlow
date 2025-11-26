<script setup>
import { ref } from 'vue'
import AppHeader from '~/components/marketing/AppHeader.vue'
import AppFooter from '~/components/marketing/AppFooter.vue'

// TODO
const isAuthenticated = ref(false)
const userName = ref('John Doe')
const userEmail = ref('john@example.com')

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
  { name: 'Press', href: '/press' }
]

const supportLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Contact', href: '/contact' },
  { name: 'Status', href: '/status' },
  { name: 'Terms', href: '/terms' }
]

const legalLinks = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Licenses', href: '/licenses' }
]

defineEmits(['signin', 'signup', 'dashboard'])
</script>

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
    />

    <!-- Main Content with padding for fixed header -->
    <main class="pt-16">
      <NuxtPage />
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