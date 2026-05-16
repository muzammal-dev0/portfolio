import { handleNavClick } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'

const Hero = () => {
  const socialLinks = [
    { name: 'GitHub', url: personalInfo.socialLinks.github, icon: 'fab fa-github' },
    { name: 'LinkedIn', url: personalInfo.socialLinks.linkedin, icon: 'fab fa-linkedin' },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'fas fa-envelope' },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 text-center text-white md:pb-32 md:pt-32"
    >
      {/* Deep purple radial background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950 via-violet-900 to-indigo-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167, 139, 250, 0.35) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(76, 29, 149, 0.5) 0%, transparent 50%)',
        }}
      />
      {/* Decorative V lines toward badge */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-px -translate-x-[120px] bg-gradient-to-b from-violet-400/40 to-transparent md:h-40" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-px translate-x-[120px] bg-gradient-to-b from-violet-400/40 to-transparent md:h-40" aria-hidden />
      {/* Faint device frame */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[45vh] w-[min(90vw,520px)] -translate-x-1/2 rounded-t-3xl border border-violet-500/10 bg-violet-950/20 md:h-[42vh]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-900/50 ring-4 ring-violet-500/30">
          <span className="font-mono text-lg font-bold text-white" aria-hidden>
            &lt;/&gt;
          </span>
        </div>

        <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          {personalInfo.title}
        </h1>
        <p className="mb-6 text-xl font-semibold text-violet-100 md:text-2xl">
          {personalInfo.heroTagline}
        </p>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-violet-200/90 md:text-lg">
          {personalInfo.bio.short}
        </p>

        <div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'projects')}
            className="rounded-lg bg-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950"
          >
            View My Work
          </button>
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="rounded-lg border border-white/25 bg-white px-8 py-3.5 text-base font-semibold text-violet-950 shadow-sm transition hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950"
          >
            Contact Me
          </button>
        </div>

        <div className="flex items-center justify-center gap-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-violet-200/80 transition hover:text-white"
              aria-label={link.name}
            >
              <i className={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
