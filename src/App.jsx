import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { scrollToSection } from './utils/scroll'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import TechnicalSkills from './components/sections/TechnicalSkills'
import Projects from './components/sections/Projects'
import WorkExperience from './components/sections/WorkExperience'
import Contact from './components/sections/Contact'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  useScrollAnimation()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) {
      requestAnimationFrame(() => {
        scrollToSection(target)
      })
      navigate('.', { replace: true, state: {} })
    }
  }, [location.state, navigate])

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '')
      if (id) {
        requestAnimationFrame(() => scrollToSection(id))
      }
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-slate-50 font-sans leading-normal tracking-normal text-slate-900 antialiased">
      {/* Skip to main content link for accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-white"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Skip to main content
      </a>
      <Header />
      <Hero />
      <About />
      <TechnicalSkills />
      <Projects />
      <WorkExperience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
