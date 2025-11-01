import { cn } from '../../utils/cn'

export const ShinyButton = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'group relative inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-medium transition-all duration-300',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#A8FF78] via-[#FFC700] to-[#FF3838] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#A8FF78] via-[#FFC700] to-[#FF3838] opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
    </button>
  )
}

