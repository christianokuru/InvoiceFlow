<template>
  <div class="page-transition">
    <transition
      name="page"
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <slot />
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['transition-start', 'transition-end'])

let cleanup = null

const beforeEnter = (el) => {
  emit('transition-start', 'enter')
  el.style.opacity = '0'
  el.style.transform = 'translateY(20px)'
}

const enter = (el, done) => {
  const duration = 600
  el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`

  requestAnimationFrame(() => {
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  })

  setTimeout(() => {
    done()
  }, duration)
}

const afterEnter = (el) => {
  emit('transition-end', 'enter')
  el.style.transition = ''
}

const beforeLeave = (el) => {
  emit('transition-start', 'leave')
  el.style.transition = 'none'
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
}

const leave = (el, done) => {
  const duration = 400
  el.style.transition = `opacity ${duration}ms ease-in, transform ${duration}ms ease-in`

  requestAnimationFrame(() => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(-10px)'
  })

  setTimeout(() => {
    done()
  }, duration)
}

const afterLeave = (el) => {
  emit('transition-end', 'leave')
  el.style.transition = ''
}

// Add keyboard navigation enhancement
onMounted(() => {
  const handleKeyNavigation = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation')
    }
  }

  const handleMouseNavigation = () => {
    document.body.classList.remove('keyboard-navigation')
  }

  document.addEventListener('keydown', handleKeyNavigation)
  document.addEventListener('mousedown', handleMouseNavigation)

  cleanup = () => {
    document.removeEventListener('keydown', handleKeyNavigation)
    document.removeEventListener('mousedown', handleMouseNavigation)
  }
})

onUnmounted(() => {
  if (cleanup) cleanup()
})
</script>

<style scoped>
.page-transition {
  position: relative;
  overflow: hidden;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Enhanced focus styles for keyboard navigation */
:global(.keyboard-navigation) *:focus {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 2px !important;
}

/* Loading skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
</style>