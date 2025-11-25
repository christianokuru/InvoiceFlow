<template>
  <div>
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Dashboard Home</h1>
      <p class="text-gray-600">If you can see this page with the sidebar and navbar, the dashboard layout is working!</p>
      <div class="mt-4 p-4 bg-blue-50 rounded">
        <p class="text-blue-800">Test content to verify dashboard layout is applied correctly.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// TODO: Implement dashboard home page
</script>