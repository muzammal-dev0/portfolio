import { cn } from '../../utils/cn'

export const PulsatingButton = ({
  children,
  className,
  pulseColor,
  duration = '2s',
  as: Component = 'button',
  ...props
}) => {
  // pulseColor should be RGB values like "59, 130, 246" or default to blue
  const rgbColor = pulseColor || '59, 130, 246'

  return (
    <Component
      className={cn(
        'relative px-6 py-3 rounded-lg font-semibold overflow-visible transition-colors cursor-pointer',
        className
      )}
      style={{
        '--pulse-color': rgbColor,
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 rounded-lg animate-pulse-ring pointer-events-none -z-10"
        style={{
          animationDuration: duration,
        }}
      />
      <span
        className="absolute inset-0 rounded-lg animate-pulse-ring pointer-events-none -z-10"
        style={{
          animationDuration: duration,
          animationDelay: '0.5s',
        }}
      />
    </Component>
  )
}

