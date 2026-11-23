import { motion, useReducedMotion } from 'framer-motion'
import { handleNavClick } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'
import ProfileImage from '../ProfileImage'

const city = personalInfo.location.split(', ').slice(1).join(', ')

const Hero = () => {
  const reduced = useReducedMotion()
  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center px-5 pb-20 pt-14 text-center md:min-h-[min(calc(100svh-5rem),50rem)] md:px-6 md:pb-24 md:pt-12"
    >
      <motion.div {...rise(0)} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3">
        <ProfileImage
          alt={personalInfo.name}
          className="h-16 w-16 rounded-full object-cover grayscale sm:h-10 sm:w-10"
          loading="eager"
          fetchPriority="high"
        />
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-500 sm:text-xs">
          <span className="block sm:inline">{personalInfo.title}</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">{city}</span>
        </p>
      </motion.div>

      <motion.h1
        {...rise(0.08)}
        className="mt-8 max-w-4xl font-bold leading-[1.02] tracking-[-0.035em] text-ink-900 md:mt-10"
        style={{ fontSize: 'clamp(2.75rem, 7.5vw, 5.75rem)' }}
      >
        I build SaaS and the AI inside it.
      </motion.h1>

      <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:mt-7 md:text-lg">
        Six years of multi-tenant platforms in TypeScript, NestJS, React and Python, now shipping RAG
        pipelines and MCP tools to production.
      </motion.p>

      <motion.div {...rise(0.24)} className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row md:mt-12">
        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="pill pill-solid py-3.5 sm:px-10">
          View projects
        </a>
        <a href={personalInfo.cvPath} download="Muzammal-Hussain-CV.pdf" className="pill py-3.5 sm:px-10">
          Download CV
        </a>
      </motion.div>

      <motion.p {...rise(0.32)} className="mt-8 flex items-center gap-2 text-sm text-ink-500">
        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald-500" aria-hidden />
        Available for {personalInfo.availability.replace('/', ' & ').toLowerCase()} work
      </motion.p>
    </section>
  )
}

export default Hero
