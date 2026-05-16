import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'

const navIds = [
  { id: 'home', label: 'Home' },
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
    <nav className="sticky top-0 z-50 border-b border-violet-950/60 bg-slate-950/95 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToSection('home')
            }
            setIsMenuOpen(false)
          }}
          className="flex items-center gap-2 text-lg font-bold text-white transition hover:text-violet-200 md:text-xl"
        >
          <span className="font-mono text-violet-400" aria-hidden>
            &lt;/&gt;
          </span>
          <span>{personalInfo.name.split(' ')[0]}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navIds.map(({ id, label }) => (
            <a
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => goHomeSection(e, id)}
              className="rounded-lg px-3 py-2 text-sm font-medium capitalize text-violet-100/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={(e) => goHomeSection(e, 'contact')}
            className="ml-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-950/40 transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Let&apos;s Talk
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-violet-100 hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <i className="fas fa-bars text-xl" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-violet-950/50 bg-slate-950 px-4 py-3 lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        role="menu"
      >
        {navIds.map(({ id, label }) => (
          <a
            key={id}
            href={isHome ? `#${id}` : `/#${id}`}
            onClick={(e) => goHomeSection(e, id)}
            className="block rounded-lg py-2.5 capitalize text-violet-100/90 hover:bg-white/5 hover:text-white"
            role="menuitem"
          >
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={(e) => goHomeSection(e, 'contact')}
          className="mt-2 w-full rounded-lg bg-violet-600 py-3 font-semibold text-white"
        >
          Let&apos;s Talk
        </button>
      </div>
    </nav>
  )
}

export default Header
