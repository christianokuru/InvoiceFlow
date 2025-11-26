<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1
  },
  totalItems: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0
  },
  pageSize: {
    type: Number,
    default: 10,
    validator: (value) => value >= 1
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
    validator: (value) => value >= 3
  },
  showInfo: {
    type: Boolean,
    default: true
  },
  showPageSize: {
    type: Boolean,
    default: false
  },
  showFirstLast: {
    type: Boolean,
    default: false
  },
  pageSizeOptions: {
    type: Array,
    default: () => [10, 25, 50, 100]
  }
})

defineEmits(['page-change', 'prev-page', 'next-page', 'page-size-change'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.pageSize)
})

const startIndex = computed(() => {
  return (props.currentPage - 1) * props.pageSize
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + props.pageSize, props.totalItems)
})

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisiblePages / 2)

  if (totalPages.value <= props.maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
    return pages
  }

  // Always include first page
  pages.push(1)

  // Calculate range around current page
  let start = Math.max(2, props.currentPage - half)
  let end = Math.min(totalPages.value - 1, props.currentPage + half)

  // Adjust if we're too close to the beginning
  if (start === 2) {
    end = Math.min(totalPages.value - 1, props.maxVisiblePages - 1)
  }

  // Adjust if we're too close to the end
  if (end === totalPages.value - 1) {
    start = Math.max(2, totalPages.value - props.maxVisiblePages + 2)
  }

  // Add ellipsis if needed
  if (start > 2) {
    pages.push('...')
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Add ellipsis if needed
  if (end < totalPages.value - 1) {
    pages.push('...')
  }

  // Always include last page if it's different from first
  if (totalPages.value > 1) {
    pages.push(totalPages.value)
  }

  return pages
})
</script>

<template>
  <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <!-- Mobile pagination -->
    <div class="flex-1 flex justify-between sm:hidden">
      <Button
        variant="secondary"
        size="sm"
        @click="$emit('prev-page')"
        :disabled="currentPage === 1"
      >
        Previous
      </Button>
      <Button
        variant="secondary"
        size="sm"
        @click="$emit('next-page')"
        :disabled="currentPage === totalPages"
      >
        Next
      </Button>
    </div>

    <!-- Desktop pagination -->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <!-- Results info -->
      <div v-if="showInfo">
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ startIndex + 1 }}</span>
          to
          <span class="font-medium">{{ endIndex }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>

      <!-- Page size selector -->
      <div v-if="showPageSize" class="flex items-center space-x-2">
        <label for="page-size" class="text-sm text-gray-700">
          Show
        </label>
        <select
          id="page-size"
          :value="pageSize"
          @change="$emit('page-size-change', parseInt($event.target.value))"
          class="rounded-md py-1 pl-3 pr-8 text-sm border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <span class="text-sm text-gray-700">items</span>
      </div>

      <!-- Page navigation -->
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- First page -->
          <button
            v-if="showFirstLast"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('page-change', 1)"
            :disabled="currentPage === 1"
          >
            <span class="sr-only">First page</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
              <path d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </svg>
          </button>

          <!-- Previous page -->
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'rounded-l-md': !showFirstLast }"
            @click="$emit('prev-page')"
            :disabled="currentPage === 1"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Page numbers -->
          <template v-if="totalPages <= maxVisiblePages">
            <!-- Show all pages if total pages is less than max visible -->
            <button
              v-for="page in totalPages"
              :key="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              :class="page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
              @click="$emit('page-change', page)"
            >
              {{ page }}
            </button>
          </template>

          <template v-else>
            <!-- Complex pagination with ellipsis -->
            <button
              v-for="page in visiblePages"
              :key="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              :class="{
                'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage && typeof page === 'number',
                'bg-white border-gray-300 text-gray-700 cursor-default': page === '...',
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== '...' && typeof page === 'number'
              }"
              @click="typeof page === 'number' ? $emit('page-change', page) : null"
              :disabled="page === '...'"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next page -->
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'rounded-r-md': !showFirstLast }"
            @click="$emit('next-page')"
            :disabled="currentPage === totalPages"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Last page -->
          <button
            v-if="showFirstLast"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('page-change', totalPages)"
            :disabled="currentPage === totalPages"
          >
            <span class="sr-only">Last page</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              <path d="M11.293 14.707a1 1 0 010-1.414L14.586 10 11.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>