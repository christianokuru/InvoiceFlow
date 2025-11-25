<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">{{ error.statusCode }}</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ error.statusMessage }}</h2>
      <p class="text-gray-600 mb-8">{{ error.message }}</p>
      <button
        @click="handleError"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Go back home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>