<template>
  <div class="loading-container" :class="sizeClass">
    <div class="spinner" :class="spinnerClass">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <!-- Loading text -->
    <div v-if="text" class="loading-text mt-4 text-gray-600 animate-pulse">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'purple', 'gray'].includes(value)
  },
  text: {
    type: String,
    default: ''
  }
})

const sizeClass = computed(() => {
  const sizes = {
    small: 'loading-spinner--small',
    medium: 'loading-spinner--medium',
    large: 'loading-spinner--large'
  }
  return sizes[props.size]
})

const spinnerClass = computed(() => {
  const colors = {
    blue: 'spinner--blue',
    green: 'spinner--green',
    purple: 'spinner--purple',
    gray: 'spinner--gray'
  }
  return colors[props.color]
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.loading-spinner--small .spinner {
  width: 24px;
  height: 24px;
}

.loading-spinner--medium .spinner {
  width: 48px;
  height: 48px;
}

.loading-spinner--large .spinner {
  width: 64px;
  height: 64px;
}

.spinner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bounce1,
.bounce2,
.bounce3 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-spinner--small .bounce1,
.loading-spinner--small .bounce2,
.loading-spinner--small .bounce3 {
  width: 4px;
  height: 4px;
}

.loading-spinner--large .bounce1,
.loading-spinner--large .bounce2,
.loading-spinner--large .bounce3 {
  width: 12px;
  height: 12px;
}

.spinner--blue .bounce1,
.spinner--blue .bounce2,
.spinner--blue .bounce3 {
  background-color: #3b82f6;
}

.spinner--green .bounce1,
.spinner--green .bounce2,
.spinner--green .bounce3 {
  background-color: #10b981;
}

.spinner--purple .bounce1,
.spinner--purple .bounce2,
.spinner--purple .bounce3 {
  background-color: #8b5cf6;
}

.spinner--gray .bounce1,
.spinner--gray .bounce2,
.spinner--gray .bounce3 {
  background-color: #6b7280;
}

.bounce1 {
  animation-delay: -0.32s;
}

.bounce2 {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.loading-text {
  font-size: 0.875rem;
  text-align: center;
  letter-spacing: 0.025em;
}
</style>