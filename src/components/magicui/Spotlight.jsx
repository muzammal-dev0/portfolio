import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export const Spotlight = ({
  className,
  fill = 'white',
  ...props
}) => {
  const divRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!divRef.current || isFocused) return

      const div = divRef.current
      const rect = div.getBoundingClientRect()

      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleFocus = () => {
      setIsFocused(true)
      setOpacity(1)
    }

    const handleBlur = () => {
      setIsFocused(false)
      setOpacity(0)
    }

    const handleMouseEnter = () => {
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    const div = divRef.current
    if (div) {
      div.addEventListener('mousemove', handleMouseMove)
      div.addEventListener('mouseenter', handleMouseEnter)
      div.addEventListener('mouseleave', handleMouseLeave)
      div.addEventListener('focus', handleFocus)
      div.addEventListener('blur', handleBlur)
    }

    return () => {
      if (div) {
        div.removeEventListener('mousemove', handleMouseMove)
        div.removeEventListener('mouseenter', handleMouseEnter)
        div.removeEventListener('mouseleave', handleMouseLeave)
        div.removeEventListener('focus', handleFocus)
        div.removeEventListener('blur', handleBlur)
      }
    }
  }, [isFocused])

  const { children, ...restProps } = props

  return (
    <motion.div
      ref={divRef}
      className={cn('relative rounded-xl', className)}
      {...restProps}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.15), transparent 40%)`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
