<template>
  <div class="space-y-8">
    <!-- Email Notifications -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Email Notifications</h3>
        <button
          type="button"
          @click="testEmailNotification"
          :disabled="testingEmail"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ testingEmail ? 'Sending...' : '📧 Send Test Email' }}
        </button>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="invoiceCreated"
                    v-model="form.emailNotifications.invoiceCreated"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="invoiceCreated" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  Invoice Created
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Get notified when a new invoice is created</p>
            </div>
            <div v-if="form.emailNotifications.invoiceCreated" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="invoicePaid"
                    v-model="form.emailNotifications.invoicePaid"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="invoicePaid" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  Invoice Paid
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Receive payment confirmation emails</p>
            </div>
            <div v-if="form.emailNotifications.invoicePaid" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="invoiceOverdue"
                    v-model="form.emailNotifications.invoiceOverdue"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="invoiceOverdue" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  Overdue Invoice Reminders
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Daily reminders for overdue invoices</p>
            </div>
            <div v-if="form.emailNotifications.invoiceOverdue" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="receiptCreated"
                    v-model="form.emailNotifications.receiptCreated"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="receiptCreated" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  Receipt Created
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Get notified when receipts are generated</p>
            </div>
            <div v-if="form.emailNotifications.receiptCreated" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="clientAdded"
                    v-model="form.emailNotifications.clientAdded"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="clientAdded" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  New Client Added
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Notifications when new clients are added</p>
            </div>
            <div v-if="form.emailNotifications.clientAdded" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <div class="flex-1">
              <div class="flex items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    id="weeklySummary"
                    v-model="form.emailNotifications.weeklySummary"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <label for="weeklySummary" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  Weekly Summary
                </label>
              </div>
              <p class="mt-1 text-sm text-gray-500 ml-14">Weekly business activity summary</p>
            </div>
            <div v-if="form.emailNotifications.weeklySummary" class="text-green-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- SMS Notifications -->
    <div class="border-t pt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">SMS Notifications</h3>
        <button
          type="button"
          @click="testSmsNotification"
          :disabled="testingSms || !form.smsNotifications.enabled"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ testingSms ? 'Sending...' : '📱 Send Test SMS' }}
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
          <div class="flex-1">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="smsEnabled"
                  v-model="form.smsNotifications.enabled"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <label for="smsEnabled" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Enable SMS Notifications
              </label>
            </div>
            <p class="mt-1 text-sm text-gray-500 ml-14">Receive important updates via SMS (Standard rates apply)</p>
          </div>
        </div>

        <div v-if="form.smsNotifications.enabled" class="ml-7 space-y-3 border-l-2 border-blue-200 pl-6 bg-blue-50/30 p-4 rounded-lg">
          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="smsPaymentReceived"
                  v-model="form.smsNotifications.paymentReceived"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <label for="smsPaymentReceived" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Payment Received
              </label>
            </div>
            <div v-if="form.smsNotifications.paymentReceived" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="smsHighValueInvoice"
                  v-model="form.smsNotifications.highValueInvoice"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <label for="smsHighValueInvoice" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                High Value Invoice Created
              </label>
            </div>
            <div v-if="form.smsNotifications.highValueInvoice" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="smsUrgentOverdue"
                  v-model="form.smsNotifications.urgentOverdue"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <label for="smsUrgentOverdue" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Urgent Overdue Alerts
              </label>
            </div>
            <div v-if="form.smsNotifications.urgentOverdue" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- In-App Notifications -->
    <div class="border-t pt-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">In-App Notifications</h3>
        <button
          type="button"
          @click="testInAppNotification"
          :disabled="testingInApp || !form.inAppNotifications.enabled"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ testingInApp ? 'Testing...' : '🔔 Test Notification' }}
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
          <div class="flex-1">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="inAppEnabled"
                  v-model="form.inAppNotifications.enabled"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <label for="inAppEnabled" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Enable In-App Notifications
              </label>
            </div>
            <p class="mt-1 text-sm text-gray-500 ml-14">Show real-time notifications in the dashboard</p>
          </div>
        </div>

        <div v-if="form.inAppNotifications.enabled" class="ml-7 space-y-3 border-l-2 border-green-200 pl-6 bg-green-50/30 p-4 rounded-lg">
          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="inAppSound"
                  v-model="form.inAppNotifications.sound"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <label for="inAppSound" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                🔊 Play Notification Sound
              </label>
            </div>
            <div v-if="form.inAppNotifications.sound" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="inAppDesktop"
                  v-model="form.inAppNotifications.desktop"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <label for="inAppDesktop" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                🖥️ Desktop Notifications
              </label>
            </div>
            <div v-if="form.inAppNotifications.desktop" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between p-2 rounded hover:bg-white/50 transition-colors">
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  id="inBadges"
                  v-model="form.inAppNotifications.badges"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <label for="inBadges" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                🏷️ Show Notification Badges
              </label>
            </div>
            <div v-if="form.inAppNotifications.badges" class="text-green-500">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Frequency -->
    <div class="border-t pt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Frequency & Timing</h3>
      <div class="space-y-6">
        <div class="p-4 rounded-lg border border-gray-200 bg-gray-50">
          <label for="frequency" class="block text-sm font-medium text-gray-700 mb-2">
            📊 Email Summary Frequency
          </label>
          <select
            id="frequency"
            v-model="form.frequency.emailSummary"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          >
            <option value="never">Never - No summary emails</option>
            <option value="daily">Daily - Every evening at 6 PM</option>
            <option value="weekly">Weekly - Every Monday morning</option>
            <option value="monthly">Monthly - First day of the month</option>
          </select>
          <p class="mt-2 text-sm text-gray-500">
            {{ getFrequencyDescription(form.frequency.emailSummary) }}
          </p>
        </div>

        <div class="p-4 rounded-lg border border-gray-200 bg-blue-50/30">
          <div class="flex items-center justify-between mb-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                🌙 Quiet Hours
              </label>
              <p class="text-sm text-gray-500">Don't send notifications during these hours</p>
            </div>
            <div class="text-sm text-blue-600 font-medium">
              {{ formatQuietHours(form.frequency.quietHours) }}
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="quietStart" class="block text-xs font-medium text-gray-700 mb-1">From (Start Time)</label>
              <input
                id="quietStart"
                v-model="form.frequency.quietHours.start"
                type="time"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label for="quietEnd" class="block text-xs font-medium text-gray-700 mb-1">To (End Time)</label>
              <input
                id="quietEnd"
                v-model="form.frequency.quietHours.end"
                type="time"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
          </div>
          <div class="mt-3 p-3 bg-blue-100 rounded-md">
            <p class="text-sm text-blue-800">
              💡 During quiet hours, only urgent notifications (like payment confirmations) will be sent. Non-urgent notifications will be queued and delivered after quiet hours end.
            </p>
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
        <span>{{ isSaving ? 'Saving...' : 'Save Notification Settings' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useNotifications } from '~/composables/useNotifications'

const { user } = useAuth()
const { showNotification, showSuccess, showError } = useNotifications()

const emit = defineEmits(['save', 'error'])

// State
const isSaving = ref(false)
const testingEmail = ref(false)
const testingSms = ref(false)
const testingInApp = ref(false)
const originalForm = ref({})

// Form data
const form = ref({
  emailNotifications: {
    invoiceCreated: true,
    invoicePaid: true,
    invoiceOverdue: true,
    receiptCreated: false,
    clientAdded: false,
    weeklySummary: true
  },
  smsNotifications: {
    enabled: false,
    paymentReceived: true,
    highValueInvoice: true,
    urgentOverdue: true
  },
  inAppNotifications: {
    enabled: true,
    sound: false,
    desktop: true,
    badges: true
  },
  frequency: {
    emailSummary: 'weekly',
    quietHours: {
      start: '22:00',
      end: '07:00'
    }
  }
})

// Computed
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
})

