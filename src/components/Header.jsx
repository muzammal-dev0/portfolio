import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
          className="flex items-center text-white text-2xl font-bold"
        >
          <span>Portfolio</span>
        </a>
        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="text-white hover:text-gray-300 transition"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('about')
            }}
            className="text-white hover:text-gray-300 transition"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('skills')
            }}
            className="text-white hover:text-gray-300 transition"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('projects')
            }}
            className="text-white hover:text-gray-300 transition"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('contact')
            }}
            className="text-white hover:text-gray-300 transition"
          >
            Contact
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden bg-gray-800 p-4 mt-2 ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
          className="block text-white py-2"
        >
          Home
        </a>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('about')
          }}
          className="block text-white py-2"
        >
          About
        </a>
        <a
          href="#skills"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('skills')
          }}
          className="block text-white py-2"
        >
          Skills
        </a>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('projects')
          }}
          className="block text-white py-2"
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('contact')
          }}
          className="block text-white py-2"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}

export default Header

