<template>
  <div class="space-y-8">
    <!-- Theme Settings with Live Preview -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Theme & Appearance</h3>
        <button
          type="button"
          @click="previewTheme"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {{ previewMode ? 'Exit Preview' : '🎨 Preview Mode' }}
        </button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Theme Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-4">
            Choose Your Theme
          </label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label
              v-for="theme in themes"
              :key="theme.value"
              class="relative flex cursor-pointer transition-all duration-200"
              :class="[
                form.theme === theme.value
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-102'
              ]"
            >
              <input
                :value="theme.value"
                v-model="form.theme"
                type="radio"
                name="theme"
                class="sr-only"
                @change="handleThemeChange(theme.value)"
              />
              <div
                class="w-full p-4 border-2 rounded-xl transition-all duration-200"
                :class="[
                  form.theme === theme.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                ]"
              >
                <!-- Theme Preview Card -->
                <div class="mb-3 h-24 rounded-lg overflow-hidden shadow-sm border" :class="theme.previewClass">
                  <div class="h-6" :class="theme.headerClass"></div>
                  <div class="p-2 space-y-1">
                    <div class="h-2 rounded" :class="theme.textClass"></div>
                    <div class="h-2 rounded w-3/4" :class="theme.subtextClass"></div>
                    <div class="h-2 rounded w-1/2" :class="theme.accentClass"></div>
                  </div>
                </div>

                <div class="flex items-center">
                  <component
                    :is="theme.icon"
                    class="h-6 w-6 flex-shrink-0"
                    :class="form.theme === theme.value ? 'text-blue-600' : 'text-gray-400'"
                  />
                  <div class="ml-3 flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ theme.label }}</div>
                    <div class="text-sm text-gray-500">{{ theme.description }}</div>
                  </div>
                </div>
                <div
                  v-if="form.theme === theme.value"
                  class="absolute top-3 right-3 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center shadow-md"
                >
                  <CheckIcon class="h-4 w-4 text-white" />
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Theme Customization -->
        <div class="p-4 bg-gray-50 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Theme Customization</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="primaryColor" class="block text-xs font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div class="flex items-center space-x-2">
                <input
                  id="primaryColor"
                  v-model="form.customization.primaryColor"
                  type="color"
                  class="h-10 w-20 border-gray-300 rounded cursor-pointer"
                />
                <input
                  v-model="form.customization.primaryColor"
                  type="text"
                  placeholder="#3B82F6"
                  class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label for="accentColor" class="block text-xs font-medium text-gray-700 mb-1">
                Accent Color
              </label>
              <div class="flex items-center space-x-2">
                <input
                  id="accentColor"
                  v-model="form.customization.accentColor"
                  type="color"
                  class="h-10 w-20 border-gray-300 rounded cursor-pointer"
                />
                <input
                  v-model="form.customization.accentColor"
                  type="text"
                  placeholder="#10B981"
                  class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Currency & Format Settings -->
    <div class="border-t pt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Currency & Format</h3>
      <div class="space-y-6">
        <!-- Currency Selection -->
        <div class="p-4 rounded-lg border border-gray-200 bg-gray-50">
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-3">
            💰 Default Currency
          </label>
          <select
            id="currency"
            v-model="form.currency"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          >
            <!-- Major Currencies -->
            <optgroup label="🌍 Major Currencies">
              <option value="USD">🇺🇸 US Dollar (USD) - $1,000.00</option>
              <option value="EUR">🇪🇺 Euro (EUR) - €1.000,00</option>
              <option value="GBP">🇬🇧 British Pound (GBP) - £1,000.00</option>
              <option value="JPY">🇯🇵 Japanese Yen (JPY) - ¥1,000</option>
            </optgroup>

            <!-- African Currencies -->
            <optgroup label="🌍 African Currencies">
              <option value="NGN">🇳🇬 Nigerian Naira (NGN) - ₦1,000.00</option>
              <option value="KES">🇰🇪 Kenyan Shilling (KES) - KSh 1,000</option>
              <option value="GHS">🇬🇭 Ghanaian Cedi (GHS) - GH₵ 1,000.00</option>
              <option value="ZAR">🇿🇦 South African Rand (ZAR) - R 1,000.00</option>
              <option value="EGP">🇪🇬 Egyptian Pound (EGP) - E£ 1,000.00</option>
            </optgroup>

            <!-- Other Currencies -->
            <optgroup label="🌍 Other Currencies">
              <option value="CAD">🇨🇦 Canadian Dollar (CAD) - $1,000.00</option>
              <option value="AUD">🇦🇺 Australian Dollar (AUD) - $1,000.00</option>
              <option value="CHF">🇨🇭 Swiss Franc (CHF) - CHF 1,000.00</option>
              <option value="CNY">🇨🇳 Chinese Yuan (CNY) - ¥1,000.00</option>
              <option value="INR">🇮🇳 Indian Rupee (INR) - ₹1,000.00</option>
            </optgroup>
          </select>
          <p class="mt-2 text-sm text-gray-500">
            Selected currency will be used for all invoices and receipts
          </p>
        </div>

        <!-- Date Format -->
        <div class="p-4 rounded-lg border border-gray-200 bg-blue-50/30">
          <label for="dateFormat" class="block text-sm font-medium text-gray-700 mb-3">
            📅 Date Format
          </label>
          <select
            id="dateFormat"
            v-model="form.dateFormat"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY (25/12/2024) - European</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY (12/25/2024) - US</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-25) - ISO</option>
            <option value="D MMM YYYY">D MMM YYYY (25 Dec 2024) - International</option>
            <option value="MMM D, YYYY">MMM D, YYYY (Dec 25, 2024) - US Long</option>
          </select>
          <div class="mt-2 p-2 bg-white rounded border border-blue-200">
            <p class="text-xs text-blue-800">
              📋 Preview: {{ formatDatePreview() }}
            </p>
          </div>
        </div>

        <!-- Timezone -->
        <div class="p-4 rounded-lg border border-gray-200 bg-green-50/30">
          <label for="timezone" class="block text-sm font-medium text-gray-700 mb-3">
            🌍 Timezone
          </label>
          <select
            id="timezone"
            v-model="form.timezone"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          >
            <!-- Africa -->
            <optgroup label="🌍 Africa">
              <option value="Africa/Lagos">West Africa Time (Lagos) - UTC+1</option>
              <option value="Africa/Nairobi">East Africa Time (Nairobi) - UTC+3</option>
              <option value="Africa/Cairo">Eastern European Time (Cairo) - UTC+2</option>
              <option value="Africa/Johannesburg">South Africa Time (Johannesburg) - UTC+2</option>
            </optgroup>

            <!-- Europe -->
            <optgroup label="🌍 Europe">
              <option value="Europe/London">Greenwich Mean Time (London) - UTC+0</option>
              <option value="Europe/Paris">Central European Time (Paris) - UTC+1</option>
              <option value="Europe/Berlin">Central European Time (Berlin) - UTC+1</option>
            </optgroup>

            <!-- Americas -->
            <optgroup label="🌍 Americas">
              <option value="America/New_York">Eastern Time (New York) - UTC-5</option>
              <option value="America/Los_Angeles">Pacific Time (Los Angeles) - UTC-8</option>
              <option value="America/Chicago">Central Time (Chicago) - UTC-6</option>
              <option value="America/Toronto">Eastern Time (Toronto) - UTC-5</option>
            </optgroup>

            <!-- Asia Pacific -->
            <optgroup label="🌍 Asia Pacific">
              <option value="Asia/Tokyo">Japan Standard Time (Tokyo) - UTC+9</option>
              <option value="Asia/Shanghai">China Standard Time (Shanghai) - UTC+8</option>
              <option value="Asia/Dubai">Gulf Standard Time (Dubai) - UTC+4</option>
              <option value="Australia/Sydney">Australian Eastern Time (Sydney) - UTC+10</option>
            </optgroup>
          </select>
          <p class="mt-2 text-sm text-gray-500">
            Current time: {{ getCurrentTime() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Dashboard Settings -->
    <div class="border-t pt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Dashboard Preferences</h3>
      <div class="space-y-6">
        <!-- View Options -->
        <div class="p-4 rounded-lg border border-gray-200 bg-purple-50/30">
          <h4 class="text-sm font-medium text-gray-700 mb-3">🎛️ View Options</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
              <div class="flex-1">
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      id="compactView"
                      v-model="form.dashboard.compactView"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <label for="compactView" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                    📱 Compact View
                  </label>
                </div>
                <p class="mt-1 text-sm text-gray-500 ml-14">Show more items in dashboard lists</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200">
              <div class="flex-1">
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      id="showAnimations"
                      v-model="form.dashboard.showAnimations"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <label for="showAnimations" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                    ✨ Enable Animations
                  </label>
                </div>
                <p class="mt-1 text-sm text-gray-500 ml-14">Show smooth transitions and animations</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Default Settings -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg border border-gray-200 bg-orange-50/30">
            <label for="defaultView" class="block text-sm font-medium text-gray-700 mb-2">
              🏠 Default Dashboard View
            </label>
            <select
              id="defaultView"
              v-model="form.dashboard.defaultView"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            >
              <option value="overview">📊 Overview - Main dashboard</option>
              <option value="invoices">🧾 Invoices - Invoice management</option>
              <option value="receipts">📜 Receipts - Receipt management</option>
              <option value="analytics">📈 Analytics - Reports & insights</option>
              <option value="clients">👥 Clients - Customer management</option>
            </select>
          </div>

          <div class="p-4 rounded-lg border border-gray-200 bg-teal-50/30">
            <label for="itemsPerPage" class="block text-sm font-medium text-gray-700 mb-2">
              📄 Items Per Page
            </label>
            <select
              id="itemsPerPage"
              v-model="form.dashboard.itemsPerPage"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
            >
              <option value="10">10 items - Quick browsing</option>
              <option value="25">25 items - Balanced view</option>
              <option value="50">50 items - Data dense</option>
              <option value="100">100 items - Maximum data</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Language & Region Settings -->
    <div class="border-t pt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Language & Region</h3>
      <div class="space-y-6">
        <!-- Language Selection -->
        <div class="p-4 rounded-lg border border-gray-200 bg-indigo-50/30">
          <label for="language" class="block text-sm font-medium text-gray-700 mb-3">
            🌐 Display Language
          </label>
          <select
            id="language"
            v-model="form.language"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          >
            <optgroup label="🌍 English Variants">
              <option value="en">🇺🇸 English (US)</option>
              <option value="en-GB">🇬🇧 English (UK)</option>
              <option value="en-NG">🇳🇬 English (Nigeria)</option>
              <option value="en-AU">🇦🇺 English (Australia)</option>
            </optgroup>

            <optgroup label="🌍 Other Languages">
              <option value="fr">🇫🇷 Français (French)</option>
              <option value="es">🇪🇸 Español (Spanish)</option>
              <option value="pt">🇵🇹 Português (Portuguese)</option>
              <option value="de">🇩🇪 Deutsch (German)</option>
              <option value="it">🇮🇹 Italiano (Italian)</option>
              <option value="zh">🇨🇳 中文 (Chinese)</option>
              <option value="ar">🇸🇦 العربية (Arabic)</option>
            </optgroup>
          </select>
          <p class="mt-2 text-sm text-gray-500">
            Choose your preferred language for the interface
          </p>
        </div>

        <!-- Regional Settings -->
        <div class="p-4 rounded-lg border border-gray-200 bg-pink-50/30">
          <h4 class="text-sm font-medium text-gray-700 mb-3">🌍 Regional Preferences</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-pink-200">
              <div class="flex-1">
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      id="useMetric"
                      v-model="form.region.useMetric"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                  <label for="useMetric" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                    📏 Use Metric System
                  </label>
                </div>
                <p class="mt-1 text-sm text-gray-500 ml-14">
                  Use metric units (km, kg, °C) instead of imperial (miles, lbs, °F)
                </p>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-pink-200">
              <div class="flex-1">
                <div class="flex items-center">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      id="use24Hour"
                      v-model="form.region.use24Hour"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                  <label for="use24Hour" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                    🕐 24-Hour Time Format
                  </label>
                </div>
                <p class="mt-1 text-sm text-gray-500 ml-14">
                  Display time in 24-hour format (14:30) instead of 12-hour (2:30 PM)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="handleReset"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Reset to Defaults
      </button>
      <button
        type="button"
        @click="handleSubmit"
        :disabled="isSaving"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
      >
        <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ isSaving ? 'Saving...' : 'Save Appearance Settings' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'
import { useNotifications } from '~/composables/useNotifications'

const { user } = useAuth()
const { showNotification, showSuccess, showError } = useNotifications()

const emit = defineEmits(['save', 'error'])

// State
const isSaving = ref(false)
const previewMode = ref(false)
const originalForm = ref({})

// Form data
const form = ref({
  theme: 'light',
  currency: 'NGN',
  dateFormat: 'DD/MM/YYYY',
  timezone: 'Africa/Lagos',
  language: 'en-NG',
  dashboard: {
    compactView: false,
    showAnimations: true,
    defaultView: 'overview',
    itemsPerPage: '25'
  },
  region: {
    useMetric: true,
    use24Hour: false
  },
  customization: {
    primaryColor: '#3B82F6',
    accentColor: '#10B981'
  }
})

// Enhanced theme definitions with preview classes
const themes = [
  {
    value: 'light',
    label: 'Light',
    description: 'Clean and bright interface',
    icon: SunIcon,
    previewClass: 'bg-white border-gray-200',
    headerClass: 'bg-gray-100',
    textClass: 'bg-gray-800',
    subtextClass: 'bg-gray-600',
    accentClass: 'bg-blue-500'
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Easy on the eyes in low light',
    icon: MoonIcon,
    previewClass: 'bg-gray-900 border-gray-700',
    headerClass: 'bg-gray-800',
    textClass: 'bg-gray-100',
    subtextClass: 'bg-gray-400',
    accentClass: 'bg-blue-400'
  },
  {
    value: 'system',
    label: 'System',
    description: 'Follow your device preference',
    icon: ComputerDesktopIcon,
    previewClass: 'bg-gradient-to-br from-white to-gray-100 border-gray-300',
    headerClass: 'bg-gradient-to-r from-gray-100 to-gray-200',
    textClass: 'bg-gray-800',
    subtextClass: 'bg-gray-600',
    accentClass: 'bg-blue-500'
  }
]

// Computed
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
})

