<template>
  <div class="skeleton-loader" :class="wrapperClass">
    <!-- Text Skeleton -->
    <div v-if="type === 'text'" class="skeleton-text" :class="skeletonClass" :style="style"></div>

    <!-- Avatar Skeleton -->
    <div v-else-if="type === 'avatar'" class="skeleton-avatar" :class="skeletonClass" :style="style"></div>

    <!-- Button Skeleton -->
    <div v-else-if="type === 'button'" class="skeleton-button" :class="skeletonClass" :style="style"></div>

    <!-- Card Skeleton -->
    <div v-else-if="type === 'card'" class="skeleton-card" :class="skeletonClass">
      <div class="skeleton-header mb-4">
        <div class="skeleton-avatar small inline-block mr-3"></div>
        <div class="skeleton-text" style="width: 120px; height: 20px;"></div>
      </div>
      <div class="skeleton-content space-y-2">
        <div class="skeleton-text" style="width: 100%; height: 16px;"></div>
        <div class="skeleton-text" style="width: 80%; height: 16px;"></div>
        <div class="skeleton-text" style="width: 60%; height: 16px;"></div>
      </div>
    </div>

    <!-- Feature Card Skeleton -->
    <div v-else-if="type === 'feature-card'" class="skeleton-feature-card" :class="skeletonClass">
      <div class="skeleton-icon mb-4"></div>
      <div class="skeleton-title mb-2"></div>
      <div class="skeleton-description space-y-2">
        <div class="skeleton-text" style="width: 100%; height: 14px;"></div>
        <div class="skeleton-text" style="width: 90%; height: 14px;"></div>
      </div>
    </div>

    <!-- Testimonial Card Skeleton -->
    <div v-else-if="type === 'testimonial'" class="skeleton-testimonial" :class="skeletonClass">
      <div class="skeleton-stars mb-4"></div>
      <div class="skeleton-quote mb-4 space-y-2">
        <div class="skeleton-text" style="width: 100%; height: 14px;"></div>
        <div class="skeleton-text" style="width: 95%; height: 14px;"></div>
      </div>
      <div class="skeleton-author">
        <div class="skeleton-avatar small"></div>
        <div class="skeleton-text" style="width: 80px; height: 14px;"></div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div v-else-if="type === 'list'" class="skeleton-list" :class="skeletonClass">
      <div v-for="i in 3" :key="i" class="skeleton-item flex items-center py-2">
        <div class="skeleton-icon small mr-3"></div>
        <div class="skeleton-text" style="width: 150px; height: 16px;"></div>
      </div>
    </div>

    <!-- Default Rectangular Skeleton -->
    <div v-else class="skeleton-rect" :class="skeletonClass" :style="style"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'rect',
    validator: (value) => [
      'text', 'avatar', 'button', 'card', 'feature-card',
      'testimonial', 'list', 'rect'
    ].includes(value)
  },
  width: {
    type: String,
    default: null
  },
  height: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: ''
  },
  animate: {
    type: Boolean,
    default: true
  }
})

const wrapperClass = computed(() => {
  return [
    'skeleton-loader',
    props.animate && 'animate-shimmer',
    props.class
  ].filter(Boolean).join(' ')
})

const skeletonClass = computed(() => {
  const sizeClasses = {
    small: 'skeleton--small',
    medium: 'skeleton--medium',
    large: 'skeleton--large'
  }

  // Auto-detect size based on type and dimensions
  if (props.type === 'avatar') {
    return sizeClasses.small
  }
  return ''
})

const style = computed(() => {
  const styles = {}
  if (props.width) styles.width = props.width
  if (props.height) styles.height = props.height
  return styles
})
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  overflow: hidden;
}

.skeleton-text,
.skeleton-avatar,
.skeleton-button,
.skeleton-icon,
.skeleton-title,
.skeleton-description,
.skeleton-rect {
  background: #f3f4f6;
  border-radius: 4px;
}

/* Specific styles for different skeleton types */
.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.skeleton-avatar.small {
  width: 24px;
  height: 24px;
}

.skeleton-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.skeleton-icon.small {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.skeleton-button {
  height: 48px;
  border-radius: 8px;
}

.skeleton-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-feature-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.skeleton-testimonial {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-title {
  width: 100px;
  height: 24px;
  background: #e5e7eb;
  border-radius: 4px;
}

.skeleton-stars {
  display: flex;
  gap: 4px;
}

.skeleton-stars::before {
  content: '★★★★★';
  color: #f3f4f6;
  font-size: 16px;
}

.skeleton-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-header {
  display: flex;
  align-items: center;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Animation */
.animate-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Pulse animation for non-shimmer skeletons */
.skeleton-loader:not(.animate-shimmer) {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .skeleton-text,
  .skeleton-avatar,
  .skeleton-button,
  .skeleton-icon,
  .skeleton-title,
  .skeleton-description,
  .skeleton-rect {
    background: #374151;
  }

  .skeleton-title {
    background: #4b5563;
  }

  .skeleton-stars::before {
    color: #374151;
  }
}
</style>