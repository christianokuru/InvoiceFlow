<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Simple, Transparent Pricing
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed">
          Choose the perfect plan for your business. Start with our free trial and upgrade as you grow.
          No hidden fees, no surprises.
        </p>
      </div>
    </section>

    <!-- Pricing Component -->
    <Pricing
      @select-plan="handleSelectPlan"
    />

    <!-- CTA Section -->
    <CTA
      @start-trial="handleStartTrial"
      @schedule-demo="handleScheduleDemo"
    />
  </div>
</template>

<script setup>
import Pricing from '~/components/marketing/Pricing.vue'
import CTA from '~/components/marketing/CTA.vue'
import { useScrollAnimations } from '~/composables/useScrollAnimations'

// Initialize scroll animations
useScrollAnimations()

definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'Pricing - InvoiceFlow | Affordable Invoice & Receipt Management',
  description: 'Choose the perfect plan for your business. Starter ($12/month), Professional ($35/month), or Enterprise. 14-day free trial, no credit card required.',
  keywords: 'invoice pricing, subscription plans, Nigerian business software, affordable invoicing, Paystack integration',
  ogTitle: 'InvoiceFlow Pricing Plans',
  ogDescription: 'Simple, transparent pricing for Nigerian businesses. Start with a 14-day free trial and upgrade as you grow.'
})

// Event Handlers
const handleSelectPlan = (plan) => {
  if (plan === 'enterprise') {
    navigateTo('/contact')
  } else {
    navigateTo('/auth/register')
  }
}

const handleStartTrial = () => {
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  navigateTo('/contact')
}
</script>
