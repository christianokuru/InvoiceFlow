<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  triggerText: {
    type: String,
    default: ''
  },
  triggerVariant: {
    type: String,
    default: 'primary'
  },
  triggerSize: {
    type: String,
    default: 'md'
  },
  triggerIcon: {
    type: [Object, Function],
    default: null
  },
  placement: {
    type: String,
    default: 'bottom-left',
    validator: (value) => ['bottom-left', 'bottom-right', 'top-left', 'top-right'].includes(value)
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  teleport: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select', 'update:open'])

const dropdownRef = ref()
const isOpen = ref(false)
const dropdownStyle = ref({})

const dropdownClasses = computed(() => [
  'absolute z-50 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
  {
    'right-0': props.placement === 'bottom-right' || props.placement === 'top-right',
    'left-0': props.placement === 'bottom-left' || props.placement === 'top-left',
    'bottom-full mb-2': props.placement.startsWith('top'),
    'top-full mt-2': props.placement.startsWith('bottom')
  }
])

const getItemClasses = (item) => [
  'w-full text-left px-4 py-2 text-sm flex items-center space-x-2 group',
  {
    'text-gray-700 hover:bg-gray-100 hover:text-gray-900': !item.disabled,
    'text-gray-400 cursor-not-allowed': item.disabled,
    'bg-blue-50 text-blue-700': item.checked
  }
]

const toggleDropdown = () => {
  if (props.disabled) return

  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)

  if (isOpen.value) {
    nextTick(updateDropdownPosition)
  }
}

const selectItem = (item) => {
  if (item.disabled) return

  emit('select', item)

  if (item.onClick) {
    item.onClick(item)
  }

  if (props.closeOnSelect) {
    closeDropdown()
  }
}

const closeDropdown = () => {
  isOpen.value = false
  emit('update:open', false)
}

const updateDropdownPosition = () => {
  if (!dropdownRef.value || !isOpen.value) return

  const trigger = dropdownRef.value
  const dropdown = trigger.querySelector('[role="menu"]') || trigger.querySelector('.absolute')

  if (!dropdown) return

  const rect = trigger.getBoundingClientRect()
  const dropdownRect = dropdown.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  // Note: For now, let the CSS classes handle the positioning
}

// Click outside to close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

// Escape key to close
const handleEscape = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger -->
    <div @click="toggleDropdown">
      <slot name="trigger">
        <Button
          :variant="triggerVariant"
          :size="triggerSize"
          :icon="triggerIcon"
          :disabled="disabled"
        >
          {{ triggerText }}
          <svg class="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </Button>
      </slot>
    </div>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        :class="dropdownClasses"
        :style="dropdownStyle"
      >
        <div v-if="$slots.header" class="px-4 py-2 border-b border-gray-200">
          <slot name="header" />
        </div>

        <div class="py-1 max-h-60 overflow-auto">
          <slot>
            <!-- Default dropdown items -->
            <template v-for="item in items" :key="item.value || item.label">
              <button
                v-if="!item.divider"
                type="button"
                :class="getItemClasses(item)"
                :disabled="item.disabled"
                @click="selectItem(item)"
              >
                <component v-if="item.icon" :is="item.icon" :size="16" class="mr-2" />
                <span class="flex-1 text-left">{{ item.label }}</span>
                <span v-if="item.description" class="text-xs text-gray-500">{{ item.description }}</span>
                <svg v-if="item.checked" class="ml-2 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-else class="border-t border-gray-100 my-1"></div>
            </template>
          </slot>
        </div>

        <div v-if="$slots.footer" class="px-4 py-2 border-t border-gray-200">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>