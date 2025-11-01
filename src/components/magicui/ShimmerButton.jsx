import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const ShimmerButton = ({
  children,
  className,
  shimmerColor = '#ffffff',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '100px',
  background = 'rgba(0, 0, 0, 1)',
  ...props
}) => {
  return (
    <motion.button
      className={cn(
        'relative z-10 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--background)] [border-radius:var(--border-radius)] transition-colors hover:bg-white/10',
        'transform-gpu transition-transform duration-300 ease-in-out active:scale-95',
        className
      )}
      style={
        {
          '--background': background,
          '--border-radius': borderRadius,
        } 
      }
      {...props}
    >
      <div
        className={cn(
          '-z-30 blur-[2px]',
          'absolute inset-0 overflow-visible [container-type:size]'
        )}
      >
        <div
          className="absolute -inset-full w-full rotate-12 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
            backgroundSize: `${shimmerSize} ${shimmerSize}`,
            animation: `shimmer ${shimmerDuration} linear infinite`,
          }}
        />
      </div>
      {children}
    </motion.button>
  )
}

