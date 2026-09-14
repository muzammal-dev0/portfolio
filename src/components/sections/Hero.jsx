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
      className="relative overflow-hidden bg-ink-50 px-6 pb-20 pt-16 md:pb-28 md:pt-24"
    >
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-mark/15 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500"
          >
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mark" aria-hidden />
            {personalInfo.availability}
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[0.92] tracking-tight text-ink"
            style={{ fontSize: 'clamp(3.25rem, 9vw, 6.75rem)' }}
          >
            {firstName}
            <br />
            <span className="italic text-mark">{lastName}</span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500 md:text-xl"
          >
            {personalInfo.heroTagline}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-ink-50 transition hover:bg-mark"
            >
              View work
            </button>
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="rounded-full border border-ink/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink"
            >
              Get in touch
            </button>
          </motion.div>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            {personalInfo.location}
          </p>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
        >
          <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-mark/20 blur-2xl md:block" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-[0_30px_80px_-40px_rgba(17,17,17,0.6)]">
            <ProfileImage
              alt={personalInfo.name}
              className="aspect-[4/5] w-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-6 pt-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mark">Role</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">
                Full-Stack · Agentic AI
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
