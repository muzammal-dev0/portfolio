import { useScrollAnimation } from './hooks/useScrollAnimation'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  // Add scroll animations
  useScrollAnimation()

  return (
    <div
      className="bg-gray-100 font-sans leading-normal tracking-normal"
      style={{ fontFamily: "'Sansation', sans-serif" }}
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Skip to main content
      </a>
      <Sidebar />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
