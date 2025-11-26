<template>
  <section class="py-20 bg-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Trusted by Nigerian Businesses
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          See what our customers have to say about how InvoiceFlow is transforming their business operations.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-200">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "InvoiceFlow has completely transformed how I manage my freelance business.
            Creating professional invoices takes minutes now, and I get paid much faster with the Paystack integration."
          </p>
          <div class="flex items-center group-hover:bg-blue-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
              <span class="text-blue-600 font-semibold">AO</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Adebayo Olatunji</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Freelance Developer, Lagos</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-400">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "The receipt tracking feature is a game-changer for my retail business.
            I can easily categorize expenses and generate reports for my accountant.
            Worth every naira!"
          </p>
          <div class="flex items-center group-hover:bg-green-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
              <span class="text-green-600 font-semibold">FI</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Fatima Ibrahim</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Retail Store Owner, Abuja</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-600">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "As a consultant, I need to look professional. InvoiceFlow's templates are beautiful,
            and clients love the payment experience. My revenue increased by 30% in the first 3 months!"
          </p>
          <div class="flex items-center group-hover:bg-purple-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-purple-200 transition-all duration-300">
              <span class="text-purple-600 font-semibold">CO</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Chidi Okoro</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Business Consultant, Port Harcourt</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-800">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "The customer support is exceptional! They helped me migrate all my existing invoices
            and even provided training for my team. This is the best business investment I've made."
          </p>
          <div class="flex items-center group-hover:bg-orange-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-orange-200 transition-all duration-300">
              <span class="text-orange-600 font-semibold">NE</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Ngozi Eze</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Event Planner, Enugu</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 5 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-1000">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "I've tried other invoicing software, but InvoiceFlow is built for Nigerian businesses.
            The Paystack integration works seamlessly, and the pricing is perfect for SMEs."
          </p>
          <div class="flex items-center group-hover:bg-teal-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-teal-200 transition-all duration-300">
              <span class="text-teal-600 font-semibold">KA</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">Kehinde Adekunle</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Digital Agency Owner, Ibadan</p>
            </div>
          </div>
        </div>

        <!-- Testimonial 6 -->
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll group animation-delay-1200">
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <StarIcon v-for="i in 5" :key="i" class="h-5 w-5 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <p class="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
            "The analytics dashboard gives me insights I never had before.
            I can track my business performance in real-time and make better financial decisions."
          </p>
          <div class="flex items-center group-hover:bg-indigo-50 group-hover:px-3 group-hover:py-2 group-hover:rounded-lg transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-indigo-200 transition-all duration-300">
              <span class="text-indigo-600 font-semibold">MY</span>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Musa Yakubu</h4>
              <p class="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">Construction Company, Kano</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 bg-white rounded-2xl p-8 shadow-lg animate-on-scroll group">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            Join Thousands of Growing Businesses
          </h3>
          <p class="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            See why Nigerian entrepreneurs choose InvoiceFlow for their business finances
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center group-hover:transform hover:scale-105 transition-all duration-300">
            <div class="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse-subtle">5,000+</div>
            <div class="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Active Users</div>
          </div>
          <div class="text-center group-hover:transform hover:scale-105 transition-all duration-300">
            <div class="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse-subtle animation-delay-1000">$2.5M+</div>
            <div class="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Invoices Processed</div>
          </div>
          <div class="text-center group-hover:transform hover:scale-105 transition-all duration-300">
            <div class="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse-subtle animation-delay-2000">98%</div>
            <div class="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Customer Satisfaction</div>
          </div>
          <div class="text-center group-hover:transform hover:scale-105 transition-all duration-300">
            <div class="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse-subtle animation-delay-3000">24/7</div>
            <div class="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Customer Support</div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <button
          @click="handleGetStarted"
          class="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Your Free Trial
        </button>
        <p class="mt-4 text-gray-600">
          14-day free trial • No credit card required
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { StarIcon } from 'lucide-vue-next'

const emit = defineEmits(['get-started'])

const handleGetStarted = () => {
  emit('get-started')
  navigateTo('/auth/register')
}
</script>
