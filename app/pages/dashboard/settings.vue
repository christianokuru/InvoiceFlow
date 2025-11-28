<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Settings</h1>
      <p class="mt-1 text-sm text-gray-500">
        Manage your account and business settings
      </p>
    </div>

    <!-- Settings Content -->
    <div class="bg-white rounded-lg shadow">
      <SettingsTabs
        :active-tab="activeTab"
        @tab-change="handleTabChange"
      />

      <div class="p-6">
        <transition name="tab" mode="out-in">
          <component
            :is="activeComponent"
            :key="activeTab"
            @save="handleSave"
            @error="handleError"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useNotifications } from '~/composables/useNotifications'

// Components
import SettingsTabs from '~/components/dashboard/settings/SettingsTabs.vue'
import AccountSettings from '~/components/dashboard/settings/AccountSettings.vue'
import BusinessSettings from '~/components/dashboard/settings/BusinessSettings.vue'
import NotificationSettings from '~/components/dashboard/settings/NotificationSettings.vue'
import AppearanceSettings from '~/components/dashboard/settings/AppearanceSettings.vue'

definePageMeta({
  layout: 'dashboard'
})

const { user, updateProfile, changePassword } = useAuth()
const { showNotification } = useNotifications()

const activeTab = ref('account')
const loading = ref(false)

// Tab components mapping
const components = {
  account: AccountSettings,
  business: BusinessSettings,
  notifications: NotificationSettings,
  appearance: AppearanceSettings
}

// Current active component
const activeComponent = computed(() => components[activeTab.value])

// Handle tab change
const handleTabChange = (tab) => {
  activeTab.value = tab
}

// Handle save from any settings component
const handleSave = async (data) => {
  try {
    loading.value = true

    if (data.type === 'profile') {
      await updateProfile(data.payload)
      showNotification('Profile updated successfully! 🎉', 'success')
    } else if (data.type === 'photo') {
      await updateProfile(data.payload)
      showNotification('Photo updated successfully! 📸', 'success')
    } else if (data.type === 'password') {
      await changePassword(data.payload)
      showNotification('Password changed successfully! 🔒', 'success')
    } else if (data.type === 'settings') {
      // Handle other settings updates
      await updateProfile(data.payload)
      showNotification('Settings updated successfully! ✨', 'success')
    }
  } catch (error) {
    showNotification(error.message || 'Failed to update settings', 'error')
  } finally {
    loading.value = false
  }
}

// Handle error from any settings component
const handleError = (error) => {
  showNotification(error.message || 'An error occurred', 'error')
}
</script>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: all 0.3s ease;
}

.tab-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.tab-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>