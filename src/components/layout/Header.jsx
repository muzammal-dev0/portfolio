import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'
import { modKeyLabel, openPalette } from '../command/commandBus'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const go = (e, id) => {
    e.preventDefault()
    if (isHome) scrollToSection(id)
    else navigate('/', { state: { scrollTo: id } })
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-ink-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20 md:px-6">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
            setMenuOpen(false)
          }}
          className="flex min-w-0 items-center gap-2.5 whitespace-nowrap text-base font-bold tracking-tight text-ink-900 md:text-lg"
        >
          <span className="h-4 w-4 shrink-0 rounded-full bg-ink-900 md:h-5 md:w-5" aria-hidden />
          {personalInfo.name}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => go(e, id)}
              className="text-xs font-bold uppercase tracking-[0.1em] text-ink-900 underline-offset-[6px] hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => openPalette()}
            className="flex h-10 items-center justify-center gap-3 rounded-full border-[1.5px] border-ink-900 px-3 text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-50 sm:px-4"
            aria-label="Search the site"
          >
            <i className="fas fa-magnifying-glass text-sm" aria-hidden />
            <span className="hidden text-xs font-bold uppercase tracking-[0.1em] sm:inline">Search</span>
            <span className="ml-3 hidden font-mono text-[11px] opacity-60 md:inline">{modKeyLabel}K</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-900 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink-200 bg-ink-50 px-5 pb-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,0.25)] lg:hidden" aria-label="Mobile">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => go(e, id)}
              className="block border-b border-ink-200 py-4 text-sm font-bold uppercase tracking-[0.1em] text-ink-900 last:border-0"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
