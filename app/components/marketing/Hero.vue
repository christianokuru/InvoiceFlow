<template>
  <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Background animated elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Parallax background elements -->
      <div
        class="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 parallax-slow animated-pattern"
        data-speed="0.5"
      ></div>
      <div
        class="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 parallax-medium animated-pattern animation-delay-2000"
        data-speed="0.3"
      ></div>
      <div
        class="absolute top-1/4 left-1/4 sm:top-1/2 sm:left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 parallax-fast animated-pattern animation-delay-4000"
        data-speed="0.7"
      ></div>

      <!-- Floating particles -->
      <div class="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full opacity-50 animate-float animation-delay-1000 float-slow"></div>
      <div class="absolute top-32 right-20 w-3 h-3 bg-indigo-300 rounded-full opacity-40 animate-float animation-delay-3000 float-slow animation-delay-2000"></div>
      <div class="absolute bottom-40 left-1/4 w-5 h-5 bg-purple-300 rounded-full opacity-30 animate-float animation-delay-2000 float-slow animation-delay-4000"></div>
      <div class="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float animation-delay-1500 float-slow animation-delay-1000"></div>
      <div class="absolute bottom-20 right-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-50 animate-float animation-delay-2500 float-slow animation-delay-3000"></div>

      <!-- Gradient overlay with animation -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-50"></div>
    </div>

    <div class="max-w-7xl mx-auto relative">
      <div class="text-center">
        <!-- Main headline -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in-down leading-tight">
          <span class="inline-block animate-fade-in-down animation-delay-200">Invoice & Receipt</span>
          <span class="inline-block text-blue-600 animate-fade-in-down animation-delay-400"> Management</span>
          <br>
          <span class="inline-block animate-fade-in-down animation-delay-600">Made Simple</span>
        </h1>

        <!-- Subheadline -->
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-800 leading-relaxed">
          Professional invoicing and receipt management for Nigerian businesses.
          Create, send, and track documents with ease. Integrated with Paystack for seamless payments.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
          <button
            @click="handleStartFreeTrial"
            class="magnetic-button px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up animation-delay-1000 group text-sm sm:text-base pulse-glow relative overflow-hidden"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRightIcon class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
          <button
            @click="handleWatchDemo"
            class="magnetic-button px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-white to-gray-50 text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:border-blue-700 hover:bg-blue-50 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fade-in-up animation-delay-1200 text-sm sm:text-base relative overflow-hidden group"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <PlayIcon class="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </span>
            <div class="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </button>
        </div>

        <!-- Trust indicators -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-600 animate-fade-in animation-delay-1400">
          <div class="trust-indicator flex items-center gap-2 animate-slide-in-left animation-delay-1600 reveal-on-scroll">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle pulse-glow">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
            <span class="text-sm sm:text-base">14-day free trial</span>
          </div>
          <div class="trust-indicator flex items-center gap-2 animate-slide-in-up animation-delay-1800 reveal-on-scroll">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle animation-delay-200 pulse-glow">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
            <span class="text-sm sm:text-base">No credit card required</span>
          </div>
          <div class="trust-indicator flex items-center gap-2 animate-slide-in-right animation-delay-2000 reveal-on-scroll">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle animation-delay-400 pulse-glow">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
            <span class="text-sm sm:text-base">Paystack integration</span>
          </div>
        </div>
      </div>

      <!-- Hero Image/Illustration placeholder -->
      <div class="mt-8 sm:mt-12 lg:mt-16 text-center animate-fade-in-up animation-delay-2200">
        <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float">
          <FileTextIcon class="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 animate-pulse-subtle" />
        </div>
        <p class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 animate-fade-in animation-delay-2400">Dashboard preview coming soon</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { CheckIcon, FileTextIcon, ArrowRightIcon, PlayIcon } from 'lucide-vue-next'
import { useAdvancedAnimations } from '~/composables/useAdvancedAnimations'
import { useMicroInteractions } from '~/composables/useMicroInteractions'

const emit = defineEmits(['start-trial', 'watch-demo'])

// Initialize advanced animations
const { createStaggerObserver, applyParallaxEffect } = useAdvancedAnimations()

// Initialize micro-interactions
const microInteractions = useMicroInteractions()

onMounted(() => {
  // Apply stagger animations to trust indicators
  const trustItems = document.querySelectorAll('.trust-indicator')
  createStaggerObserver(trustItems, 'animate-visible', 200)

  // Apply parallax to hero image
  const parallaxElements = document.querySelectorAll('.hero-parallax')
  setInterval(() => applyParallaxEffect(parallaxElements, 0.05), 50)

  // Initialize micro-interactions
  setTimeout(() => {
    microInteractions.initializeInteractions()
  }, 100)
})

const handleStartFreeTrial = () => {
  emit('start-trial')
  // Show success notification
  microInteractions.showNotification('Starting your free trial...', 'success', 2000)
  // Navigate to registration page
  navigateTo('/auth/register')
}

const handleWatchDemo = () => {
  emit('watch-demo')
  // Scroll to features or open demo modal
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    microInteractions.showNotification('Scrolling to features...', 'info', 1500)
    featuresElement.scrollIntoView({ behavior: 'smooth' })
  } else {
    microInteractions.showNotification('Demo coming soon!', 'warning', 2000)
  }
}
</script>
