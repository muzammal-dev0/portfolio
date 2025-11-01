import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const ShineBorder = ({
  className,
  duration = 14,
  shineColor = '#000000',
  borderWidth = 1,
  style,
}) => {
  // Handle array of colors or single color
  const colors = Array.isArray(shineColor) ? shineColor : [shineColor]
  
  // Create gradient string for animation
  const gradientString = colors.length > 1
    ? `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`
    : `linear-gradient(to right, transparent, ${colors[0]}, transparent)`

  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit]',
        className
      )}
      style={{
        background: gradientString,
        backgroundSize: '200% 100%',
        WebkitMaskImage: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
        WebkitMaskComposite: 'xor',
        WebkitMaskClip: 'padding-box, border-box',
        maskImage: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
        maskComposite: 'exclude',
        padding: `${borderWidth}px`,
        boxSizing: 'border-box',
        ...style,
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
