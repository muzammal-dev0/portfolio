import ReactMarkdown from 'react-markdown'
import { cn } from '../../utils/cn'

const roleStyles = {
  user: 'ml-auto max-w-[85%] bg-[#FF3D00] text-white',
  assistant: 'mr-auto max-w-[85%] border border-stone-200 bg-white text-stone-800',
  system: 'mx-auto max-w-[90%] text-center text-xs text-stone-500',
}

const assistantMarkdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-stone-900">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#FF3D00] underline underline-offset-2 hover:text-[#e63600]"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
}

const ChatMessage = ({ role = 'assistant', content, className }) => {
  if (role === 'system') {
    return (
      <div className={cn('px-3 py-1', roleStyles.system, className)}>
        {content}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm',
        roleStyles[role],
        className
      )}
    >
      {role === 'assistant' ? (
        <ReactMarkdown components={assistantMarkdownComponents}>{content}</ReactMarkdown>
      ) : (
        content
      )}
    </div>
  )
}

export default ChatMessage
