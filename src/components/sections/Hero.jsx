import { motion, useReducedMotion } from 'framer-motion'
import { handleNavClick } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'
import ProfileImage from '../ProfileImage'

const [firstName, lastName] = personalInfo.name.split(' ')

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night"
    >
      {/* Full-bleed photo plane */}
      <div className="absolute inset-0">
        <ProfileImage
          alt=""
          className="h-full w-full object-cover object-[center_20%] opacity-45 grayscale md:object-top"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40"
          aria-hidden
        />
      </div>

      {/* Soft signal glow */}
      <div
        className={`pointer-events-none absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-signal/20 blur-[100px] ${prefersReducedMotion ? '' : 'animate-drift'}`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 lg:pl-8 lg:pb-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold leading-[0.88] tracking-tight text-night-50"
          style={{ fontSize: 'clamp(3.4rem, 11vw, 8.5rem)' }}
        >
          <span className="block">{firstName}</span>
          <span className="block text-signal">{lastName}</span>
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex max-w-2xl flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-night-300">
              {personalInfo.title}
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-night-200 md:text-lg">
              {personalInfo.heroTagline}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-night transition hover:bg-night-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              See work
            </button>
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="rounded-full border border-night-200/30 px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-night-100 transition hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              Contact
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-night-400"
        >
          {personalInfo.location} · {personalInfo.availability}
        </motion.p>
      </div>
    </section>
  )
}

export default Hero
