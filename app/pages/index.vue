<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section id="hero">
      <Hero
        @start-trial="handleStartTrial"
        @watch-demo="handleWatchDemo"
      />
    </section>

    <!-- Quick Stats Section (new) -->
    <section id="stats" class="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div class="reveal-on-scroll">
            <div class="text-3xl sm:text-4xl font-bold text-blue-600 counter-animate" data-target="10000">0</div>
            <p class="mt-2 text-sm sm:text-base text-gray-600">Businesses Served</p>
          </div>
          <div class="reveal-on-scroll">
            <div class="text-3xl sm:text-4xl font-bold text-green-600 counter-animate" data-target="50000">0</div>
            <p class="mt-2 text-sm sm:text-base text-gray-600">Invoices Created</p>
          </div>
          <div class="reveal-on-scroll">
            <div class="text-3xl sm:text-4xl font-bold text-purple-600 counter-animate" data-target="95">0</div>
            <p class="mt-2 text-sm sm:text-base text-gray-600">% Satisfaction</p>
          </div>
          <div class="reveal-on-scroll">
            <div class="text-3xl sm:text-4xl font-bold text-orange-600 counter-animate" data-target="24">0</div>
            <p class="mt-2 text-sm sm:text-base text-gray-600">7/Support</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features">
      <Features
        @get-started="handleGetStarted"
      />
    </section>

    <!-- Benefits Section (new) -->
    <section id="benefits" class="py-6 lg:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Nigerian Businesses Choose InvoiceFlow
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for the Nigerian business ecosystem with local payment integration and compliance.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="reveal-on-scroll">
            <div class="space-y-6">
              <div class="flex items-start space-x-4 group">
                <div class="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Paystack Integration
                  </h3>
                  <p class="mt-2 text-gray-600">Receive payments directly from customers through Nigeria's most trusted payment gateway.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 group">
                <div class="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                  <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    VAT & Tax Compliant
                  </h3>
                  <p class="mt-2 text-gray-600">Automatic VAT calculation and tax compliance features built for Nigerian tax regulations.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 group">
                <div class="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                  <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Multi-Currency Support
                  </h3>
                  <p class="mt-2 text-gray-600">Create invoices in NGN, USD, EUR, and more to serve both local and international clients.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="reveal-on-scroll">
            <div class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p class="text-blue-100 mb-6">Join thousands of Nigerian businesses already using InvoiceFlow to streamline their invoicing.</p>
              <div class="space-y-3">
                <button
                  @click="handleStartTrial"
                  class="w-full px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  Start 14-Day Free Trial
                </button>
                <p class="text-center text-sm text-blue-100">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-16 sm:py-20 lg:py-24">
      <Testimonials
        @get-started="handleGetStarted"
      />
    </section>

    <!-- Pricing Preview Section -->
    <section id="pricing-preview" class="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-on-scroll">
          <!-- Basic Plan -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Starter</h3>
            <p class="text-gray-600 mb-4">Perfect for small businesses</p>
            <div class="text-3xl font-bold text-gray-900 mb-6">Free</div>
            <button
              @click="handleStartTrial"
              class="w-full px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Get Started
            </button>
          </div>

          <!-- Pro Plan -->
          <div class="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-xl p-8 transform scale-105">
            <div class="bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              Most Popular
            </div>
            <h3 class="text-xl font-bold mb-2">Professional</h3>
            <p class="text-blue-100 mb-4">For growing businesses</p>
            <div class="text-3xl font-bold mb-6">$12<span class="text-lg font-normal">/month</span></div>
            <button
              @click="handleStartTrial"
              class="w-full px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Start Free Trial
            </button>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <p class="text-gray-600 mb-4">For large organizations</p>
            <div class="text-3xl font-bold text-gray-900 mb-6">$35<span class="text-lg font-normal">/month</span></div>
            <button
              @click="handleScheduleDemo"
              class="w-full px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section id="cta" class="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
      <CTA
        @start-trial="handleStartTrial"
        @schedule-demo="handleScheduleDemo"
      />
    </section>
  </div>
</template>

<script setup>
import Hero from '~/components/marketing/Hero.vue'
import Features from '~/components/marketing/Features.vue'
import Testimonials from '~/components/marketing/Testimonials.vue'
import CTA from '~/components/marketing/CTA.vue'
import { useScrollAnimations } from '~/composables/useScrollAnimations'
import { useAdvancedAnimations } from '~/composables/useAdvancedAnimations'
import { useMicroInteractions } from '~/composables/useMicroInteractions'

// Initialize scroll animations
useScrollAnimations()

// Initialize advanced animations
const advancedAnimations = useAdvancedAnimations()

// Initialize micro-interactions
const microInteractions = useMicroInteractions()

// Enhanced counter animations for stats
const animateStatsCounters = () => {
  setTimeout(() => {
    const statsElements = document.querySelectorAll('.counter-animate')
    statsElements.forEach(element => {
      const target = parseInt(element.dataset.target)
      if (!isNaN(target)) {
        advancedAnimations.animateCounter(element, 0, target, 2000)
      }
    })
  }, 500)
}

// Initialize animations and interactions
onMounted(() => {
  // Initialize micro-interactions
  setTimeout(() => {
    microInteractions.initializeInteractions()
  }, 100)

  // Initialize counter animations when stats section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStatsCounters()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  const statsSection = document.getElementById('stats')
  if (statsSection) {
    observer.observe(statsSection)
  }
})

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
  microInteractions.showNotification('Starting your free trial...', 'success', 2000)
  navigateTo('/auth/register')
}

const handleWatchDemo = () => {
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    microInteractions.showNotification('Scrolling to features...', 'info', 1500)
    featuresElement.scrollIntoView({ behavior: 'smooth' })
  } else {
    microInteractions.showNotification('Demo video coming soon!', 'warning', 2000)
  }
}

const handleGetStarted = () => {
  microInteractions.showNotification('Getting started...', 'success', 1500)
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  microInteractions.showNotification('Redirecting to contact page...', 'info', 1500)
  navigateTo('/contact')
}
</script>
