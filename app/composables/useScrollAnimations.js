import { onMounted, onUnmounted } from 'vue'

export const useScrollAnimations = () => {
  const handleScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll')

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-visible')
      } else {
        element.classList.remove('animate-visible')
      }
    })
  }

  onMounted(() => {
    // Add CSS for scroll animations
    const style = document.createElement('style')
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .animate-on-scroll.animate-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .animate-on-scroll.animation-delay-200 {
        transition-delay: 0.2s;
      }

      .animate-on-scroll.animation-delay-400 {
        transition-delay: 0.4s;
      }

      .animate-on-scroll.animation-delay-600 {
        transition-delay: 0.6s;
      }

      .animate-on-scroll.animation-delay-800 {
        transition-delay: 0.8s;
      }

      .animate-on-scroll.animation-delay-1000 {
        transition-delay: 1s;
      }

      .animate-on-scroll.animation-delay-1200 {
        transition-delay: 1.2s;
      }

      .animate-on-scroll.animation-delay-1400 {
        transition-delay: 1.4s;
      }

      .animate-on-scroll.animation-delay-1600 {
        transition-delay: 1.6s;
      }

      .animate-on-scroll.animation-delay-1800 {
        transition-delay: 1.8s;
      }

      .animate-on-scroll.animation-delay-2000 {
        transition-delay: 2s;
      }

      .animate-on-scroll.animation-delay-2200 {
        transition-delay: 2.2s;
      }

      .animate-on-scroll.animation-delay-2400 {
        transition-delay: 2.4s;
      }
    `
    document.head.appendChild(style)

    // Initial check on mount
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}