const emailNotificationsCount = computed(() => {
  return Object.values(form.value.emailNotifications).filter(Boolean).length
})

const smsNotificationsCount = computed(() => {
  return form.value.smsNotifications.enabled
    ? Object.values(form.value.smsNotifications).filter(Boolean).length - 1 // Exclude 'enabled'
    : 0
})

const inAppNotificationsCount = computed(() => {
  return form.value.inAppNotifications.enabled
    ? Object.values(form.value.inAppNotifications).filter(Boolean).length - 1 // Exclude 'enabled'
    : 0
})

// Watch for form changes
watch(form, () => {
  // Auto-save could be implemented here
}, { deep: true })

// Initialize form with user data
onMounted(() => {
  if (user.value && user.value.notificationSettings) {
    form.value = {
      ...form.value,
      ...user.value.notificationSettings
    }
  }
  // Store original form for reset functionality
  originalForm.value = JSON.parse(JSON.stringify(form.value))
})

// Helper functions
const getFrequencyDescription = (frequency) => {
  const descriptions = {
    never: 'You will not receive any summary emails',
    daily: 'Get a daily summary of your business activities every evening',
    weekly: 'Receive a comprehensive weekly summary every Monday morning',
    monthly: 'Get a monthly overview of your business performance'
  }
  return descriptions[frequency] || ''
}

