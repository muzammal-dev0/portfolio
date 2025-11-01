import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Add animation classes to elements as they scroll into view
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
    window.addEventListener('scroll', animateOnScroll)

    // Also run on initial load
    animateOnScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateOnScroll)
    }
  }, [])

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal" style={{ fontFamily: "'Sansation', sans-serif" }}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

