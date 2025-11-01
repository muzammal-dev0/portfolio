import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] border-transparent',
        '[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
        '[mask-composite:intersect]',
        '[mask-clip:padding-box,border-box]',
        className
      )}
      style={{
        '--border-beam-width': `${borderWidth}px`,
        borderWidth: 'var(--border-beam-width)',
      }}
    >
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        style={{
          width: size,
          height: size,
          offsetPath: `rect(0 auto auto 0 round 8px)`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          ...style
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}

