<!-- app/app.vue -->
<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster :toasts="toasts" @remove-toast="removeToast" />
  </div>
</template>

<script setup>
import { useToaster } from '~/composables/useToaster'

// Get the toaster composable to manage toasts globally
const { toasts, removeToast } = useToaster()
import Toaster from '~/components/ui/Toaster.vue';
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
