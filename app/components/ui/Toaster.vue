<!-- app/components/ui/Toaster.vue  -->
<script setup>
import {
  CheckCircle,
  TriangleAlert,
  XCircle,
  Info,
  X,
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

// DRY configuration object for toast types
const toastConfig = {
  success: {
    borderClass: 'border-green-400',
    iconClass: 'text-green-400',
    progressClass: 'bg-green-400',
    icon: CheckCircle
  },
  error: {
    borderClass: 'border-red-400',
    iconClass: 'text-red-400',
    progressClass: 'bg-red-400',
    icon: XCircle
  },
  warning: {
    borderClass: 'border-yellow-400',
    iconClass: 'text-yellow-400',
    progressClass: 'bg-yellow-400',
    icon: TriangleAlert
  },
  info: {
    borderClass: 'border-blue-400',
    iconClass: 'text-blue-400',
    progressClass: 'bg-blue-400',
    icon: Info
  },
  default: {
    borderClass: 'border-gray-400',
    iconClass: 'text-gray-400',
    progressClass: 'bg-gray-400',
    icon: Info
  }
}

const getToastConfig = (type) => {
  return toastConfig[type] || toastConfig.default
}

const toastClasses = (toast) => {
  const config = getToastConfig(toast.type)
  return `border-l-4 ${config.borderClass}`
}

const toastIcon = (toast) => {
  const config = getToastConfig(toast.type)
  return config.icon
}

const iconClass = (toast) => {
  const config = getToastConfig(toast.type)
  return config.iconClass
}

const progressBarClass = (toast) => {
  const config = getToastConfig(toast.type)
  return config.progressClass
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-50 space-y-2 min-w-[320px] max-w-md">
      <TransitionGroup name="toast" appear>
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast)"
          class="w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
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
              <div class="ml-3 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ toast.title }}
                </p>
                <p v-if="toast.description" class="mt-1 text-sm text-gray-500">
                  {{ toast.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  @click="removeToast(toast.id)"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span class="sr-only">Close</span>
                  <X :size="20" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="toast.duration && toast.duration > 0"
            class="h-1 bg-gray-200"
          >
            <div
              :class="progressBarClass(toast)"
              class="h-full ease-linear"
              :style="{
                width: `${toast.percentage ?? 100}%`
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
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