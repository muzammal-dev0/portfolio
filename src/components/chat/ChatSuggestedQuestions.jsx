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
        className="border border-stone-200 bg-white px-3 py-1.5 text-left text-xs text-stone-700 transition hover:border-[#FF3D00]/40 hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
      </button>
    ))}
  </div>
)

export default ChatSuggestedQuestions
