import { ref, readonly } from 'vue'

const toasts = ref([])

let toastIdCounter = 0

export const useToaster = () => {
  const addToast = (toast) => {
    const id = `toast-${++toastIdCounter}`
    const duration = toast.duration ?? 5000 // Default 5 seconds

    const newToast = {
      ...toast,
      id,
      duration,
      percentage: duration > 0 ? 100 : undefined,
    }

    toasts.value.push(newToast)

    // Auto dismiss if duration is set
    if (duration > 0) {
      let startTime = Date.now()
      const updatePercentage = () => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, duration - elapsed)
        const percentage = (remaining / duration) * 100

        const toastIndex = toasts.value.findIndex(t => t.id === id)
        if (toastIndex !== -1) {
          toasts.value[toastIndex].percentage = percentage

          if (remaining > 0) {
            requestAnimationFrame(updatePercentage)
          } else {
            // Auto remove when duration expires
            setTimeout(() => removeToast(id), 300) // Wait for exit animation
          }
        }
      }

      requestAnimationFrame(updatePercentage)
    }

    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  // Convenience methods
  const success = (title, description, options) => {
    return addToast({ title, description, type: 'success', ...options })
  }

  const error = (title, description, options) => {
    return addToast({ title, description, type: 'error', ...options })
  }

  const warning = (title, description, options) => {
    return addToast({ title, description, type: 'warning', ...options })
  }

  const info = (title, description, options) => {
    return addToast({ title, description, type: 'info', ...options })
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  }
}