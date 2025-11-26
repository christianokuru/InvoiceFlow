<template>
  <div>
    <!-- Hero Section -->
    <Hero
      @start-trial="handleStartTrial"
      @watch-demo="handleWatchDemo"
    />

    <!-- Features Section -->
    <Features
      @get-started="handleGetStarted"
    />

    <!-- Testimonials Section -->
    <Testimonials
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
import Hero from '~/components/marketing/Hero.vue'
import Features from '~/components/marketing/Features.vue'
import Testimonials from '~/components/marketing/Testimonials.vue'
import CTA from '~/components/marketing/CTA.vue'
import { useScrollAnimations } from '~/composables/useScrollAnimations'

// Initialize scroll animations
useScrollAnimations()

definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'InvoiceFlow - Professional Invoice & Receipt Management for Nigerian Businesses',
  description: 'Create professional invoices, track receipts, and get paid faster with Paystack integration. The perfect invoicing solution for Nigerian businesses. Start your 14-day free trial today.',
  keywords: 'invoice software, receipt management, Nigerian business, Paystack, invoicing, billing, B2B SaaS',
  ogTitle: 'InvoiceFlow - Invoice & Receipt Management',
  ogDescription: 'Professional invoicing and receipt management designed for Nigerian businesses with Paystack integration.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://invoiceflow.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'InvoiceFlow - Professional Invoicing for Nigerian Businesses',
  twitterDescription: 'Create professional invoices, track receipts, and get paid faster. Start your free trial today!'
})

// Event Handlers
const handleStartTrial = () => {
  navigateTo('/auth/register')
}

const handleWatchDemo = () => {
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    featuresElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleGetStarted = () => {
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  navigateTo('/contact')
}
</script>
