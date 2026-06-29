import { cn } from '../../utils/cn'

const roleStyles = {
  user: 'ml-auto max-w-[85%] bg-[#FF3D00] text-white',
  assistant: 'mr-auto max-w-[85%] border border-stone-200 bg-white text-stone-800',
  system: 'mx-auto max-w-[90%] text-center text-xs text-stone-500',
}

const ChatMessage = ({ role = 'assistant', children, className }) => {
  if (role === 'system') {
    return (
      <div className={cn('px-3 py-1', roleStyles.system, className)}>
        {children}
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
      {children}
    </div>
  )
}

export default ChatMessage
