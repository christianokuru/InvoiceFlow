<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:isOpen', 'close'])

const modalContent = ref(null)
const firstFocusableElement = ref(null)

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
}

const trapFocus = (event) => {
  if (!props.isOpen || !modalContent.value) return

  const focusableElements = modalContent.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.isOpen) {
    closeModal()
  }
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget && props.closeOnBackdrop) {
    closeModal()
  }
}

// Focus management
const focusFirstElement = () => {
  nextTick(() => {
    if (firstFocusableElement.value) {
      firstFocusableElement.value.focus()
    } else {
      const firstInput = modalContent.value?.querySelector('input, textarea, select, button')
      firstInput?.focus()
    }
  })
}

// Prevent body scroll when modal is open
const preventBodyScroll = () => {
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Watch for modal open/close
watch(() => props.isOpen, (newValue) => {
  preventBodyScroll()
  if (newValue) {
    nextTick(() => {
      focusFirstElement()
    })
  }
})

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  preventBodyScroll()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="modal" appear>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <!-- Simple Backdrop -->
      <div class="absolute inset-0 bg-black/50" />

      <!-- Modal Content -->
      <div
        ref="modalContent"
        :class="[
          'relative bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-hidden border border-gray-200',
          'transform transition-all duration-200 ease-out',
          {
            'max-w-md': size === 'sm',
            'max-w-lg': size === 'md',
            'max-w-2xl': size === 'lg',
            'max-w-4xl': size === 'xl'
          }
        ]"
        @keydown.tab="trapFocus"
      >
        <!-- Header -->
        <div v-if="title || $slots.header" class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 v-if="title" class="text-xl font-semibold text-gray-900">
              {{ title }}
            </h2>
            <slot name="header" />
          </div>
          <button
            ref="firstFocusableElement"
            @click="closeModal"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
            type="button"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content Area -->
        <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div class="px-6 py-4">
            <slot />
          </div>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Simple modal animations */
.modal-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.modal-leave-active {
  transition: opacity 0.15s ease-in, transform 0.15s ease-in;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.99);
}

/* Simple scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>