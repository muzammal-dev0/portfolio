const ChatTypingIndicator = () => (
  <div
    className="mr-auto flex max-w-[85%] items-center gap-1 rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-sm"
    aria-label="Assistant is typing"
  >
    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:0ms]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:150ms]" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:300ms]" />
  </div>
)

export default ChatTypingIndicator
