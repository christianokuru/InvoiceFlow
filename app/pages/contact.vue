<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed">
          Have questions about InvoiceFlow? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    errors?.name ? 'border-red-300' : 'border-gray-300'
                  ]"
                  placeholder="Enter your full name"
                />
                <p v-if="errors?.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    errors?.email ? 'border-red-300' : 'border-gray-300'
                  ]"
                  placeholder="Enter your email address"
                />
                <p v-if="errors?.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <!-- Subject Field -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Message Field -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none',
                    errors?.message ? 'border-red-300' : 'border-gray-300'
                  ]"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <p v-if="errors?.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <span v-if="!isLoading">Send Message</span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

            <!-- Contact Methods -->
            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MailIcon class="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p class="text-gray-600">support@invoiceflow.com</p>
                  <p class="text-gray-500 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon class="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p class="text-gray-600">+234 800 123 4567</p>
                  <p class="text-gray-500 text-sm">Mon-Fri, 9AM-5PM WAT</p>
                </div>
              </div>

              <!-- Office -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon class="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Visit Our Office</h3>
                  <p class="text-gray-600">
                    123 Tech Hub Drive<br>
                    Victoria Island, Lagos<br>
                    Nigeria
                  </p>
                  <p class="text-gray-500 text-sm">By appointment only</p>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div class="space-y-2 text-gray-600">
                <div class="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p class="mt-3 text-sm text-gray-500">
                All times are West Africa Time (WAT)
              </p>
            </div>

            <!-- Social Media -->
            <div class="mt-8">
              <h3 class="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex gap-4">
                <a href="#" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <span class="sr-only">Twitter</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                  <span class="sr-only">Instagram</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-vue-next'
import { useToaster } from '~/composables/useToaster'

definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'Contact Us - InvoiceFlow | Get in Touch',
  description: 'Contact InvoiceFlow for sales, support, or partnership inquiries. Email us at support@invoiceflow.com or call +234 800 123 4567. Our office is located in Lagos, Nigeria.',
  keywords: 'contact InvoiceFlow, customer support, sales inquiry, Lagos office, Nigerian business software',
  ogTitle: 'Contact InvoiceFlow',
  ogDescription: 'Get in touch with the InvoiceFlow team for any questions about our invoice and receipt management software.'
})

const { success, error } = useToaster()

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form errors
const errors = reactive({})

// Loading state
const isLoading = ref(false)

// Form validation
const validateForm = () => {
  const newErrors = {}

  if (!form.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!form.subject) {
    newErrors.subject = 'Please select a subject'
  }

  if (!form.message.trim()) {
    newErrors.message = 'Message is required'
  } else if (form.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters long'
  }

  // Clear old errors and set new ones
  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)

  return Object.keys(newErrors).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    error('Validation Error', 'Please fix the errors in the form')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Show success message
    success('Message Sent!', 'Thank you for contacting us. We\'ll get back to you within 24 hours.')

    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    // Clear any remaining errors
    Object.keys(errors).forEach(key => delete errors[key])

  } catch (err) {
    error('Sending Failed', 'Unable to send your message. Please try again later.')
  } finally {
    isLoading.value = false
  }
}
</script>
