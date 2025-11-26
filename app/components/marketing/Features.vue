<template>
  <section id="features" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-in-down animation-delay-200">
          Everything You Need to Manage Your Business Finances
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-400">
          Powerful features designed to help Nigerian businesses create professional invoices,
          track receipts, and get paid faster with Paystack integration.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Invoice Management -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
            <FileTextIcon class="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">Professional Invoices</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Create beautiful, professional invoices in minutes. Auto-generate invoice numbers,
            add your logo, and customize templates to match your brand.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Custom templates</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Auto-numbering</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>PDF generation</span>
            </li>
          </ul>
        </div>

        <!-- Receipt Management -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-200 h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
            <ReceiptIcon class="h-5 w-5 sm:h-6 sm:w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors duration-300">Receipt Tracking</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Organize and categorize all your business receipts in one place.
            Track expenses by category and generate detailed reports.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Category organization</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Expense tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Financial reports</span>
            </li>
          </ul>
        </div>

        <!-- Client Management -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-400 h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
            <UsersIcon class="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors duration-300">Client Management</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Keep track of all your clients and their transaction history.
            Manage contact information and view communication history.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Client database</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Transaction history</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Quick invoicing</span>
            </li>
          </ul>
        </div>

        <!-- Payment Processing -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-600 h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300">
            <CreditCardIcon class="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors duration-300">Paystack Integration</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Accept payments directly through your invoices with seamless Paystack integration.
            Get paid faster with multiple payment options.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Card payments</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Bank transfers</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>USSD payments</span>
            </li>
          </ul>
        </div>

        <!-- Email Sending -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-800 h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
            <MailIcon class="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300">Email Documents</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Send professional invoices and receipts directly to your clients' email.
            Track when documents are opened and viewed.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Professional templates</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Email tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Bulk sending</span>
            </li>
          </ul>
        </div>

        <!-- Analytics & Reports -->
        <div class="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-1000 h-full">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-teal-200 group-hover:scale-110 transition-all duration-300">
            <BarChart3Icon class="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-teal-600 transition-colors duration-300">Analytics Dashboard</h3>
          <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Get insights into your business performance with detailed analytics.
            Track revenue, expenses, and client activity in real-time.
          </p>
          <ul class="space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base">
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Revenue tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Expense analysis</span>
            </li>
            <li class="flex items-center gap-2">
              <CheckIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
              <span>Custom reports</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <button
          @click="handleGetStarted"
          class="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started Free
        </button>
        <p class="mt-4 text-gray-600">
          No credit card required • 14-day free trial
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  CheckIcon,
  FileTextIcon,
  ReceiptIcon,
  UsersIcon,
  CreditCardIcon,
  MailIcon,
  BarChart3Icon
} from 'lucide-vue-next'

const emit = defineEmits(['get-started'])

const handleGetStarted = () => {
  emit('get-started')
  navigateTo('/auth/register')
}
</script>