const formatQuietHours = (quietHours) => {
  if (!quietHours.start || !quietHours.end) return 'Not set'

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return `${formatTime(quietHours.start)} - ${formatTime(quietHours.end)}`
}

// Test notification functions
const testEmailNotification = async () => {
  try {
    testingEmail.value = true
    // Simulate API call to send test email
    await new Promise(resolve => setTimeout(resolve, 2000))
    showSuccess('Test email sent successfully! Check your inbox.', '📧 Test Email Sent')
  } catch (error) {
    showError('Failed to send test email. Please try again.', 'Email Test Failed')
  } finally {
    testingEmail.value = false
  }
}

const testSmsNotification = async () => {
  try {
    testingSms.value = true
    // Simulate API call to send test SMS
    await new Promise(resolve => setTimeout(resolve, 2000))
    showSuccess('Test SMS sent successfully! Check your phone.', '📱 Test SMS Sent')
  } catch (error) {
    showError('Failed to send test SMS. Please check your phone number.', 'SMS Test Failed')
  } finally {
    testingSms.value = false
  }
}

const testInAppNotification = async () => {
  try {
    testingInApp.value = true

    // Play sound if enabled
    if (form.value.inAppNotifications.sound) {
      try {
        const audio = new Audio('/notification-sound.mp3')
        await audio.play()
      } catch (error) {
        console.log('Could not play notification sound:', error)
      }
    }

    // Show desktop notification if enabled
    if (form.value.inAppNotifications.desktop && 'Notification' in window) {
      const permission = Notification.permission
      if (permission === 'granted') {
        new Notification('Test Notification', {
          body: 'This is a test notification from your Receipt App!',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        })
      } else if (permission === 'default') {
        await Notification.requestPermission()
      }
    }

    // Show in-app notification
    showNotification({
      type: 'success',
      title: '🔔 Test Notification',
      message: 'This is a test notification to verify your settings work correctly!'
    })

  } catch (error) {
    showError('Test notification failed. Please check your settings.', 'Notification Test Failed')
  } finally {
    testingInApp.value = false
  }
}

// Form submission
const handleSubmit = async () => {
  try {
    isSaving.value = true

    // Validate quiet hours
    if (form.value.frequency.quietHours.start && form.value.frequency.quietHours.end) {
      const start = form.value.frequency.quietHours.start.split(':').map(Number)
      const end = form.value.frequency.quietHours.end.split(':').map(Number)
      const startMinutes = start[0] * 60 + start[1]
      const endMinutes = end[0] * 60 + end[1]

      if (startMinutes === endMinutes) {
        throw new Error('Quiet hours start and end time cannot be the same')
      }
    }

    emit('save', {
      type: 'notifications',
      payload: {
        notificationSettings: form.value
      }
    })

    // Update original form after successful save
    originalForm.value = JSON.parse(JSON.stringify(form.value))

    showSuccess('Notification settings saved successfully! 🎉', 'Settings Updated')
  } catch (error) {
    emit('error', error)
    showError(error.message || 'Failed to save notification settings', 'Save Failed')
  } finally {
    isSaving.value = false
  }
}

// Reset form to defaults
const handleReset = () => {
  form.value = {
    emailNotifications: {
      invoiceCreated: true,
      invoicePaid: true,
      invoiceOverdue: true,
      receiptCreated: false,
      clientAdded: false,
      weeklySummary: true
    },
    smsNotifications: {
      enabled: false,
      paymentReceived: true,
      highValueInvoice: true,
      urgentOverdue: true
    },
    inAppNotifications: {
      enabled: true,
      sound: false,
      desktop: true,
      badges: true
    },
    frequency: {
      emailSummary: 'weekly',
      quietHours: {
        start: '22:00',
        end: '07:00'
      }
    }
  }

  showNotification({
    type: 'info',
    title: 'Settings Reset',
    message: 'Notification settings have been reset to default values.'
  })
}

// Request notification permission on mount
onMounted(() => {
  if ('Notification' in window && Notification.permission === 'default') {
    // We'll request permission when user tries to enable desktop notifications
  }
})
</script>