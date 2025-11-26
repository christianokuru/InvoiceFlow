import { ref, onMounted, onUnmounted } from 'vue'

export const useAdvancedAnimations = () => {
  const scrollY = ref(0)
  const mouseX = ref(0)
  const mouseY = ref(0)
  let animationFrameId = null
  let scrollTimeout = null
  const isReducedMotion = ref(false)

  // Optimized scroll effect with throttling
  const updateScrollY = () => {
    if (isReducedMotion.value) return

    // Throttle scroll events for better performance
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout)
    }

    scrollTimeout = requestAnimationFrame(() => {
      scrollY.value = window.scrollY
    })
  }

  // Optimized mouse movement effect with debouncing
  const updateMousePosition = (e) => {
    if (isReducedMotion.value) return

    // Throttle mouse events for better performance
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    animationFrameId = requestAnimationFrame(() => {
      mouseX.value = e.clientX
      mouseY.value = e.clientY
    })
  }

  // Optimized counter animation with early exit
  const animateCounter = (element, start, end, duration) => {
    if (isReducedMotion.value) {
      element.textContent = end.toLocaleString()
      return
    }

    const startTime = performance.now()
    let lastTime = 0

    const updateCounter = (currentTime) => {
      // Skip frames if browser is busy
      if (currentTime - lastTime < 16) { // ~60fps
        requestAnimationFrame(updateCounter)
        return
      }
      lastTime = currentTime

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = Math.floor(start + (end - start) * progress)
      element.textContent = current.toLocaleString()

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        // Clean up
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Staggered animation observer
  const createStaggerObserver = (elements, animationClass, delay = 100) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animationClass)
            }, index * delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    elements.forEach(element => observer.observe(element))
    return observer
  }

  // Parallax mouse effect
  const applyParallaxEffect = (elements, intensity = 0.1) => {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (mouseX.value - centerX) * intensity
      const deltaY = (mouseY.value - centerY) * intensity

      element.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`
    })
  }

  // Enhanced scroll animation with momentum
  const createMomentumScroll = () => {
    let currentScroll = 0
    let targetScroll = 0
    let velocity = 0
    const friction = 0.92
    const spring = 0.05

    const animate = () => {
      targetScroll = window.scrollY
      velocity += (targetScroll - currentScroll) * spring
      velocity *= friction

      currentScroll += velocity

      // Apply parallax to elements
      document.querySelectorAll('.parallax-slow').forEach(element => {
        const speed = element.dataset.speed || 0.5
        element.style.transform = `translateY(${currentScroll * speed}px)`
      })

      document.querySelectorAll('.parallax-medium').forEach(element => {
        const speed = element.dataset.speed || 0.3
        element.style.transform = `translateY(${currentScroll * speed}px)`
      })

      document.querySelectorAll('.parallax-fast').forEach(element => {
        const speed = element.dataset.speed || 0.1
        element.style.transform = `translateY(${currentScroll * speed}px)`
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
  }

  // Gradient animation on scroll
  const applyGradientShift = (elements) => {
    elements.forEach(element => {
      const scrollPercent = (scrollY.value / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      element.style.backgroundPosition = `${scrollPercent}% 50%`
    })
  }

  // Reveal animation with blur effect
  const createRevealObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'all 0.8s ease-out'
            entry.target.style.filter = 'blur(0px)'
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
      element.style.opacity = '0'
      element.style.filter = 'blur(4px)'
      element.style.transform = 'translateY(30px)'
      observer.observe(element)
    })

    return observer
  }

  // Magnetic button effect
  const createMagneticEffect = (elements, intensity = 0.3) => {
    elements.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * intensity
        const deltaY = (e.clientY - centerY) * intensity

        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      })

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)'
      })
    })
  }

  // Background pattern animation
  const createBackgroundAnimation = () => {
    const patterns = document.querySelectorAll('.animated-pattern')

    const animate = () => {
      patterns.forEach((pattern, index) => {
        const time = Date.now() * 0.001
        const speed = (index + 1) * 0.2
        const x = Math.sin(time * speed) * 20
        const y = Math.cos(time * speed) * 20

        pattern.style.transform = `translate(${x}px, ${y}px) rotate(${time * 10}deg)`
      })

      requestAnimationFrame(animate)
    }

    animate()
  }

  onMounted(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedMotion.value = mediaQuery.matches

    // Listen for changes in motion preference
    const handleMotionChange = (e) => {
      isReducedMotion.value = e.matches
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    // Initialize scroll listeners with passive events for performance
    window.addEventListener('scroll', updateScrollY, { passive: true })
    if (!isReducedMotion.value) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true })
    }

    // Only initialize intensive animations if user prefers motion
    if (!isReducedMotion.value) {
      // Start momentum scrolling
      createMomentumScroll()

      // Initialize magnetic effects for buttons
      createMagneticEffect(document.querySelectorAll('.magnetic-button'))

      // Start background animations (reduced frequency for performance)
      createBackgroundAnimation()

      // Apply gradient shifts to elements (throttled for performance)
      const gradientElements = document.querySelectorAll('.gradient-shift')
      const gradientInterval = setInterval(() => applyGradientShift(gradientElements), 100)

      // Store interval reference for cleanup
      window._gradientInterval = gradientInterval
    }

    // Always initialize reveal animations (they're performant)
    createRevealObserver()

    // Store motion change handler for cleanup
    window._motionHandler = handleMotionChange
  })

  onUnmounted(() => {
    // Cleanup all event listeners
    window.removeEventListener('scroll', updateScrollY)
    window.removeEventListener('mousemove', updateMousePosition)

    // Cleanup motion preference listener
    if (window._motionHandler) {
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', window._motionHandler)
    }

    // Cleanup animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }

    // Cleanup scroll timeout
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout)
    }

    // Cleanup gradient interval
    if (window._gradientInterval) {
      clearInterval(window._gradientInterval)
    }

    // Cleanup window references
    delete window._gradientInterval
    delete window._motionHandler
  })

  return {
    scrollY,
    mouseX,
    mouseY,
    animateCounter,
    createStaggerObserver,
    applyParallaxEffect,
    applyGradientShift,
    createRevealObserver,
    createMagneticEffect,
    createBackgroundAnimation
  }
}