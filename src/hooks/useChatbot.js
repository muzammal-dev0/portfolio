import { useCallback, useEffect, useState } from 'react'
import {
  API_ERROR_MESSAGE,
  MAX_HISTORY_TURNS,
  MAX_MESSAGE_LENGTH,
  RATE_LIMIT_MESSAGE,
  WELCOME_MESSAGE,
} from '../constants/chatbot'

let messageId = 0
const nextId = () => `msg-${++messageId}`

function toApiMessages(messages) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_HISTORY_TURNS * 2)
    .map(({ role, content }) => ({ role, content }))
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const appendMessage = useCallback((role, content) => {
    setMessages((prev) => [...prev, { id: nextId(), role, content }])
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      if (trimmed.length > MAX_MESSAGE_LENGTH) {
        setError(`Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.`)
        return
      }

      setError(null)

      const userMessage = { id: nextId(), role: 'user', content: trimmed }
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const history = toApiMessages([...messages, userMessage])

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          const fallback =
            data.error ??
            (res.status === 429 ? RATE_LIMIT_MESSAGE : API_ERROR_MESSAGE)
          appendMessage('assistant', fallback)
          if (res.status !== 429) setError(fallback)
          return
        }

        if (data.reply) {
          appendMessage('assistant', data.reply)
        } else {
          appendMessage('assistant', API_ERROR_MESSAGE)
          setError(API_ERROR_MESSAGE)
        }
      } catch {
        appendMessage('assistant', API_ERROR_MESSAGE)
        setError(API_ERROR_MESSAGE)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages, appendMessage]
  )

  const clearChat = useCallback(() => {
    setMessages([])
    setIsLoading(false)
    setError(null)
    appendMessage('assistant', WELCOME_MESSAGE)
  }, [appendMessage])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      appendMessage('assistant', WELCOME_MESSAGE)
    }
  }, [isOpen, messages.length, appendMessage])

  return {
    isOpen,
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    open,
    close,
  }
}
