import { SUGGESTED_QUESTIONS } from '../../constants/chatbot'
import { cn } from '../../utils/cn'

const ChatSuggestedQuestions = ({ onSelect, disabled, className }) => (
  <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label="Suggested questions">
    {SUGGESTED_QUESTIONS.map(({ label, message }) => (
      <button
        key={label}
        type="button"
        disabled={disabled}
        onClick={() => onSelect(message)}
        className="border border-ink-200 bg-white px-3 py-1.5 text-left text-xs text-ink-700 transition hover:border-[#0A0A0A]/40 hover:bg-ink-100 hover:text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
      </button>
    ))}
  </div>
)

export default ChatSuggestedQuestions
