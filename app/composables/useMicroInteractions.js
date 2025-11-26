import { ref, onMounted, onUnmounted } from 'vue'

export const useMicroInteractions = () => {
  const isLoading = ref(false)
  const rippleElements = new Map()
  const hoverElements = new Map()
  let observer = null

  // Ripple effect for clicks
  const createRipple = (element, event) => {
    const ripple = document.createElement('span')
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple')

    // Add ripple to element
    element.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove()
      }
    }, 600)

    // Clean up stored reference
    const elementKey = getElementKey(element)
    if (rippleElements.has(elementKey)) {
      clearTimeout(rippleElements.get(elementKey))
    }
    rippleElements.set(elementKey, setTimeout(() => {
      rippleElements.delete(elementKey)
    }, 600))
  }

  // Enhanced hover effects with haptic feedback simulation
  const createHoverEffect = (element, intensity = 1) => {
    const elementKey = getElementKey(element)

    element.addEventListener('mouseenter', () => {
      // Simulate haptic feedback
      if (navigator.vibrate && window.matchMedia('(pointer: coarse)').matches) {
        navigator.vibrate(10)
      }

      // Add hover class
      element.classList.add('hover-enhanced')

      // Store hover reference
      hoverElements.set(elementKey, true)
    })

    element.addEventListener('mouseleave', () => {
      element.classList.remove('hover-enhanced')
      hoverElements.delete(elementKey)
    })
  }

  // Button press animation with feedback
  const createButtonPress = (element) => {
    element.addEventListener('mousedown', () => {
      element.style.transform = 'scale(0.95)'

      // Haptic feedback for mobile
      if (navigator.vibrate && window.matchMedia('(pointer: coarse)').matches) {
        navigator.vibrate(50)
      }
    })

    element.addEventListener('mouseup', () => {
      element.style.transform = ''
    })

    element.addEventListener('mouseleave', () => {
      element.style.transform = ''
    })
  }

  // Focus ripple effect
  const createFocusRipple = (element) => {
    element.addEventListener('focus', () => {
      element.classList.add('focus-enhanced')
    })

    element.addEventListener('blur', () => {
      element.classList.remove('focus-enhanced')
    })
  }

  // Loading state animation
  const setLoading = (element, loading) => {
    isLoading.value = loading

    if (loading) {
      element.classList.add('loading')
      element.disabled = true
      element.setAttribute('aria-busy', 'true')
    } else {
      element.classList.remove('loading')
      element.disabled = false
      element.removeAttribute('aria-busy')
    }
  }

  // Interactive card effects
  const createCardInteraction = (card) => {
    let isHovered = false

    card.addEventListener('mouseenter', () => {
      isHovered = true
      card.style.transform = 'translateY(-4px)'
      card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
    })

    card.addEventListener('mouseleave', () => {
      isHovered = false
      card.style.transform = ''
      card.style.boxShadow = ''
    })

    // Tilt effect on hover
    card.addEventListener('mousemove', (e) => {
      if (!isHovered) return

      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      const rotateX = deltaY * 10
      const rotateY = deltaX * 10

      card.style.transform = `
        perspective(1000px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
    })
  }

  // Interactive list items
  const createListInteraction = (list) => {
    const items = list.querySelectorAll('li, button, a')

    items.forEach((item, index) => {
      // Stagger animation
      item.style.transitionDelay = `${index * 50}ms`

      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(8px)'
        item.style.background = 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.1))'
      })

      item.addEventListener('mouseleave', () => {
        item.style.transform = ''
        item.style.background = ''
      })
    })
  }

  // Form field interactions
  const createFormFieldInteraction = (field) => {
    const label = field.querySelector('label')
    const input = field.querySelector('input, textarea, select')

    if (input) {
      input.addEventListener('focus', () => {
        field.classList.add('field-focused')
        if (label) {
          label.classList.add('label-elevated')
        }
      })

      input.addEventListener('blur', () => {
        field.classList.remove('field-focused')
        if (label) {
          label.classList.remove('label-elevated')
        }
      })

      input.addEventListener('input', () => {
        if (input.value) {
          field.classList.add('field-filled')
        } else {
          field.classList.remove('field-filled')
        }
      })
    }
  }

  // Notification toast animation
  const showNotification = (message, type = 'info', duration = 3000) => {
    const notification = document.createElement('div')
    notification.className = `notification notification--${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('notification--show')
    })

    // Remove after duration
    setTimeout(() => {
      notification.classList.add('notification--hide')
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }, duration)
  }

  // Helper function to generate unique element keys
  const getElementKey = (element) => {
    return element.tagName.toLowerCase() +
           (element.id ? '#' + element.id : '') +
           (element.className ? '.' + element.className.split(' ')[0] : '')
  }

  // Initialize micro-interactions for common elements
  const initializeInteractions = () => {
    // Ripple effects for buttons
    const buttons = document.querySelectorAll('.btn, button:not(.no-ripple)')
    buttons.forEach(button => {
      button.style.position = 'relative'
      button.style.overflow = 'hidden'

      button.addEventListener('click', (e) => createRipple(button, e))
      createButtonPress(button)
      createFocusRipple(button)
    })

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('.interactive, .card:not(.no-hover)')
    hoverElements.forEach(element => {
      createHoverEffect(element)
    })

    // Card interactions
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      createCardInteraction(card)
    })

    // List interactions
    const lists = document.querySelectorAll('.interactive-list')
    lists.forEach(list => {
      createListInteraction(list)
    })

    // Form field interactions
    const formFields = document.querySelectorAll('.form-field')
    formFields.forEach(field => {
      createFormFieldInteraction(field)
    })

    // Loading states for async operations
    const asyncButtons = document.querySelectorAll('[data-async]')
    asyncButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        if (button.dataset.loading === 'true') return

        setLoading(button, true)

        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000))

        setLoading(button, false)
        showNotification('Operation completed successfully!', 'success')
      })
    })
  }

  // Intersection observer for lazy animations
  const createLazyObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')

            // Trigger stagger animation for child elements
            const children = entry.target.querySelectorAll('.animate-stagger > *')
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 100}ms`
              child.classList.add('animate-in-stagger')
            })

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe elements with lazy animation
    document.querySelectorAll('.animate-lazy').forEach(el => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    initializeInteractions()
    createLazyObserver()

    // Add global styles
    const style = document.createElement('style')
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      }

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      .hover-enhanced {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .focus-enhanced {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }

      .loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
      }

      .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: all 0.3s ease-out;
        z-index: 1000;
        max-width: 400px;
      }

      .notification--show {
        transform: translateX(0);
      }

      .notification--hide {
        transform: translateX(100%);
        opacity: 0;
      }

      .notification--success {
        border-left: 4px solid #10b981;
      }

      .notification--error {
        border-left: 4px solid #ef4444;
      }

      .notification--info {
        border-left: 4px solid #3b82f6;
      }

      .notification--warning {
        border-left: 4px solid #f59e0b;
      }

      .field-focused {
        transform: translateY(-2px);
      }

      .label-elevated {
        transform: translateY(-8px) scale(0.85);
        color: #3b82f6;
      }

      .field-filled {
        color: #3b82f6;
      }

      .animate-in {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .animate-in-stagger {
        opacity: 0;
        animation: fadeInUp 0.4s ease-out forwards;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Keyboard navigation enhancements */
      :focus-visible {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
    `
    document.head.appendChild(style)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }

    // Clean up all timeouts and event listeners
    rippleElements.forEach(timeoutId => clearTimeout(timeoutId))
    rippleElements.clear()
    hoverElements.clear()
  })

  return {
    isLoading,
    setLoading,
    createRipple,
    createHoverEffect,
    createButtonPress,
    createCardInteraction,
    createListInteraction,
    createFormFieldInteraction,
    showNotification,
    initializeInteractions
  }
}