import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const AnimatedImageCarousel = ({ images, interval = 3000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (images.length === 0) return null
  if (images.length === 1) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={images[0]}
          alt="Project screenshot"
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="h-full w-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {/* Indicator dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

