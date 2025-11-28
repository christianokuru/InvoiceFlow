<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { SendIcon, MailIcon, PaperclipIcon } from 'lucide-vue-next'
import DocumentSelector from '~/components/dashboard/shared/DocumentSelector.vue'
import ClientSelector from '~/components/dashboard/shared/ClientSelector.vue'
const RichTextEditor = defineAsyncComponent(() => import('~/components/ui/RichTextEditor.vue'))

// Page metadata
definePageMeta({
  layout: 'dashboard',
  title: 'Send Documents'
})

// Mock data - same as React UI for consistency
const mockDocuments = ref([
  {
    id: '1',
    type: 'Invoice',
    number: 'INV-2024-001',
    client: 'Acme Corp',
    amount: 2500,
    date: '2024-01-15'
  },
  {
    id: '2',
    type: 'Invoice',
    number: 'INV-2024-002',
    client: 'TechStart Inc',
    amount: 1800,
    date: '2024-01-20'
  },
  {
    id: '3',
    type: 'Receipt',
    number: 'REC-2024-001',
    client: 'Global Solutions',
    amount: 3200,
    date: '2024-01-22'
  },
  {
    id: '4',
    type: 'Invoice',
    number: 'INV-2024-003',
    client: 'Design Studio',
    amount: 1500,
    date: '2024-01-25'
  },
  {
    id: '5',
    type: 'Receipt',
    number: 'REC-2024-002',
    client: 'Marketing Pro',
    amount: 2100,
    date: '2024-01-28'
  }
])

const mockClients = ref([
  {
    id: '1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    status: 'active',
    totalInvoices: 12,
    totalAmount: 28500
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'hello@techstart.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    status: 'active',
    totalInvoices: 8,
    totalAmount: 15200
  },
  {
    id: '3',
    name: 'Global Solutions',
    email: 'info@global.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    status: 'active',
    totalInvoices: 15,
    totalAmount: 42000
  },
  {
    id: '4',
    name: 'Design Studio',
    email: 'team@design.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    status: 'inactive',
    totalInvoices: 6,
    totalAmount: 9800
  },
  {
    id: '5',
    name: 'Marketing Pro',
    email: 'contact@marketing.com',
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
    status: 'active',
    totalInvoices: 10,
    totalAmount: 22100
  }
])

// Form state
const selectedDocumentId = ref('')
const selectedClientIds = ref([])
const emailSubject = ref('')
const emailMessage = ref('')
const selectedDocument = ref(null)
const isSending = ref(false)
const sendResult = ref(null)

// Email templates
const emailTemplates = ref([
  {
    id: 'invoice-template',
    name: 'Invoice Notification',
    subject: 'Invoice {{invoiceNumber}} from {{companyName}}',
    message: `<p>Dear {{clientName}},</p>
<p>Please find attached invoice {{invoiceNumber}} for {{description}}.</p>
<p>Amount due: <strong>\${{amount}}</strong></p>
<p>Due date: {{dueDate}}</p>
<p>Thank you for your business!</p>
<p>Best regards,<br>{{companyName}}</p>`
  },
  {
    id: 'receipt-template',
    name: 'Receipt Confirmation',
    subject: 'Receipt {{receiptNumber}} for {{description}}',
    message: `<p>Dear {{clientName}},</p>
<p>Thank you for your payment. Please find attached receipt {{receiptNumber}}.</p>
<p>Amount paid: <strong>\${{amount}}</strong></p>
<p>Payment date: {{paymentDate}}</p>
<p>We appreciate your business!</p>
<p>Best regards,<br>{{companyName}}</p>`
  },
  {
    id: 'reminder-template',
    name: 'Payment Reminder',
    subject: 'Reminder: Invoice {{invoiceNumber}} is due soon',
    message: `<p>Dear {{clientName}},</p>
<p>This is a friendly reminder that invoice {{invoiceNumber}} is due on {{dueDate}}.</p>
<p>Amount due: <strong>\${{amount}}</strong></p>
<p>If you have already made the payment, please disregard this message.</p>
<p>Best regards,<br>{{companyName}}</p>`
  }
])

const selectedTemplate = ref('')

// Handle document selection
const handleDocumentSelected = (document) => {
  selectedDocument.value = document

  // Auto-populate subject based on document type
  if (document.type.toLowerCase() === 'invoice') {
    emailSubject.value = `Invoice ${document.number} from Your Company`
    // Select invoice template if available
    const invoiceTemplate = emailTemplates.value.find(t => t.id === 'invoice-template')
    if (invoiceTemplate) {
      selectedTemplate.value = invoiceTemplate.id
      emailMessage.value = invoiceTemplate.message
        .replace('{{invoiceNumber}}', document.number)
        .replace('{{clientName}}', document.client)
        .replace('{{amount}}', document.amount.toLocaleString())
        .replace('{{dueDate}}', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString())
        .replace('{{description}}', 'services rendered')
        .replace('{{companyName}}', 'Your Company')
    }
  } else if (document.type.toLowerCase() === 'receipt') {
    emailSubject.value = `Receipt ${document.number} for payment`
    // Select receipt template if available
    const receiptTemplate = emailTemplates.value.find(t => t.id === 'receipt-template')
    if (receiptTemplate) {
      selectedTemplate.value = receiptTemplate.id
      emailMessage.value = receiptTemplate.message
        .replace('{{receiptNumber}}', document.number)
        .replace('{{clientName}}', document.client)
        .replace('{{amount}}', document.amount.toLocaleString())
        .replace('{{paymentDate}}', new Date().toLocaleDateString())
        .replace('{{companyName}}', 'Your Company')
    }
  }
}

