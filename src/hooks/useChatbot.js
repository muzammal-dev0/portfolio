import { useCallback, useEffect, useRef, useState } from 'react'
import {
  buildThankYouMessage,
  EMAIL_REGEX,
  LEAD_PROMPTS,
  TYPING_DELAY_MS,
  WELCOME_MESSAGE,
} from '../constants/chatbot'
import { getHardcodedReply, isConnectIntent, matchTopic } from '../utils/getHardcodedReply'

let messageId = 0
const nextId = () => `msg-${++messageId}`

const randomDelay = () =>
  Math.floor(Math.random() * (TYPING_DELAY_MS.max - TYPING_DELAY_MS.min + 1)) + TYPING_DELAY_MS.min

const initialLeadCapture = () => ({ step: 'idle', name: '' })

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('qa')
  const [leadCapture, setLeadCapture] = useState(initialLeadCapture)
  const [error, setError] = useState(null)
  const delayRef = useRef(null)

  const appendMessage = useCallback((role, content) => {
    setMessages((prev) => [...prev, { id: nextId(), role, content }])
  }, [])

  const respond = useCallback(
    (content) =>
      new Promise((resolve) => {
        setIsLoading(true)
        const delay = randomDelay()
        delayRef.current = window.setTimeout(() => {
          appendMessage('assistant', content)
          setIsLoading(false)
          resolve()
        }, delay)
      }),
    [appendMessage]
  )

  const resetLeadCapture = useCallback(() => {
    setMode('qa')
    setLeadCapture(initialLeadCapture())
  }, [])

  const startLeadCapture = useCallback(async () => {
    setMode('lead_capture')
    setLeadCapture({ step: 'awaiting_name', name: '' })
    await respond(LEAD_PROMPTS.askName)
  }, [respond])

  const parseNameAndEmail = (text) => {
    const trimmed = text.trim()
    const emailMatch = trimmed.match(/[^\s,]+@[^\s,]+\.[^\s,]+/)
    if (!emailMatch) return null

    const email = emailMatch[0]
    const namePart = trimmed
      .replace(email, '')
      .replace(/[,;]/g, ' ')
      .trim()

    return { name: namePart || '', email }
  }

  const completeLeadCapture = useCallback(
    async (name, email) => {
      setLeadCapture({ step: 'complete', name: name || 'Name not provided' })
      setMode('qa')
      await respond(buildThankYouMessage(name))
    },
    [respond]
  )

  const handleLeadCaptureMessage = useCallback(
    async (text) => {
      const { step, name } = leadCapture

      if (step === 'awaiting_name') {
        const parsed = parseNameAndEmail(text)
        if (parsed && EMAIL_REGEX.test(parsed.email)) {
          await completeLeadCapture(parsed.name, parsed.email)
          return
        }

        if (EMAIL_REGEX.test(text.trim())) {
          await completeLeadCapture('', text.trim())
          return
        }

        if (text.trim().length < 2) {
          await respond(LEAD_PROMPTS.invalidName)
          return
        }

        setLeadCapture({ step: 'awaiting_email', name: text.trim() })
        await respond(LEAD_PROMPTS.askEmail(text.trim()))
        return
      }

      if (step === 'awaiting_email') {
        const parsed = parseNameAndEmail(text)
        const email = parsed?.email ?? text.trim()

        if (!EMAIL_REGEX.test(email)) {
          await respond(LEAD_PROMPTS.invalidEmail)
          return
        }

        await completeLeadCapture(name, email)
      }
    },
    [leadCapture, respond, completeLeadCapture]
  )

  const handleQaMessage = useCallback(
    async (text) => {
      if (isConnectIntent(text)) {
        await startLeadCapture()
        return
      }

      const result = getHardcodedReply(text)
      await respond(result.reply)
    },
    [respond, startLeadCapture]
  )

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setError(null)
      appendMessage('user', trimmed)

      if (mode === 'lead_capture' && leadCapture.step !== 'complete') {
        const looksLikeEmail =
          trimmed.includes('@') || EMAIL_REGEX.test(trimmed)
        const shouldCancelCapture =
          matchTopic(trimmed) &&
          !isConnectIntent(trimmed) &&
          !(leadCapture.step === 'awaiting_email' && looksLikeEmail)

        if (shouldCancelCapture) {
          resetLeadCapture()
          await handleQaMessage(trimmed)
          return
        }

        await handleLeadCaptureMessage(trimmed)
        return
      }

      await handleQaMessage(trimmed)
    },
    [
      isLoading,
      appendMessage,
      mode,
      leadCapture.step,
      resetLeadCapture,
      handleQaMessage,
      handleLeadCaptureMessage,
    ]
  )

  const clearChat = useCallback(() => {
    if (delayRef.current) {
      window.clearTimeout(delayRef.current)
      delayRef.current = null
    }
    setMessages([])
    setIsLoading(false)
    setMode('qa')
    setLeadCapture(initialLeadCapture())
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

  useEffect(
    () => () => {
      if (delayRef.current) window.clearTimeout(delayRef.current)
    },
    []
  )

  return {
    isOpen,
    messages,
    isLoading,
    mode,
    leadCapture,
    error,
    sendMessage,
    clearChat,
    open,
    close,
  }
}
