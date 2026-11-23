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
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
            setMenuOpen(false)
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-ink-900"
        >
          <span className="h-5 w-5 rounded-full bg-ink-900" aria-hidden />
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPalette()}
            className="flex items-center gap-3 rounded-full border-[1.5px] border-ink-900 py-2 pl-3.5 pr-2.5 text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-50 md:pl-4 md:pr-3"
            aria-label="Search the site"
          >
            <i className="fas fa-magnifying-glass text-sm" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.1em]">Search</span>
            <span className="ml-3 hidden font-mono text-[11px] opacity-60 md:inline">{modKeyLabel}K</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-2.5 text-ink-900 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink-200 bg-ink-50 px-6 pb-4 lg:hidden" aria-label="Mobile">
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
