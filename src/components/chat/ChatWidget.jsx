import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CHATBOT_NAME, CHATBOT_SUBTITLE } from '../../constants/chatbot'
import { useChatbot } from '../../hooks/useChatbot'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import ChatSuggestedQuestions from './ChatSuggestedQuestions'
import ChatTypingIndicator from './ChatTypingIndicator'

const ChatWidget = () => {
  const {
    isOpen,
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    open,
    close,
  } = useChatbot()

  const fabRef = useRef(null)
  const closeButtonRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const messagesEndRef = useRef(null)
  const wasLoadingRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  const handleClose = useCallback(() => {
    close()
    requestAnimationFrame(() => fabRef.current?.focus())
  }, [close])

  const toggle = useCallback(() => {
    if (isOpen) handleClose()
    else open()
  }, [isOpen, handleClose, open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (wasLoadingRef.current && !isLoading && isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    wasLoadingRef.current = isLoading
  }, [isLoading, isOpen])

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
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
  }, [isOpen, handleClose])

  const panelMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }

  const showSuggestions = !isLoading && !messages.some((m) => m.role === 'user')

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
                  {CHATBOT_NAME}
                </h2>
                <p className="text-xs text-stone-500">{CHATBOT_SUBTITLE}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat"
                  className="flex h-8 w-8 items-center justify-center text-stone-400 transition hover:text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
                >
                  <i className="fas fa-redo-alt text-xs" aria-hidden />
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center text-stone-400 transition hover:text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
                >
                  <i className="fas fa-times" aria-hidden />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {error && (
                <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                  {error}
                </p>
              )}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {isLoading && <ChatTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 bg-white p-3">
              {showSuggestions && (
                <ChatSuggestedQuestions
                  className="mb-3"
                  disabled={isLoading}
                  onSelect={sendMessage}
                />
              )}
              <ChatInput
                ref={inputRef}
                disabled={isLoading}
                placeholder="Ask about my work…"
                onSend={sendMessage}
              />
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
