<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XIcon,
} from 'lucide-vue-next'

const props = defineProps({
  toasts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['removeToast'])

const removeToast = (id) => {
  emit('removeToast', id)
}

const toastClasses = (toast) => {
  const baseClasses = 'border-l-4'

  switch (toast.type) {
    case 'success':
      return `${baseClasses} border-green-400`
    case 'error':
      return `${baseClasses} border-red-400`
    case 'warning':
      return `${baseClasses} border-yellow-400`
    case 'info':
      return `${baseClasses} border-blue-400`
    default:
      return baseClasses
  }
}

const toastIcon = (toast) => {
  switch (toast.type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return XCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    case 'info':
      return InformationCircleIcon
    default:
      return InformationCircleIcon
  }
}

const iconClass = (toast) => {
  switch (toast.type) {
    case 'success':
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
}

const progressBarClass = (toast) => {
  switch (toast.type) {
    case 'success':
      return 'bg-green-400'
    case 'error':
      return 'bg-red-400'
    case 'warning':
      return 'bg-yellow-400'
    case 'info':
      return 'bg-blue-400'
    default:
      return 'bg-gray-400'
  }
}

// Animation progress for toasts with duration
let intervalId

const updateProgress = () => {
  props.toasts.forEach((toast) => {
    if (toast.duration && toast.duration > 0 && toast.percentage !== undefined) {
      // Update percentage logic would be handled by the parent composable
    }
  })
}

onMounted(() => {
  intervalId = setInterval(updateProgress, 100)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <Transition
        v-for="toast in toasts"
        :key="toast.id"
        name="toast"
        appear
      >
        <div
          :class="toastClasses(toast)"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="toastIcon(toast)"
                  :size="20"
                  :class="iconClass(toast)"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ toast.title }}
                </p>
                <p v-if="toast.description" class="mt-1 text-sm text-gray-500">
                  {{ toast.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeToast(toast.id)"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span class="sr-only">Close</span>
                  <XIcon :size="20" />
                </button>
              </div>
            </div>
          </div>
          <!-- Progress bar -->
          <div
            v-if="toast.duration && toast.duration > 0"
            class="h-1 bg-gray-200"
          >
            <div
              :class="progressBarClass(toast)"
              class="h-full transition-all ease-linear"
              :style="{
                width: toast.percentage ? `${toast.percentage}%` : '100%',
                transitionDuration: toast.duration ? `${toast.duration}ms` : '300ms'
              }"
            />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
/* Toast transitions */
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>