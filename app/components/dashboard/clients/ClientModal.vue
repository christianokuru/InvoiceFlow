<!-- components/dashboard/clients/ClientModal.vue -->
<script setup>
import { XIcon } from 'lucide-vue-next'
import ClientForm from './ClientForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  client: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const handleClose = () => {
  if (!props.loading) {
    emit('close')
  }
}

const handleSubmit = (formData) => {
  emit('submit', formData)
}

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen && !props.loading) {
      handleClose()
    }
  }
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="handleClose"
        />

        <!-- Modal Content -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden mx-4">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ client ? 'Edit Client' : 'Add New Client' }}
            </h2>
            <button
              @click="handleClose"
              :disabled="loading"
              class="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XIcon :size="24" />
            </button>
          </div>

          <!-- Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-80px)] p-6 pb-6">
            <ClientForm
              :client="client"
              :loading="loading"
              @submit="handleSubmit"
              @cancel="handleClose"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .relative {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to .relative {
  transform: scale(0.95) translateY(-20px);
}
</style>