import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const BorderBeam = ({ className, size = 200, duration = 15, borderWidth = 1.5, anchor = 90, colorFrom = '#ffaa40', colorTo = '#9c40ff', delay = 0 }) => {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } 
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
        // mask styles
        '[background:linear-gradient(transparent,transparent),linear-gradient(to_right,var(--color-from),var(--color-to))] [background-clip:padding-box,border-box] [background-origin:border-box]',
        // overlay
        '[mask:linear-gradient(#fff_0_0)_content-box_content-box,linear-gradient(#fff_0_0)] [mask-composite:xor]',
        className
      )}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to right, var(--color-from), var(--color-to), var(--color-from))`,
          backgroundSize: '200% 100%',
        }}
        className="[filter:blur(calc(var(--size)*1px))] opacity-50"
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      />
    </div>
  )
}

