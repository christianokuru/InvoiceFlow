<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <!-- Home/Root item -->
      <li>
        <div>
          <button
            @click="$emit('navigate', 'home')"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="sr-only">Home</span>
          </button>
        </div>
      </li>

      <!-- Breadcrumb items -->
      <li v-for="(item, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <!-- Separator -->
          <svg
            class="flex-shrink-0 h-5 w-5 text-gray-300 mx-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>

          <!-- Current item (not clickable) -->
          <span
            v-if="index === breadcrumbs.length - 1"
            class="text-sm font-medium text-gray-900"
          >
            {{ item.label }}
          </span>

          <!-- Clickable item -->
          <button
            v-else
            @click="$emit('navigate', item.path || item.label.toLowerCase())"
            class="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {{ item.label }}
          </button>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
  icon?: any
}

interface Props {
  breadcrumbs: BreadcrumbItem[]
}

defineProps<Props>()

defineEmits<{
  navigate: [path: string]
}>()
</script>