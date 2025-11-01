import { useScrollAnimation } from './hooks/useScrollAnimation'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
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
