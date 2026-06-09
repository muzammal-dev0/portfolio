import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const goHomeSection = (e, sectionId) => {
    e.preventDefault()
    if (!isHome) {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      scrollToSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo — editorial name in display serif */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) { e.preventDefault(); scrollToSection('home') }
            setIsMenuOpen(false)
          }}
          className="font-display text-base font-bold tracking-wide text-stone-900 transition hover:text-[#FF3D00]"
        >
          {personalInfo.name.split(' ')[0]}{' '}
          <span className="italic text-[#FF3D00]">{personalInfo.name.split(' ')[1]}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => goHomeSection(e, id)}
              className="rounded px-4 py-2 font-mono text-xs text-stone-500 transition hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={(e) => goHomeSection(e, 'contact')}
            className="ml-4 bg-[#FF3D00] px-5 py-2 font-mono text-xs font-medium text-white transition hover:bg-[#e53500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded p-2 text-stone-500 hover:text-stone-900 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-base`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={isHome ? `#${id}` : `/#${id}`}
                onClick={(e) => goHomeSection(e, id)}
                className="rounded px-3 py-2.5 font-mono text-sm text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => goHomeSection(e, 'contact')}
              className="mt-3 w-full bg-[#FF3D00] py-3 font-mono text-sm font-medium text-white transition hover:bg-[#e53500]"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
