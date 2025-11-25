<template>
  <aside
    class="bg-blue-600 text-white transition-all duration-300 flex flex-col"
    :class="expanded ? 'w-64' : 'w-20'"
  >
    <div class="flex items-center justify-between h-16 px-4 border-b border-blue-700">
      <template v-if="expanded">
        <span class="text-xl font-semibold whitespace-nowrap">
          InvoiceApp
        </span>
        <button
          @click="$emit('toggle')"
          class="p-1 rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
        >
          <ChevronLeftIcon :size="20" />
        </button>
      </template>

      <template v-else>
        <button
          @click="$emit('toggle')"
          class="p-1 mx-auto rounded-md hover:bg-blue-700 focus:outline-none transition-colors"
        >
          <MenuIcon :size="20" />
        </button>
      </template>
    </div>

    <div class="flex-1 overflow-y-auto py-4">
      <nav class="px-2 space-y-1">
        <button
          v-for="item in menuItems"
          :key="item.view"
          @click="$emit('update:activeView', item.view)"
          :class="[
            'w-full flex items-center px-2 py-3 rounded-md transition-colors',
            activeView === item.view ? 'bg-blue-700' : 'hover:bg-blue-700',
            expanded ? 'justify-start' : 'justify-center'
          ]"
        >
          <component :is="item.icon" :size="20" />
          <span v-if="expanded" class="ml-3">{{ item.title }}</span>
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  FileTextIcon,
  ReceiptIcon,
  HistoryIcon,
  MailIcon,
  CopyIcon,
  UsersIcon,
  MenuIcon,
  ChevronLeftIcon,
} from 'lucide-vue-next'

interface Props {
  expanded: boolean
  activeView: string
}

defineProps<Props>()

defineEmits<{
  toggle: []
  'update:activeView': [view: string]
}>()

const menuItems = [
  {
    icon: HomeIcon,
    title: 'Dashboard',
    view: 'dashboard',
  },
  {
    icon: FileTextIcon,
    title: 'Invoices',
    view: 'invoices',
  },
  {
    icon: ReceiptIcon,
    title: 'Receipts',
    view: 'receipts',
  },
  {
    icon: HistoryIcon,
    title: 'History',
    view: 'history',
  },
  {
    icon: MailIcon,
    title: 'Send Documents',
    view: 'send',
  },
  {
    icon: CopyIcon,
    title: 'Copy Documents',
    view: 'copy',
  },
  {
    icon: UsersIcon,
    title: 'Clients',
    view: 'clients',
  },
]
</script>