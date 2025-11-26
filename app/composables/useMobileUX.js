import { ref, onMounted, onUnmounted } from 'vue'

export const useMobileUX = () => {
  const isMobile = ref(false)
  const touchStartX = ref(0)
  const touchStartY = ref(0)
  const touchEndX = ref(0)
  const touchEndY = ref(0)
  const isScrolling = ref(false)
  let scrollTimeout = null

  // Detect mobile device
  const detectMobile = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth < 768

    isMobile.value = isTouchDevice || isSmallScreen || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  }

  // Touch gestures
  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    isScrolling.value = false
  }

  const handleTouchMove = (e) => {
    if (!touchStartX.value || !touchStartY.value) return

    const touchEndX = e.touches[0].clientX
    const touchEndY = e.touches[0].clientY

    const deltaX = touchStartX.value - touchEndX
    const deltaY = touchStartY.value - touchEndY

    // Determine if user is scrolling
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      isScrolling.value = false
    } else {
      // Vertical scroll
      isScrolling.value = true
    }
  }

  const handleTouchEnd = (e) => {
    if (!touchStartX.value || !touchStartY.value) return

    touchEndX.value = e.changedTouches[0].clientX
    touchEndY.value = e.changedTouches[0].clientY

    const deltaX = touchStartX.value - touchEndX.value
    const deltaY = touchStartY.value - touchEndY.value

    // Only handle swipes, not scrolls
    if (Math.abs(deltaX) > 50 && !isScrolling.value) {
      // Horizontal swipe detected
      if (deltaX > 0) {
        // Swipe left
        document.dispatchEvent(new CustomEvent('swipeleft', { detail: { deltaX, deltaY } }))
      } else {
        // Swipe right
        document.dispatchEvent(new CustomEvent('swiperight', { detail: { deltaX, deltaY } }))
      }
    }

    if (Math.abs(deltaY) > 50 && !isScrolling.value) {
      // Vertical swipe detected
      if (deltaY > 0) {
        // Swipe up
        document.dispatchEvent(new CustomEvent('swipeup', { detail: { deltaX, deltaY } }))
      } else {
        // Swipe down
        document.dispatchEvent(new CustomEvent('swipedown', { detail: { deltaX, deltaY } }))
      }
    }
  }

  // Enhanced scroll behavior for mobile
  const enhanceMobileScroll = () => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'
      const scrollVelocity = Math.abs(currentScrollY - lastScrollY)

      // Add scroll direction class to body
      document.body.classList.toggle('scrolling-down', scrollDirection === 'down')
      document.body.classList.toggle('scrolling-up', scrollDirection === 'up')

      // Add scroll velocity class
      document.body.classList.toggle('fast-scroll', scrollVelocity > 10)

      lastScrollY = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState)
        ticking = true
      }

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Remove scroll classes after scrolling stops
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling-down', 'scrolling-up', 'fast-scroll')
      }, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
  }

  // Touch feedback for mobile buttons
  const enhanceTouchFeedback = () => {
    const touchElements = document.querySelectorAll('button, a, .clickable')

    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.classList.add('touch-active')
      }, { passive: true })

      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('touch-active')
        }, 150)
      }, { passive: true })

      element.addEventListener('touchcancel', () => {
        element.classList.remove('touch-active')
      }, { passive: true })
    })
  }

  // Pull-to-refresh functionality
  const enablePullToRefresh = (callback, threshold = 100) => {
    let startY = 0
    let isPulling = false
    const pullIndicator = document.createElement('div')
    pullIndicator.className = 'pull-to-refresh'
    pullIndicator.innerHTML = '<div class="pull-indicator">↓ Pull to refresh</div>'
    pullIndicator.style.cssText = `
      position: fixed;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 16px;
      border-radius: 0 0 16px 16px;
      z-index: 9999;
      transition: top 0.3s ease;
      font-weight: 500;
    `

    document.body.appendChild(pullIndicator)

    const handlePullStart = (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
        isPulling = true
      }
    }

    const handlePullMove = (e) => {
      if (!isPulling) return

      const currentY = e.touches[0].clientY
      const pullDistance = currentY - startY

      if (pullDistance > 0) {
        e.preventDefault()

        const pullPercent = Math.min(pullDistance / threshold, 1)
        pullIndicator.style.top = `${pullPercent * 60 - 60}px`

        if (pullPercent >= 1) {
          pullIndicator.innerHTML = '<div class="pull-indicator">↻ Release to refresh</div>'
        } else {
          pullIndicator.innerHTML = '<div class="pull-indicator">↓ Pull to refresh</div>'
        }
      }
    }

    const handlePullEnd = () => {
      if (!isPulling) return

      const pullDistance = touchEndY.value - startY

      if (pullDistance >= threshold) {
        pullIndicator.style.top = '0px'
        pullIndicator.innerHTML = '<div class="pull-indicator">↻ Refreshing...</div>'

        // Execute callback
        if (callback) {
          callback()
        }

        // Hide indicator after delay
        setTimeout(() => {
          pullIndicator.style.top = '-60px'
        }, 1000)
      } else {
        pullIndicator.style.top = '-60px'
      }

      isPulling = false
    }

    document.addEventListener('touchstart', handlePullStart, { passive: true })
    document.addEventListener('touchmove', handlePullMove, { passive: false })
    document.addEventListener('touchend', handlePullEnd, { passive: true })
  }

  // Haptic feedback simulation
  const triggerHapticFeedback = (type = 'light') => {
    if (!navigator.vibrate) return

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [40],
      success: [10, 50, 10],
      error: [100, 50, 100],
      warning: [50]
    }

    navigator.vibrate(patterns[type] || patterns.light)
  }

  // Mobile viewport height fix
  const fixMobileViewport = () => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', setViewportHeight)
  }

  // Add mobile-specific CSS
  const addMobileStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      /* Touch feedback */
      .touch-active {
        transform: scale(0.95) !important;
        opacity: 0.8 !important;
        transition: all 0.1s ease !important;
      }

      /* Scroll indicators */
      .scrolling-down .hide-on-scroll-down {
        transform: translateY(-100%) !important;
      }

      .scrolling-up .hide-on-scroll-up {
        transform: translateY(0) !important;
      }

      .fast-scroll * {
        pointer-events: none !important;
      }

      /* Pull to refresh */
      .pull-to-refresh {
        transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .pull-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      /* Mobile viewport fix */
      .mobile-height-fix {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
      }

      /* Touch target sizes */
      @media (pointer: coarse) {
        button, a, input, select, textarea {
          min-height: 44px;
          min-width: 44px;
        }

        .clickable {
          min-height: 44px;
          min-width: 44px;
        }
      }

      /* Mobile safe areas */
      @supports (padding: max(0px)) {
        .safe-area-inset-top {
          padding-top: max(1rem, env(safe-area-inset-top));
        }

        .safe-area-inset-bottom {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }

        .safe-area-inset-left {
          padding-left: max(1rem, env(safe-area-inset-left));
        }

        .safe-area-inset-right {
          padding-right: max(1rem, env(safe-area-inset-right));
        }
      }

      /* Mobile-specific animations */
      @media (max-width: 768px) {
        .mobile-parallax {
          transform: translate3d(0, var(--scroll-y, 0), 0) !important;
          will-change: transform;
        }
      }
    `
    document.head.appendChild(style)
  }

  // Initialize mobile UX enhancements
  const initializeMobileUX = () => {
    detectMobile()

    if (isMobile.value) {
      enhanceMobileScroll()
      enhanceTouchFeedback()
      fixMobileViewport()
      addMobileStyles()

      // Add touch event listeners for gestures
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
      document.addEventListener('touchmove', handleTouchMove, { passive: true })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })

      console.log('Mobile UX enhancements initialized')
    }
  }

  onMounted(() => {
    initializeMobileUX()

    // Re-detect on resize
    window.addEventListener('resize', detectMobile)
  })

  onUnmounted(() => {
    // Cleanup
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)

    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    window.removeEventListener('resize', detectMobile)
  })

  return {
    isMobile,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    enablePullToRefresh,
    triggerHapticFeedback,
    enhanceTouchFeedback,
    initializeMobileUX
  }
}