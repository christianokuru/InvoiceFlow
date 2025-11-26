<script setup>
import { computed } from 'vue'
import Modal from '../../ui/Modal.vue'
import ReceiptForm from './ReceiptForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  receipt: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isOpen', 'close', 'submit'])

const title = computed(() => {
  return props.receipt ? 'Edit Receipt' : 'Generate New Receipt'
})

// Generate receipt number
const generateReceiptNumber = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `REC-${year}-${month}-${random}`
}

// Get today's date
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

const handleSubmit = (formData) => {
  emit('submit', {
    ...formData,
    number: props.receipt?.number || generateReceiptNumber(),
    date: props.receipt?.date || getTodayDate()
  })
}

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>

<template>
  <Modal
    :is-open="isOpen"
    @update:isOpen="(value) => emit('update:isOpen', value)"
    :title="title"
    @close="handleClose"
  >
    <ReceiptForm
      :receipt="receipt"
      :loading="loading"
      :generated-receipt-number="generateReceiptNumber()"
      :generated-date="getTodayDate()"
      @submit="handleSubmit"
      @cancel="handleClose"
    />
  </Modal>
</template>