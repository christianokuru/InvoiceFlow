<template>
  <section class="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Background animated elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-60 h-60 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div class="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div class="absolute top-1/3 left-1/3 sm:top-1/2 sm:left-1/2 w-40 h-40 sm:w-60 sm:h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
    </div>

    <div class="max-w-7xl mx-auto relative">
      <div class="text-center">
        <!-- Main headline -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in-down leading-tight">
          <span class="inline-block animate-fade-in-down animation-delay-200">Invoice & Receipt</span>
          <span class="inline-block text-blue-600 animate-fade-in-down animation-delay-400">Management</span>
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
            class="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up animation-delay-1000 group text-sm sm:text-base"
          >
            <span class="flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRightIcon class="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <button
            @click="handleWatchDemo"
            class="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-1200 text-sm sm:text-base"
          >
            <span class="flex items-center justify-center gap-2">
              <PlayIcon class="h-4 w-4 sm:h-5 sm:w-5" />
              Watch Demo
            </span>
          </button>
        </div>

        <!-- Trust indicators -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-600 animate-fade-in animation-delay-1400">
          <div class="flex items-center gap-2 animate-slide-in-left animation-delay-1600">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
            <span class="text-sm sm:text-base">14-day free trial</span>
          </div>
          <div class="flex items-center gap-2 animate-slide-in-up animation-delay-1800">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle animation-delay-200">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
            <span class="text-sm sm:text-base">No credit card required</span>
          </div>
          <div class="flex items-center gap-2 animate-slide-in-right animation-delay-2000">
            <div class="bg-green-100 p-1.5 sm:p-2 rounded-full animate-bounce-subtle animation-delay-400">
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
import { CheckIcon, FileTextIcon, ArrowRightIcon, PlayIcon } from 'lucide-vue-next'

const emit = defineEmits(['start-trial', 'watch-demo'])

const handleStartFreeTrial = () => {
  emit('start-trial')
  // Navigate to registration page
  navigateTo('/auth/register')
}

const handleWatchDemo = () => {
  emit('watch-demo')
  // Scroll to features or open demo modal
  const featuresElement = document.getElementById('features')
  if (featuresElement) {
    featuresElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
