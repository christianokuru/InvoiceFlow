<script setup>
import { computed, watch } from 'vue'
import Modal from '../../ui/Modal.vue'
import InvoiceForm from './InvoiceForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  invoice: {
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
  return props.invoice ? 'Edit Invoice' : 'Create New Invoice'
})

// Generate invoice number
const generateInvoiceNumber = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `INV-${year}-${month}-${random}`
}

// Get today's date
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

const handleSubmit = (formData) => {
  emit('submit', {
    ...formData,
    number: props.invoice?.number || generateInvoiceNumber(),
    date: props.invoice?.date || getTodayDate(),
    dueDate: props.invoice?.dueDate || calculateDueDate()
  })
}

const handleClose = () => {
  emit('update:isOpen', false)
  emit('close')
}

const calculateDueDate = () => {
  const today = new Date()
  const dueDate = new Date(today.setMonth(today.getMonth() + 1))
  return dueDate.toISOString().split('T')[0]
}
</script>

<template>
  <Modal
    :is-open="isOpen"
    @update:isOpen="(value) => emit('update:isOpen', value)"
    :title="title"
    @close="handleClose"
  >
    <InvoiceForm
      :invoice="invoice"
      :loading="loading"
      :generated-invoice-number="generateInvoiceNumber()"
      :generated-date="getTodayDate()"
      @submit="handleSubmit"
      @cancel="handleClose"
    />
  </Modal>
</template>