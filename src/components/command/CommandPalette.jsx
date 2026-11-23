import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { personalInfo } from '../../constants/personalInfo'
import { projects } from '../../constants/projects'
import { scrollToSection } from '../../utils/scroll'
import { OPEN_PALETTE, SECTION_KEYS, modKeyLabel, openChat } from './commandBus'

const isTypingTarget = (el) =>
  el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)

const shortName = (title) => title.split(' — ')[0]

const CommandPalette = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocusRef = useRef(null)

  const goSection = useCallback(
    (id) => {
      if (location.pathname !== '/') navigate('/', { state: { scrollTo: id } })
      else scrollToSection(id)
    },
    [location.pathname, navigate]
  )

  const flash = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const commands = useMemo(() => {
    const keyFor = Object.fromEntries(Object.entries(SECTION_KEYS).map(([k, v]) => [v, k.toUpperCase()]))
    const section = (id, label, icon, keywords = '') => ({
      id: `go-${id}`,
      group: 'Go to',
      label,
      icon,
      keywords,
      shortcut: keyFor[id],
      run: () => goSection(id),
    })
    return [
      section('about', 'About', 'fa-user', 'bio background'),
      section('skills', 'Stack & skills', 'fa-layer-group', 'tech tools languages'),
      section('projects', 'Projects', 'fa-folder-open', 'work portfolio case studies'),
      section('experience', 'Experience', 'fa-briefcase', 'jobs history career'),
      section('contact', 'Contact', 'fa-paper-plane', 'hire email reach'),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: 'Projects',
        label: shortName(p.title),
        hint: p.technologies.slice(0, 3).join(' · '),
        icon: 'fa-arrow-right',
        keywords: `${p.title} ${p.technologies.join(' ')} ${p.description}`,
        run: () => navigate(`/project/${p.slug}`),
      })),
      {
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: personalInfo.email,
        icon: 'fa-copy',
        keywords: 'mail contact clipboard',
        run: async () => {
          try {
            await navigator.clipboard.writeText(personalInfo.email)
            flash('Email copied to clipboard')
          } catch {
            window.location.href = `mailto:${personalInfo.email}`
          }
        },
      },
      {
        id: 'send-email',
        group: 'Actions',
        label: 'Send an email',
        icon: 'fa-envelope',
        keywords: 'mail contact hire',
        run: () => {
          window.location.href = `mailto:${personalInfo.email}`
        },
      },
      {
        id: 'download-cv',
        group: 'Actions',
        label: 'Download CV',
        hint: 'PDF',
        icon: 'fa-file-arrow-down',
        keywords: 'resume pdf',
        run: () => {
          const a = document.createElement('a')
          a.href = personalInfo.cvPath
          a.download = 'Muzammal-Hussain-CV.pdf'
          a.click()
        },
      },
      {
        id: 'ask-ai',
        group: 'Actions',
        label: 'Ask the AI assistant about my work',
        icon: 'fa-comment-dots',
        keywords: 'chat bot question',
        run: () => openChat(),
      },
      ...[
        ['GitHub', 'fa-github', personalInfo.socialLinks.github],
        ['LinkedIn', 'fa-linkedin-in', personalInfo.socialLinks.linkedin],
        ['WhatsApp', 'fa-whatsapp', personalInfo.socialLinks.whatsapp],
      ].map(([label, icon, href]) => ({
        id: `link-${label}`,
        group: 'Links',
        label: `Open ${label}`,
        icon: `fab ${icon}`,
        keywords: 'social profile',
        run: () => window.open(href, '_blank', 'noopener,noreferrer'),
      })),
    ]
  }, [goSection, navigate])

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return commands
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.keywords ?? ''} ${c.hint ?? ''}`.toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }, [commands, query])

  const show = useCallback((initial = '') => {
    returnFocusRef.current = document.activeElement
    setQuery(initial)
    setActive(0)
    setOpen(true)
  }, [])

  const hide = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => returnFocusRef.current?.focus?.())
  }, [])

  const runCommand = (cmd) => {
    if (!cmd) return
    setOpen(false)
    cmd.run()
  }

  // Global shortcuts: ⌘K / Ctrl+K toggles, "/" opens, single letters jump to sections.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        open ? hide() : show()
        return
      }
      if (open || e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(document.activeElement)) return
      if (e.key === '/') {
        e.preventDefault()
        show()
        return
      }
      const target = SECTION_KEYS[e.key.toLowerCase()]
      if (target && !e.shiftKey) goSection(target)
    }
    const onOpen = (e) => show(e.detail?.query ?? '')
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE, onOpen)
    }
  }, [open, show, hide, goSection])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      hide()
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus inside the dialog
    }
  }

  let lastGroup = null

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-900/20 px-3 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && hide()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-ink-200 px-4">
              <i className="fas fa-magnifying-glass text-sm text-ink-400" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search projects, sections or actions…"
                className="h-14 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="kbd">esc</kbd>
            </div>

            <ul id="command-list" ref={listRef} role="listbox" className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-10 text-center text-sm text-ink-500">
                  No matches for “{query}”. Try a technology like “NestJS” or an action like “email”.
                </li>
              )}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null
                lastGroup = cmd.group
                const selected = i === active
                return (
                  <li key={cmd.id} role="presentation">
                    {header && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-wider text-ink-400">
                        {header}
                      </p>
                    )}
                    <div
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setActive(i)}
                      onClick={() => runCommand(cmd)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        selected ? 'bg-ink-100 text-ink-900' : 'text-ink-600'
                      }`}
                    >
                      <i
                        className={`${cmd.icon.startsWith('fab') ? cmd.icon : `fas ${cmd.icon}`} w-4 text-center text-xs ${
                          selected ? 'text-ink-900' : 'text-ink-400'
                        }`}
                        aria-hidden
                      />
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {cmd.hint && <span className="hidden truncate font-mono text-xs text-ink-400 sm:block">{cmd.hint}</span>}
                      {cmd.shortcut && <kbd className="kbd hidden sm:inline-flex">{cmd.shortcut}</kbd>}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="hidden items-center gap-4 border-t border-ink-200 px-4 py-2.5 sm:flex font-mono text-[11px] text-ink-400">
              <span className="flex items-center gap-1.5"><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> move</span>
              <span className="flex items-center gap-1.5"><kbd className="kbd">↵</kbd> open</span>
              <span className="ml-auto hidden items-center gap-1.5 sm:flex"><kbd className="kbd">{modKeyLabel}</kbd><kbd className="kbd">K</kbd> toggle</span>
            </div>
          </div>
        </div>
      )}

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center">
        {toast && (
          <p className="rounded-full bg-ink-900 px-4 py-2.5 font-mono text-xs text-ink-50 shadow-lg">
            <i className="fas fa-check mr-2" aria-hidden />
            {toast}
          </p>
        )}
      </div>
    </>
  )
}

export default CommandPalette
