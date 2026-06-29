import { forwardRef, useState } from 'react'
import { cn } from '../../utils/cn'

const ChatInput = forwardRef(function ChatInput(
  {
    disabled = false,
    placeholder = 'Ask about my work…',
    onSend,
    className,
  },
  ref
) {
  const [value, setValue] = useState('')

  const canSend = !disabled && value.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSend || !onSend) return
    onSend(value.trim())
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex items-end gap-2', className)}>
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <input
        ref={ref}
        id="chat-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={500}
        placeholder={placeholder}
        aria-disabled={disabled}
        className="min-h-[42px] flex-1 border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#FF3D00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF3D00]/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center bg-[#FF3D00] text-white transition hover:bg-[#e63600] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <i className="fas fa-paper-plane text-sm" aria-hidden />
      </button>
    </form>
  )
})

export default ChatInput
