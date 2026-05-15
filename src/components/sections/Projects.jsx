import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../constants/projects'
import { ShineBorder } from '../magicui/ShineBorder'
import { AnimatedImageCarousel } from '../magicui/AnimatedImageCarousel'

const isRealLink = (url) => Boolean(url && url !== '#' && String(url).trim() !== '')

const linkButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-[#ff6b9d]/50 bg-[#ff6b9d]/10 px-4 py-2.5 text-sm font-medium text-[#ff6b9d] transition hover:bg-[#ff6b9d]/20 hover:border-[#ff6b9d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b9d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a192f]'

const disabledButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/35 cursor-not-allowed'

const ProjectCta = ({ href, iconClass, label }) => {
  if (isRealLink(href)) {
    return (
      <a
        href={href}
        className={linkButtonClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className={iconClass} aria-hidden />
        {label}
      </a>
    )
  }
  return (
    <span className={disabledButtonClass} aria-disabled="true" title="Not available yet">
      <i className={iconClass} aria-hidden />
      {label}
    </span>
  )
}

const ProjectCard = ({ project, index, prefersReducedMotion }) => (
  <motion.article
    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-48px' }}
    transition={
      prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.4, delay: Math.min(index * 0.07, 0.5), ease: [0.22, 1, 0.36, 1] }
    }
    className="relative group h-full"
  >
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#112240]/80 shadow-xl backdrop-blur-sm transition-colors duration-300 hover:border-[#ff6b9d]/35 hover:bg-[#112240]">
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <ShineBorder
          shineColor={['#ff6b9d', '#A07CFE', '#ff6b9d']}
          duration={14}
          borderWidth={2}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-video shrink-0 bg-[#0d1b2f]">
          {project.images && project.images.length > 0 ? (
            <AnimatedImageCarousel
              images={project.images}
              interval={3000}
              className="h-full w-full"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className={`h-full w-full bg-[#0d1b2f] ${
                project.id === 9 ? 'object-contain' : 'object-cover'
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e3a5f]/50 to-[#0a192f]">
              <i
                className={`${project.icon} text-5xl text-[#ff6b9d]/60 md:text-6xl`}
                aria-hidden
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="mb-2 text-lg font-bold leading-snug text-white md:text-xl">
            {project.title}
          </h3>
          {project.role && (
            <p className="mb-2 text-sm text-white/70">
              <span className="font-semibold text-white/90">Role:</span> {project.role}
            </p>
          )}
          <p className="mb-4 line-clamp-4 flex-1 text-sm leading-relaxed text-white/75 md:text-base">
            {project.description}
          </p>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/90 transition-colors hover:border-[#ff6b9d]/45 md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3">
            <ProjectCta href={project.github} iconClass="fab fa-github" label="Code" />
            <ProjectCta
              href={project.demo}
              iconClass="fas fa-external-link-alt"
              label="Live Demo"
            />
          </div>
        </div>
      </div>
    </div>
  </motion.article>
)

const Projects = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0a192f] py-20 text-white md:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-[#1e3a5f] opacity-25 mix-blend-screen blur-3xl filter animate-blob" />
        <div className="animation-delay-2000 absolute right-10 top-40 h-72 w-72 rounded-full bg-[#2d4a6e] opacity-20 mix-blend-screen blur-3xl filter animate-blob" />
        <div className="animation-delay-4000 absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1e3a5f] opacity-20 mix-blend-screen blur-3xl filter animate-blob" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <header className="mb-14 text-center md:mb-16">
          <p className="mb-4 font-mono text-lg text-[#ff6b9d]">Portfolio</p>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            My Projects
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            A sample of products and platforms I have designed and shipped—SaaS, automation, and
            full-stack applications.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