// Watch for changes
watch(form, () => {
  // Auto-save could be implemented here
}, { deep: true })

// Initialize form with user data
onMounted(() => {
  if (user.value && user.value.appearanceSettings) {
    form.value = {
      ...form.value,
      ...user.value.appearanceSettings,
      dashboard: {
        ...form.value.dashboard,
        ...user.value.appearanceSettings?.dashboard
      },
      region: {
        ...form.value.region,
        ...user.value.appearanceSettings?.region
      },
      customization: {
        ...form.value.customization,
        ...user.value.appearanceSettings?.customization
      }
    }
  }
  // Store original form for reset functionality
  originalForm.value = JSON.parse(JSON.stringify(form.value))
})

// Helper functions
const formatDatePreview = () => {
  const date = new Date()
  const format = form.value.dateFormat

  switch (format) {
    case 'DD/MM/YYYY':
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    case 'MM/DD/YYYY':
      return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    case 'YYYY-MM-DD':
      return date.toISOString().split('T')[0]
    case 'D MMM YYYY':
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    case 'MMM D, YYYY':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    default:
      return date.toLocaleDateString()
  }
}

const getCurrentTime = () => {
  try {
    return new Date().toLocaleString('en-US', {
      timeZone: form.value.timezone,
      hour12: !form.value.region.use24Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch (error) {
    return 'Time not available'
  }
}

// Theme handling
const handleThemeChange = (theme) => {
  if (previewMode.value) {
    // Apply theme preview
    document.documentElement.setAttribute('data-theme', theme)
  }
}

const previewTheme = () => {
  previewMode.value = !previewMode.value
  if (previewMode.value) {
    document.documentElement.setAttribute('data-theme', form.value.theme)
    showNotification({
      type: 'info',
      title: 'Preview Mode',
      message: 'Theme preview is active. Changes are temporary until you save.'
    })
  } else {
    document.documentElement.removeAttribute('data-theme')
    showNotification({
      type: 'info',
      title: 'Preview Disabled',
      message: 'Theme preview has been disabled.'
    })
  }
}

// Form submission
const handleSubmit = async () => {
  try {
    isSaving.value = true

    emit('save', {
      type: 'appearance',
      payload: {
        appearanceSettings: form.value
      }
    })

    // Update original form after successful save
    originalForm.value = JSON.parse(JSON.stringify(form.value))

    // Exit preview mode if active
    if (previewMode.value) {
      previewMode.value = false
      document.documentElement.removeAttribute('data-theme')
    }

    showSuccess('Appearance settings saved successfully! 🎨', 'Settings Updated')
  } catch (error) {
    emit('error', error)
    showError(error.message || 'Failed to save appearance settings', 'Save Failed')
  } finally {
    isSaving.value = false
  }
}

// Reset form to defaults
const handleReset = () => {
  form.value = {
    theme: 'light',
    currency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Africa/Lagos',
    language: 'en-NG',
    dashboard: {
      compactView: false,
      showAnimations: true,
      defaultView: 'overview',
      itemsPerPage: '25'
    },
    region: {
      useMetric: true,
      use24Hour: false
    },
    customization: {
      primaryColor: '#3B82F6',
      accentColor: '#10B981'
    }
  }

  showNotification({
    type: 'info',
    title: 'Settings Reset',
    message: 'Appearance settings have been reset to default values.'
  })
}

// Cleanup preview mode on unmount
onMounted(() => {
  // Cleanup function
  return () => {
    if (previewMode.value) {
      document.documentElement.removeAttribute('data-theme')
    }
  }
})
</script>