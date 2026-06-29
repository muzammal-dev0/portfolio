import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { personalInfo } from '../../constants/personalInfo'
import ChatInput from './ChatInput'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const fabRef = useRef(null)
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    requestAnimationFrame(() => fabRef.current?.focus())
  }, [])

  const toggle = useCallback(() => {
    if (isOpen) close()
    else open()
  }, [isOpen, open, close])

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }

      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  const panelMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            className="fixed bottom-24 right-4 z-[60] flex max-h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden border border-stone-200 bg-stone-50 shadow-xl sm:right-6 sm:w-[380px]"
            {...panelMotion}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <h2
                  id="chat-title"
                  className="truncate font-display text-sm font-bold text-stone-900"
                >
                  Chat with {personalInfo.name.split(' ')[0]}
                </h2>
                <p className="text-xs text-stone-500">Ask me about my work</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="flex h-8 w-8 shrink-0 items-center justify-center text-stone-400 transition hover:text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
              >
                <i className="fas fa-times" aria-hidden />
              </button>
            </div>

            {/* Messages — empty in Phase 2 */}
            <div
              className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto px-4 py-8"
              aria-live="polite"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-stone-200 bg-white">
                <i className="fas fa-comments text-lg text-[#FF3D00]/70" aria-hidden />
              </div>
              <p className="max-w-[240px] text-center text-sm text-stone-500">
                Ask about my experience, skills, or projects — messaging opens in the next update.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 bg-white p-3">
              <ChatInput disabled placeholder="Chat coming soon…" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        ref={fabRef}
        type="button"
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-4 z-[60] flex h-14 w-14 items-center justify-center bg-[#FF3D00] text-white shadow-lg transition hover:bg-[#e63600] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 sm:right-6"
      >
        <i
          className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-xl`}
          aria-hidden
        />
      </button>
    </>
  )
}

export default ChatWidget
