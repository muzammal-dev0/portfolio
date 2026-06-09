import { motion } from 'framer-motion'
import { handleNavClick } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'
import ProfileImage from '../ProfileImage'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const imageVariant = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 } },
}

const [firstName, lastName] = personalInfo.name.split(' ')

const Hero = () => {
  const socialLinks = [
    { name: 'GitHub', url: personalInfo.socialLinks.github, icon: 'fab fa-github' },
    { name: 'LinkedIn', url: personalInfo.socialLinks.linkedin, icon: 'fab fa-linkedin-in' },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'fas fa-envelope' },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-stone-50 px-6 pb-24 pt-16 md:py-24"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden
        style={{
          backgroundImage: 'linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* — Left: text — */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Index label */}
          <motion.div variants={item} className="mb-10 flex items-center gap-4">
            <span className="font-mono text-xs font-semibold text-[#FF3D00]">01</span>
            <span className="h-px w-14 bg-[#FF3D00]" />
            <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">
              Full-Stack Developer
            </span>
          </motion.div>

          {/* Name — the hero moment */}
          <motion.h1
            variants={item}
            className="mb-8 font-display font-bold leading-[0.88] tracking-tight text-stone-900"
            style={{ fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)' }}
          >
            <span className="block">{firstName}</span>
            <span className="block italic text-[#FF3D00]">{lastName}</span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={item} className="mb-8 h-px w-full max-w-lg bg-stone-200" />

          {/* Bio */}
          <motion.p
            variants={item}
            className="mb-10 max-w-lg text-base leading-relaxed text-stone-500 md:text-lg"
          >
            {personalInfo.bio.short}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="mb-12 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="bg-stone-900 px-7 py-3.5 font-mono text-sm font-medium text-white transition hover:bg-[#FF3D00] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              View Work →
            </button>
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="border border-stone-300 px-7 py-3.5 font-mono text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition hover:text-[#FF3D00]"
                aria-label={link.name}
              >
                <i className={`${link.icon} text-lg`} />
              </a>
            ))}
            <span className="ml-1 h-px w-16 bg-stone-200" />
            <span className="font-mono text-[11px] text-stone-400">{personalInfo.location}</span>
          </motion.div>
        </motion.div>

        {/* — Right: profile image — */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="show"
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Offset border frame — the editorial touch */}
            <div
              className="absolute -bottom-3 -right-3 h-full w-full border-2 border-[#FF3D00]/25"
              aria-hidden
            />

            {/* Image */}
            <div className="relative w-64 overflow-hidden md:w-72 lg:w-80">
              <ProfileImage
                alt={personalInfo.name}
                className="aspect-[4/5] w-full object-cover object-top"
                loading="eager"
                fetchPriority="high"
              />
              {/* Subtle warm overlay at bottom */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-50/20 to-transparent"
                aria-hidden
              />
            </div>

            {/* Availability badge — floats bottom-left */}
            <div className="absolute -bottom-5 -left-5 border border-stone-200 bg-stone-50 px-4 py-3 shadow-sm">
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Available</p>
              <p className="font-display text-sm font-bold text-stone-900">Freelance · Full-time</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stone-400">Scroll</span>
          <div className="h-6 w-px bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default Hero
