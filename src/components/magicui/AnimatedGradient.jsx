import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const AnimatedGradient = ({ children, className, gradientFrom = '#3b82f6', gradientTo = '#8b5cf6' }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(-45deg, ${gradientFrom}, ${gradientTo}, #23a6d5, #23d5ab)`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

