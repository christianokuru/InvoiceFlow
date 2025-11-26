<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About InvoiceFlow
        </h1>
        <p class="text-xl text-gray-600 leading-relaxed">
          We're on a mission to empower Nigerian businesses with modern, intuitive financial management tools
          that make invoicing and receipt management simple and efficient.
        </p>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div class="space-y-4 text-gray-600">
              <p>
                Founded in 2023, InvoiceFlow was born from a simple observation: Nigerian businesses
                needed better tools to manage their finances. Traditional accounting software was too
                complex, expensive, and not tailored to the unique needs of the Nigerian market.
              </p>
              <p>
                Our founders, experienced entrepreneurs themselves, understood the challenges of
                running a business in Nigeria. They knew firsthand the struggles of creating
                professional invoices, tracking receipts, and getting paid on time.
              </p>
              <p>
                That's why we built InvoiceFlow – a platform that combines powerful functionality
                with simplicity, designed specifically for Nigerian businesses. With seamless
                Paystack integration, local payment methods, and features that matter to you,
                we're helping thousands of businesses thrive.
              </p>
            </div>
          </div>
          <div class="bg-blue-100 rounded-2xl p-8 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon class="h-12 w-12 text-white" />
              </div>
              <p class="text-gray-700 font-semibold">Empowering Nigerian Businesses Since 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="bg-white p-8 rounded-2xl shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <TargetIcon class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-gray-600 leading-relaxed">
              To simplify financial management for Nigerian businesses by providing intuitive,
              affordable, and locally-tailored tools that help entrepreneurs focus on what they
              do best – growing their businesses.
            </p>
          </div>

          <!-- Vision -->
          <div class="bg-white p-8 rounded-2xl shadow-md">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <EyeIcon class="h-6 w-6 text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed">
              To become the leading financial management platform for African businesses,
              starting with Nigeria, by leveraging technology to solve real-world business
              challenges and drive economic growth across the continent.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Value 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UsersIcon class="h-8 w-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
            <p class="text-gray-600">
              We exist to serve our customers. Every decision we make is guided by what's best
              for the businesses that trust us with their financial management.
            </p>
          </div>

          <!-- Value 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LightbulbIcon class="h-8 w-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
            <p class="text-gray-600">
              We constantly challenge the status quo and seek better ways to solve problems,
              leveraging technology to create simple solutions for complex challenges.
            </p>
          </div>

          <!-- Value 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldIcon class="h-8 w-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
            <p class="text-gray-600">
              We operate with honesty, transparency, and ethical standards. We're custodians of
              our customers' financial data and take that responsibility seriously.
            </p>
          </div>

          <!-- Value 4 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GlobeIcon class="h-8 w-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Local Focus</h3>
            <p class="text-gray-600">
              We understand the Nigerian context and build solutions that work for local
              businesses, integrating with local payment systems and complying with local regulations.
            </p>
          </div>

          <!-- Value 5 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ZapIcon class="h-8 w-8 text-teal-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Simplicity</h3>
            <p class="text-gray-600">
              We believe powerful tools should be easy to use. We obsess over user experience
              to make financial management accessible to everyone, regardless of technical expertise.
            </p>
          </div>

          <!-- Value 6 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon class="h-8 w-8 text-indigo-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p class="text-gray-600">
              We're more than a software company – we're partners in our customers' success.
              We're building a community of Nigerian entrepreneurs supporting each other's growth.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate people behind InvoiceFlow
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Team Member 1 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-blue-600 font-bold text-xl">JD</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
            <p class="text-gray-600 mb-2">CEO & Co-Founder</p>
            <p class="text-gray-500 text-sm">
              Serial entrepreneur with 15+ years experience in Nigerian tech and finance.
            </p>
          </div>

          <!-- Team Member 2 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-green-600 font-bold text-xl">SA</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sarah Ahmed</h3>
            <p class="text-gray-600 mb-2">CTO & Co-Founder</p>
            <p class="text-gray-500 text-sm">
              Full-stack developer passionate about building scalable solutions for African businesses.
            </p>
          </div>

          <!-- Team Member 3 -->
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-purple-600 font-bold text-xl">MO</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Michael Okoro</h3>
            <p class="text-gray-600 mb-2">Head of Product</p>
            <p class="text-gray-500 text-sm">
              Product strategist with deep understanding of Nigerian business needs and user experience.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTA
      @start-trial="handleStartTrial"
      @schedule-demo="handleScheduleDemo"
    />
  </div>
</template>

<script setup>
import {
  TrendingUpIcon,
  TargetIcon,
  EyeIcon,
  UsersIcon,
  LightbulbIcon,
  ShieldIcon,
  GlobeIcon,
  ZapIcon,
  HeartIcon
} from 'lucide-vue-next'
import CTA from '~/components/marketing/CTA.vue'

definePageMeta({
  layout: 'default'
})

// SEO Meta
useSeoMeta({
  title: 'About Us - InvoiceFlow | Nigerian Invoice & Receipt Management',
  description: 'Learn about InvoiceFlow\'s mission to empower Nigerian businesses with modern financial management tools. Founded in 2023, we\'re helping thousands of businesses thrive.',
  keywords: 'about InvoiceFlow, Nigerian business, invoice software, company mission, team',
  ogTitle: 'About InvoiceFlow',
  ogDescription: 'Discover our story, mission, and the team behind InvoiceFlow - the leading invoice and receipt management platform for Nigerian businesses.'
})

// Event Handlers
const handleStartTrial = () => {
  navigateTo('/auth/register')
}

const handleScheduleDemo = () => {
  navigateTo('/contact')
}
</script>