// Handle template selection
const handleTemplateChange = (templateId) => {
  const template = emailTemplates.value.find(t => t.id === templateId)
  if (template) {
    emailSubject.value = template.subject
      .replace('{{companyName}}', 'Your Company')
      .replace('{{invoiceNumber}}', selectedDocument.value?.number || '')
      .replace('{{receiptNumber}}', selectedDocument.value?.number || '')

    if (selectedDocument.value) {
      emailMessage.value = template.message
        .replace('{{clientName}}', selectedDocument.value.client)
        .replace('{{amount}}', selectedDocument.value.amount.toLocaleString())
        .replace('{{invoiceNumber}}', selectedDocument.value.number)
        .replace('{{receiptNumber}}', selectedDocument.value.number)
        .replace('{{dueDate}}', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString())
        .replace('{{paymentDate}}', new Date().toLocaleDateString())
        .replace('{{description}}', 'services rendered')
        .replace('{{companyName}}', 'Your Company')
    } else {
      emailMessage.value = template.message
        .replace('{{clientName}}', 'Client Name')
        .replace('{{amount}}', '0.00')
        .replace('{{invoiceNumber}}', 'INV-000')
        .replace('{{receiptNumber}}', 'REC-000')
        .replace('{{dueDate}}', new Date().toLocaleDateString())
        .replace('{{paymentDate}}', new Date().toLocaleDateString())
        .replace('{{description}}', 'services/products')
        .replace('{{companyName}}', 'Your Company')
    }
  }
}

// Send documents
const sendDocuments = async () => {
  if (!selectedDocumentId.value || selectedClientIds.value.length === 0) {
    alert('Please select a document and at least one client')
    return
  }

  if (!emailSubject.value || !emailMessage.value) {
    alert('Please fill in both subject and message')
    return
  }

  isSending.value = true
  sendResult.value = null

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const selectedClients = mockClients.value.filter(client =>
      selectedClientIds.value.includes(client.id)
    )

    sendResult.value = {
      success: true,
      message: `Successfully sent ${selectedDocument.value.type} ${selectedDocument.value.number} to ${selectedClientIds.value.length} client(s)`,
      details: {
        document: selectedDocument.value,
        clients: selectedClients,
        timestamp: new Date().toISOString()
      }
    }

    // Reset form after successful send
    selectedDocumentId.value = ''
    selectedClientIds.value = []
    emailSubject.value = ''
    emailMessage.value = ''
    selectedDocument.value = null
    selectedTemplate.value = ''

  } catch (error) {
    sendResult.value = {
      success: false,
      message: 'Failed to send documents. Please try again.',
      error: error.message
    }
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Send Documents</h1>
      <p class="mt-1 text-sm text-gray-500">
        Email invoices and receipts to your clients
      </p>
    </div>

    <!-- Send Result Alert -->
    <div
      v-if="sendResult"
      class="p-4 rounded-lg"
      :class="{
        'bg-green-50 border border-green-200': sendResult.success,
        'bg-red-50 border border-red-200': !sendResult.success
      }"
    >
      <div class="flex items-center">
        <div class="flex-1">
          <p
            class="text-sm font-medium"
            :class="{
              'text-green-800': sendResult.success,
              'text-red-800': !sendResult.success
            }"
          >
            {{ sendResult.message }}
          </p>
          <div v-if="sendResult.success && sendResult.details && sendResult.details.clients" class="mt-2 text-sm text-green-700">
            <p>Sent to: {{ sendResult.details.clients.map(c => c.email).join(', ') }}</p>
          </div>
        </div>
        <button
          @click="sendResult = null"
          class="ml-3 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Document and Email Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Document Selection -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <PaperclipIcon :size="20" class="mr-2 text-blue-600" />
            Select Document
          </h3>
          <DocumentSelector
            v-model="selectedDocumentId"
            :documents="mockDocuments"
            :show-type-separation="true"
            @document-selected="handleDocumentSelected"
          />
        </div>

        <!-- Email Template Selection -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MailIcon :size="20" class="mr-2 text-blue-600" />
            Email Template
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Template
              </label>
              <select
                v-model="selectedTemplate"
                @change="handleTemplateChange(selectedTemplate)"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Custom message</option>
                <option
                  v-for="template in emailTemplates"
                  :key="template.id"
                  :value="template.id"
                >
                  {{ template.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                v-model="emailSubject"
                type="text"
                placeholder="Enter email subject..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <ClientOnly>
                <RichTextEditor
                  v-model="emailMessage"
                  placeholder="Compose your email message..."
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Client Selection -->
      <div class="space-y-6">
        <!-- Client Selection -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Select Recipients
          </h3>
          <ClientSelector
            v-model="selectedClientIds"
            :clients="mockClients"
            :show-select-all="true"
          />
        </div>

        <!-- Send Button -->
        <div v-if="selectedClientIds.length > 0" class="bg-blue-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-blue-900">
                {{ selectedClientIds.length }} recipient{{ selectedClientIds.length !== 1 ? 's' : '' }} selected
              </p>
              <p class="text-xs text-blue-700 mt-1">
                {{ selectedDocumentId ? 'Document selected' : 'No document selected' }}
              </p>
            </div>
          </div>
          <button
            @click="sendDocuments"
            :disabled="isSending || !selectedDocumentId || selectedClientIds.length === 0"
            class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon v-if="!isSending" :size="20" class="mr-2" />
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSending ? 'Sending...' : 'Send Email' }}
          </button>
        </div>

        <!-- Send Instructions -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Quick Tips</h4>
          <ul class="text-xs text-gray-600 space-y-1">
            <li>• Select a document to attach to the email</li>
            <li>• Choose recipients from your client list</li>
            <li>• Use templates for consistent messaging</li>
            <li>• Rich text formatting is supported</li>
            <li>• Documents will be sent as PDF attachments</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>