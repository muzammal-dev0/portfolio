import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Path' },
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
    <>
      {/* Desktop left rail */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-16 flex-col items-center justify-between border-r border-night-200/10 bg-night/80 py-6 backdrop-blur-md lg:flex">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
          }}
          className="font-display text-sm font-extrabold tracking-tight text-signal"
          aria-label="Home"
        >
          MH
        </Link>

        <nav className="flex flex-col items-center gap-6" aria-label="Primary">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => goHomeSection(e, id)}
              className="group relative flex h-8 w-8 items-center justify-center"
              aria-label={label}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-night-400 transition group-hover:scale-150 group-hover:bg-signal" />
              <span className="pointer-events-none absolute left-10 whitespace-nowrap rounded bg-night-800 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-night-100 opacity-0 transition group-hover:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </nav>

        <a
          href={personalInfo.cvPath}
          download="Muzammal-Hussain-CV.pdf"
          className="rotate-180 font-mono text-[9px] uppercase tracking-[0.35em] text-night-300 transition hover:text-signal"
          style={{ writingMode: 'vertical-rl' }}
        >
          CV
        </a>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-night-200/10 bg-night/90 px-5 py-4 backdrop-blur-md lg:hidden">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
            setIsMenuOpen(false)
          }}
          className="font-display text-lg font-bold text-night-50"
        >
          {personalInfo.name.split(' ')[0]}
          <span className="text-signal">.</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-night-200"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-night px-6 pt-24 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={isHome ? `#${id}` : `/#${id}`}
                onClick={(e) => goHomeSection(e, id)}
                className="border-b border-night-700 py-4 font-display text-3xl font-bold text-night-50"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

export default Header
