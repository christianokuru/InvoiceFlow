<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter your message here...'
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue)
const isPreviewMode = ref(false)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== content.value) {
    content.value = newValue
  }
})

// Emit changes
watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})

// Editor commands
const execCommand = (command, value = null) => {
  document.execCommand(command, false, value)
  content.value = getEditorContent()
}

const getEditorContent = () => {
  const editor = document.getElementById('editor-content')
  return editor ? editor.innerHTML : ''
}

const setEditorContent = (html) => {
  const editor = document.getElementById('editor-content')
  if (editor) {
    editor.innerHTML = html
  }
}

const toggleBold = () => execCommand('bold')
const toggleItalic = () => execCommand('italic')
const toggleUnderline = () => execCommand('underline')
const insertLink = () => {
  const url = prompt('Enter URL:')
  if (url) execCommand('createLink', url)
}
const insertBulletList = () => execCommand('insertUnorderedList')
const insertNumberedList = () => execCommand('insertOrderedList')

const togglePreview = () => {
  if (!isPreviewMode.value) {
    content.value = getEditorContent()
  } else {
    setEditorContent(content.value)
  }
  isPreviewMode.value = !isPreviewMode.value
}

// Initialize content on mount
onMounted(() => {
  nextTick(() => {
    setEditorContent(content.value)
  })
})
</script>

<template>
  <div class="border border-gray-300 rounded-lg overflow-hidden">
    <!-- Toolbar -->
    <div v-if="!isPreviewMode && editable" class="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
      <button
        type="button"
        @click="toggleBold"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Bold"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2v2h2v6H7v2h4v-2h2V2h-2v2H9V2H7zm2 4h2v4H9V6z"/>
        </svg>
      </button>
      <button
        type="button"
        @click="toggleItalic"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Italic"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4h4v2h-1.5l-2 6H13v2H9v-2h1.5l2-6H9V4z"/>
        </svg>
      </button>
      <button
        type="button"
        @click="toggleUnderline"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Underline"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2v6h3V2h2v6h2V8h-2v6h2v2H7v-2h2V8H7V2z"/>
        </svg>
      </button>
      <div class="w-px h-6 bg-gray-300"></div>
      <button
        type="button"
        @click="insertLink"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Insert Link"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
        </svg>
      </button>
      <div class="w-px h-6 bg-gray-300"></div>
      <button
        type="button"
        @click="insertBulletList"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Bullet List"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4h10v2H3V4zm0 4h10v2H3V8zm0 4h6v2H3v-2zm10 0h2v2h-2v-2zm-3-8h3v2h-3V4z"/>
        </svg>
      </button>
      <button
        type="button"
        @click="insertNumberedList"
        class="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
        title="Numbered List"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4h10v2H3V4zm0 4h10v2H3V8zm0 4h6v2H3v-2zm10 0h2v2h-2v-2z"/>
        </svg>
      </button>
    </div>

    <!-- Editor/Preview Toggle -->
    <div class="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <span class="text-sm text-gray-600">
        {{ isPreviewMode ? 'Preview' : 'Edit' }} Mode
      </span>
      <button
        type="button"
        @click="togglePreview"
        class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        {{ isPreviewMode ? 'Switch to Edit' : 'Switch to Preview' }}
      </button>
    </div>

    <!-- Editor Content -->
    <div class="min-h-[200px] bg-white">
      <div
        v-if="!isPreviewMode"
        id="editor-content"
        contenteditable="editable"
        class="min-h-[200px] p-4 focus:outline-none"
        :placeholder="placeholder"
        @input="content = getEditorContent()"
      ></div>
      <div
        v-else
        class="min-h-[200px] p-4 prose prose-sm max-w-none"
        v-html="content"
      ></div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable]:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
  pointer-events: none;
}

.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #111827;
  font-weight: 600;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose ul, .prose ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.prose li {
  margin: 0.25rem 0;
}
</style>