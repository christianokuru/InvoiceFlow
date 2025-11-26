<template>
  <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Main CTA Content -->
      <div class="mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Business Finances?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of Nigerian businesses using InvoiceFlow to create professional invoices,
          track receipts, and get paid faster with Paystack integration.
        </p>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button
          @click="handleStartFreeTrial"
          class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Free Trial
        </button>
        <button
          @click="handleScheduleDemo"
          class="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
        >
          Schedule Demo
        </button>
      </div>

      <!-- Trust Indicators -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
        <div class="flex items-center gap-2">
          <CheckIcon class="h-5 w-5 text-green-400" />
          <span>14-day free trial</span>
        </div>
        <div class="flex items-center gap-2">
          <CheckIcon class="h-5 w-5 text-green-400" />
          <span>No credit card required</span>
        </div>
        <div class="flex items-center gap-2">
          <CheckIcon class="h-5 w-5 text-green-400" />
          <span>Cancel anytime</span>
        </div>
      </div>

      <!-- Social Proof -->
      <div class="mt-12 pt-12 border-t border-blue-500 border-opacity-30">
        <p class="text-blue-200 mb-6">Trusted by leading Nigerian companies</p>
        <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <!-- Company logos placeholders -->
          <div class="w-24 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span class="text-white text-sm font-semibold">TechCorp</span>
          </div>
          <div class="w-24 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span class="text-white text-sm font-semibold">RetailNG</span>
          </div>
          <div class="w-24 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span class="text-white text-sm font-semibold">ServePro</span>
          </div>
          <div class="w-24 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span class="text-white text-sm font-semibold">BuildLtd</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckIcon } from 'lucide-vue-next'

const emit = defineEmits(['start-trial', 'schedule-demo'])

const handleStartFreeTrial = () => {
  emit('start-trial')
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  emit('schedule-demo')
  navigateTo('/contact')
}
</script>
