import { useEffect } from 'react'

/**
 * Custom hook for scroll-triggered animations
 * Adds animation classes to sections as they scroll into view
 */
export const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const sections = document.querySelectorAll('section')

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add('animate-fadeIn')

          // Add slide-up animation to section titles
          const title = section.querySelector('h2')
          if (title) {
            title.classList.add('animate-slideUp')
          }
        }
      })
    }

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll, { passive: true })

    // Also run on initial load
    animateOnScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateOnScroll)
    }
  }, [])
}

