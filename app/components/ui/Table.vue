<script setup>
import { computed } from 'vue'
import Button from '~/components/ui/Button.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'No data available'
  },
  emptyDescription: {
    type: String,
    default: 'There are no items to display at this time.'
  },
  striped: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  sortBy: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  rowKey: {
    type: [String, Function],
    default: 'id'
  }
})

defineEmits(['sort', 'row-click', 'prev-page', 'next-page', 'page-change', 'page-size-change'])

const tableClasses = computed(() => [
  'min-w-full divide-y divide-gray-200',
  {
    'table-fixed': props.columns.some(col => col.width),
  }
])

const headerClasses = computed(() => [
  'bg-gray-50'
])

const bodyClasses = computed(() => [
  'bg-white divide-y divide-gray-200',
  {
    'divide-gray-100': props.compact
  }
])

const paginatedData = computed(() => {
  if (!props.showPagination) return props.data

  const start = (props.currentPage - 1) * props.pageSize
  const end = start + props.pageSize
  return props.data.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(props.data.length / props.pageSize)
})

const startIndex = computed(() => {
  return (props.currentPage - 1) * props.pageSize
})

const endIndex = computed(() => {
  return Math.min(startIndex.value + props.pageSize, props.data.length)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 7
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const getColumnClasses = (column) => [
  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
  {
    'text-center': column.align === 'center',
    'text-right': column.align === 'right',
    'cursor-pointer hover:bg-gray-100': column.sortable
  },
  column.width || ''
]

const getRowClasses = (row, index) => [
  'transition-colors duration-150',
  {
    'bg-white': !props.striped || index % 2 === 0,
    'bg-gray-50': props.striped && index % 2 === 1,
    'hover:bg-gray-50': props.hoverable,
    'cursor-pointer': props.hoverable
  }
]

const getCellClasses = (column) => [
  'px-6 py-4 whitespace-nowrap text-sm',
  {
    'text-center': column.align === 'center',
    'text-right': column.align === 'right',
    'py-2': props.compact,
    'font-medium text-gray-900': column.key === 'name' || column.key === 'title'
  }
]

const getRowKey = (row, index) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
  return row[props.rowKey] || index
}

const getCellValue = (row, key) => {
  return key.split('.').reduce((obj, k) => obj && obj[k], row)
}

const formatCellValue = (value, column) => {
  if (column.formatter) {
    return column.formatter(value)
  }

  if (value === null || value === undefined) {
    return '-'
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (typeof value === 'number' && column.key.includes('amount')) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  if (value instanceof Date) {
    return value.toLocaleDateString()
  }

  return String(value)
}
</script>

<template>
  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
    <div v-if="loading" class="flex items-center justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="!data || data.length === 0" class="text-center p-8">
      <div class="text-gray-400">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ emptyMessage }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ emptyDescription }}</p>
        <div v-if="$slots.empty" class="mt-6">
          <slot name="empty" />
        </div>
      </div>
    </div>

    <div v-else class="overflow-x-auto">
      <table :class="tableClasses">
        <thead :class="headerClasses">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="getColumnClasses(column)"
              @click="column.sortable && $emit('sort', column.key)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.title }}</span>
                <div v-if="column.sortable" class="flex flex-col">
                  <svg
                    class="w-3 h-3 -mb-1 text-gray-400"
                    :class="{ 'text-blue-600': sortBy === column.key && sortOrder === 'asc' }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg
                    class="w-3 h-3 text-gray-400"
                    :class="{ 'text-blue-600': sortBy === column.key && sortOrder === 'desc' }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody :class="bodyClasses">
          <tr
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="getRowClasses(row, index)"
            @click="$emit('row-click', row, index)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="getCellClasses(column)"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :value="getCellValue(row, column.key)"
                :column="column"
                :index="index"
              >
                {{ formatCellValue(getCellValue(row, column.key), column) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="showPagination && data.length > pageSize" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ startIndex + 1 }}</span>
            to
            <span class="font-medium">{{ endIndex }}</span>
            of
            <span class="font-medium">{{ data.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="$emit('prev-page')"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              :class="page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
              @click="$emit('page-change', page)"
            >
              {{ page }}
            </button>
            <button
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="$emit('next-page')"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>