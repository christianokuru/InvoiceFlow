import { ref, onMounted, onUnmounted } from 'vue'

export const useAccessibility = () => {
  const skipLinks = ref([])
  const focusTraps = ref(new Map())
  let currentFocusTrap = null

  // Skip links functionality
  const createSkipLinks = () => {
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')

    if (main && !document.querySelector('#skip-to-main')) {
      const skipToMain = document.createElement('a')
      skipToMain.id = 'skip-to-main'
      skipToMain.href = '#main-content'
      skipToMain.textContent = 'Skip to main content'
      skipToMain.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:z-50 focus:outline-none'
      skipToMain.setAttribute('aria-label', 'Skip to main content')
      document.body.insertBefore(skipToMain, document.body.firstChild)

      // Add id to main content if not present
      if (!main.id) {
        main.id = 'main-content'
      }
    }

    if (nav && !document.querySelector('#skip-to-nav')) {
      const skipToNav = document.createElement('a')
      skipToNav.id = 'skip-to-nav'
      skipToNav.href = '#main-navigation'
      skipToNav.textContent = 'Skip to navigation'
      skipToNav.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:z-50 focus:outline-none'
      skipToNav.setAttribute('aria-label', 'Skip to navigation')
      document.body.insertBefore(skipToNav, document.body.firstChild)

      // Add id to navigation if not present
      if (!nav.id) {
        nav.id = 'main-navigation'
      }
    }
  }

  // Focus trap functionality
  const createFocusTrap = (element, id) => {
    if (!element) return

    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }

      if (e.key === 'Escape') {
        removeFocusTrap(id)
      }
    }

    element.addEventListener('keydown', handleTabKey)
    focusTraps.value.set(id, { element, handler: handleTabKey })

    // Focus first element
    if (firstElement) {
      firstElement.focus()
    }
  }

  const removeFocusTrap = (id) => {
    const trap = focusTraps.value.get(id)
    if (trap) {
      trap.element.removeEventListener('keydown', trap.handler)
      focusTraps.value.delete(id)
    }
  }

  // Announce screen reader messages
  const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  // Enhanced keyboard navigation
  const enhanceKeyboardNavigation = () => {
    // Add keyboard navigation for dropdown menus
    const dropdowns = document.querySelectorAll('[role="menu"], [role="listbox"]')

    dropdowns.forEach(dropdown => {
      const items = dropdown.querySelectorAll('[role="menuitem"], [role="option"]')

      items.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault()
              const nextItem = items[index + 1] || items[0]
              nextItem.focus()
              break
            case 'ArrowUp':
              e.preventDefault()
              const prevItem = items[index - 1] || items[items.length - 1]
              prevItem.focus()
              break
            case 'Home':
              e.preventDefault()
              items[0].focus()
              break
            case 'End':
              e.preventDefault()
              items[items.length - 1].focus()
              break
            case 'Enter':
            case ' ':
              e.preventDefault()
              item.click()
              break
          }
        })
      })
    })

    // Add keyboard navigation for tabs
    const tabLists = document.querySelectorAll('[role="tablist"]')

    tabLists.forEach(tabList => {
      const tabs = tabList.querySelectorAll('[role="tab"]')

      tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault()
              const prevTab = tabs[index - 1] || tabs[tabs.length - 1]
              prevTab.focus()
              prevTab.click()
              break
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault()
              const nextTab = tabs[index + 1] || tabs[0]
              nextTab.focus()
              nextTab.click()
              break
            case 'Home':
              e.preventDefault()
              tabs[0].focus()
              tabs[0].click()
              break
            case 'End':
              e.preventDefault()
              tabs[tabs.length - 1].focus()
              tabs[tabs.length - 1].click()
              break
          }
        })
      })
    })
  }

  // Add ARIA attributes for dynamic content
  const enhanceDynamicContent = () => {
    // Add aria-live regions for dynamic content
    const dynamicRegions = document.querySelectorAll('[data-dynamic="true"]')

    dynamicRegions.forEach(region => {
      if (!region.getAttribute('aria-live')) {
        region.setAttribute('aria-live', 'polite')
        region.setAttribute('aria-atomic', 'true')
      }
    })

    // Add aria-expanded for toggles
    const toggles = document.querySelectorAll('[data-toggle]')

    toggles.forEach(toggle => {
      const target = document.querySelector(toggle.getAttribute('data-toggle'))
      if (target && !toggle.getAttribute('aria-expanded')) {
        const isExpanded = target.style.display !== 'none'
        toggle.setAttribute('aria-expanded', isExpanded)
      }
    })
  }

  // Add accessibility styles
  const addAccessibilityStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      /* Screen reader only content */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .sr-only.focus:focus,
      .focus:not-sr-only {
        position: static;
        width: auto;
        height: auto;
        padding: inherit;
        margin: inherit;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }

      /* Enhanced focus styles */
      :focus-visible {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        :focus-visible {
          outline: 3px solid #000000 !important;
          outline-offset: 2px !important;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Skip links */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3b82f6;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
      }

      .skip-link:focus {
        top: 6px;
      }
    `
    document.head.appendChild(style)
  }

  // Initialize accessibility features
  const initializeAccessibility = () => {
    createSkipLinks()
    enhanceKeyboardNavigation()
    enhanceDynamicContent()
    addAccessibilityStyles()

    // Announce page load to screen readers
    announceToScreenReader('Page loaded successfully')
  }

  onMounted(() => {
    // Initialize accessibility features after DOM is ready
    setTimeout(initializeAccessibility, 100)
  })

  onUnmounted(() => {
    // Cleanup focus traps
    focusTraps.value.forEach((trap, id) => {
      removeFocusTrap(id)
    })
  })

  return {
    createSkipLinks,
    createFocusTrap,
    removeFocusTrap,
    announceToScreenReader,
    enhanceKeyboardNavigation,
    enhanceDynamicContent,
    initializeAccessibility
  }
}