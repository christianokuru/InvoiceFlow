<template>
  <section class="py-20 bg-gray-50 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-blue-100 to-transparent rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-green-100 to-transparent rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-in-down animation-delay-200">
          Simple, Transparent Pricing
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-400">
          Choose the perfect plan for your business. Start with our free trial and upgrade as you grow.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        <!-- Starter Plan -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 animate-on-scroll group h-full">
          <div class="mb-6 sm:mb-8">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Starter</h3>
            <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Perfect for small businesses and freelancers</p>
            <div class="mb-4 sm:mb-6">
              <span class="text-3xl sm:text-4xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300 inline-block">
                $12
              </span>
              <span class="text-gray-600 ml-1 text-sm sm:text-base">/month</span>
            </div>
            <button
              @click="handleSelectPlan('starter')"
              class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 group-hover:border-blue-700 group-hover:text-blue-700 text-sm sm:text-base"
            >
              <span class="flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRightIcon class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          <ul class="space-y-3 sm:space-y-4">
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Up to 20 invoices per month</span>
            </li>
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Unlimited receipts</span>
            </li>
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Up to 50 clients</span>
            </li>
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Basic invoice templates</span>
            </li>
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Email support</span>
            </li>
            <li class="flex items-start gap-3 group-hover:bg-blue-50 group-hover:px-2 group-hover:py-1 group-hover:rounded-lg transition-all duration-300">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
              <span class="text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-colors duration-300">Paystack integration</span>
            </li>
          </ul>
        </div>

        <!-- Professional Plan (Popular) -->
        <div class="bg-blue-600 rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 transform sm:scale-105 relative animate-on-scroll group hover:sm:scale-110 transition-all duration-500 hover:shadow-2xl animate-pulse-subtle h-full">
          <div class="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
            <span class="bg-orange-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2">
              <StarIcon class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden sm:inline">Most Popular</span>
              <span class="sm:hidden">Popular</span>
            </span>
          </div>

          <div class="mb-6 sm:mb-8">
            <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">Professional</h3>
            <p class="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">Ideal for growing businesses</p>
            <div class="mb-4 sm:mb-6">
              <span class="text-3xl sm:text-4xl font-bold text-white">$35</span>
              <span class="text-blue-100 text-sm sm:text-base">/month</span>
            </div>
            <button
              @click="handleSelectPlan('professional')"
              class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg text-sm sm:text-base"
            >
              Start Free Trial
            </button>
          </div>

          <ul class="space-y-3 sm:space-y-4">
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Unlimited invoices</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Unlimited receipts</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Unlimited clients</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Premium templates</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Custom branding</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Priority email support</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">Advanced analytics</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-white mt-0.5 flex-shrink-0" />
              <span class="text-white text-sm sm:text-base">API access</span>
            </li>
          </ul>
        </div>

        <!-- Enterprise Plan -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 h-full">
          <div class="mb-6 sm:mb-8">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <p class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">For large organizations with custom needs</p>
            <div class="mb-4 sm:mb-6">
              <span class="text-3xl sm:text-4xl font-bold text-gray-900">Custom</span>
            </div>
            <button
              @click="handleSelectPlan('enterprise')"
              class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
            >
              Contact Sales
            </button>
          </div>

          <ul class="space-y-3 sm:space-y-4">
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Everything in Professional</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Custom integrations</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Dedicated account manager</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Phone support</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Custom training</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">SLA guarantee</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span class="text-gray-700 text-sm sm:text-base">Custom contracts</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Money-back guarantee -->
      <div class="text-center mt-16">
        <div class="inline-flex items-center gap-2 text-gray-600">
          <ShieldCheckIcon class="h-5 w-5 text-green-500" />
          <span>30-day money-back guarantee</span>
        </div>
        <p class="mt-2 text-gray-600">
          No questions asked. Cancel anytime.
        </p>
      </div>

      <!-- FAQ Section -->
      <div class="mt-20 max-w-4xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div class="space-y-6">
          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">Can I change my plan later?</h4>
            <p class="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>

          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
            <p class="text-gray-600">We accept all major credit cards, debit cards, and bank transfers through our Paystack integration.</p>
          </div>

          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
            <p class="text-gray-600">Absolutely. We use industry-standard encryption and follow best practices to keep your financial data safe and secure.</p>
          </div>

          <div class="bg-white rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-gray-900 mb-2">Do you offer discounts for annual billing?</h4>
            <p class="text-gray-600">Yes, we offer a 20% discount when you choose annual billing. Contact our sales team for more details.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckIcon, ShieldCheckIcon, ArrowRightIcon, StarIcon } from 'lucide-vue-next'

const emit = defineEmits(['select-plan'])

const handleSelectPlan = (plan) => {
  emit('select-plan', plan)
  if (plan === 'enterprise') {
    // Navigate to contact page or open contact modal
    navigateTo('/contact')
  } else {
    // Navigate to registration with plan selection
    navigateTo('/auth/register')
  }
}
</script>
