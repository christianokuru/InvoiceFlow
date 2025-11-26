<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Powerful Features for Your Business
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed">
          Everything you need to create professional invoices, track receipts, manage clients,
          and get paid faster with Paystack integration.
        </p>
      </div>
    </section>

    <!-- Features Component -->
    <Features
      @get-started="handleGetStarted"
    />

    <!-- CTA Section -->
    <CTA
      @start-trial="handleStartTrial"
      @schedule-demo="handleScheduleDemo"
    />
  </div>
</template>

<script setup>
import Features from '~/components/marketing/Features.vue'
import CTA from '~/components/marketing/CTA.vue'
import { useScrollAnimations } from '~/composables/useScrollAnimations'

// Initialize scroll animations
useScrollAnimations()

definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'Features - InvoiceFlow | Complete Invoice & Receipt Management',
  description: 'Discover all the powerful features of InvoiceFlow: professional invoices, receipt tracking, client management, Paystack integration, analytics, and more.',
  keywords: 'invoice features, receipt management, client management, Paystack integration, analytics dashboard',
  ogTitle: 'InvoiceFlow Features',
  ogDescription: 'Explore the complete feature set of InvoiceFlow - the ultimate financial management tool for Nigerian businesses.'
})

// Event Handlers
const handleGetStarted = () => {
  navigateTo('/auth/register')
}

const handleStartTrial = () => {
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  navigateTo('/contact')
}
</script>
