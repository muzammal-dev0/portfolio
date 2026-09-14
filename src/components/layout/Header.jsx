import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
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
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-ink-50/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
            setIsMenuOpen(false)
          }}
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          {personalInfo.name.split(' ')[0]}
          <span className="text-mark">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => goHomeSection(e, id)}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-500 transition hover:bg-ink/5 hover:text-ink"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={(e) => goHomeSection(e, 'contact')}
            className="ml-2 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-ink-50 transition hover:bg-mark"
          >
            Hire me
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full p-2 text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-ink/5 bg-ink-50 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={isHome ? `#${id}` : `/#${id}`}
                onClick={(e) => goHomeSection(e, id)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink-600 hover:bg-ink/5"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => goHomeSection(e, 'contact')}
              className="mt-2 rounded-full bg-ink py-3 text-sm font-semibold text-ink-50"
            >
              Hire me
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
