<script setup>
import ClientCard from './ClientCard.vue'

const props = defineProps({
  clients: {
    type: Array,
    required: true
  },
  onEdit: {
    type: Function,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Empty state component
const EmptyState = () => h('div', {
  class: 'text-center py-12'
}, [
  h('div', {
    class: 'text-gray-400 mb-4'
  }, [
    h('svg', {
      class: 'mx-auto h-12 w-12',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      })
    ])
  ]),
  h('h3', {
    class: 'text-lg font-medium text-gray-900 mb-2'
  }, 'No clients found'),
  h('p', {
    class: 'text-gray-500'
  }, 'Get started by adding your first client.')
])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
    <!-- Loading state -->
    <div v-if="loading && clients.length === 0" class="col-span-full">
      <div class="space-y-4">
        <div v-for="i in 4" :key="i" class="border border-gray-200 rounded-lg p-6">
          <div class="animate-pulse">
            <div class="flex items-start justify-between mb-4">
              <div class="space-y-2">
                <div class="h-6 bg-gray-200 rounded w-32"></div>
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div class="h-5 bg-gray-200 rounded w-5"></div>
            </div>
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div class="pt-4 border-t border-gray-200">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-12"></div>
                </div>
                <div>
                  <div class="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Client cards -->
    <ClientCard
      v-for="client in clients"
      :key="client.id"
      :client="client"
      :on-edit="onEdit"
    />

    <!-- Empty state -->
    <div v-if="!loading && clients.length === 0" class="col-span-full">
      <EmptyState />
    </div>
  </div>
</template>