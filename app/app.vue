<!-- app/app.vue -->
<template>
  <div id="app">
    <NuxtLayout>
      <PageTransition @transition-start="handleTransitionStart" @transition-end="handleTransitionEnd">
        <NuxtPage />
      </PageTransition>
    </NuxtLayout>
    <Toaster :toasts="toasts" @remove-toast="removeToast" />
  </div>
</template>

<script setup>
import { useToaster } from '~/composables/useToaster'
import { useAccessibility } from '~/composables/useAccessibility'
import { useMobileUX } from '~/composables/useMobileUX'

// Get the toaster composable to manage toasts globally
const { toasts, removeToast } = useToaster()

// Initialize accessibility features
const accessibility = useAccessibility()

// Initialize mobile UX enhancements
const mobileUX = useMobileUX()

import Toaster from '~/components/ui/Toaster.vue'
import PageTransition from '~/components/ui/PageTransition.vue'

// Page transition handlers
const handleTransitionStart = (type) => {
  accessibility.announceToScreenReader(`Page transition ${type} started`, 'polite')
}

const handleTransitionEnd = (type) => {
  accessibility.announceToScreenReader(`Page transition ${type} completed`, 'polite')
}

// Pull to refresh functionality for mobile
const handlePullToRefresh = () => {
  mobileUX.triggerHapticFeedback('medium')
  accessibility.announceToScreenReader('Refreshing page...', 'assertive')

  // Reload current page
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

// Initialize pull to refresh on mobile
onMounted(() => {
  if (mobileUX.isMobile.value) {
    mobileUX.enablePullToRefresh(handlePullToRefresh)
  }
})
</script>

<style>
/* Global styles for the app */
html,
body {
  @apply h-full;
}

#app {
  @apply h-full;
}

/* Custom animations */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
