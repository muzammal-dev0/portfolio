import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../constants/projects'

const ProjectCard = ({ project, index, prefersReducedMotion }) => (
  <motion.article
    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-48px' }}
    transition={
      prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.5, delay: Math.min(index * 0.07, 0.42), ease: [0.22, 1, 0.36, 1] }
    }
    className="group relative flex flex-col overflow-hidden border border-stone-200 bg-white p-6 transition hover:border-[#FF3D00]/40 md:p-8"
  >
    {/* Top accent line — reveals on hover */}
    <div className="absolute inset-x-0 top-0 h-0.5 bg-[#FF3D00] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

    {/* Project number */}
    <span className="mb-4 block font-display text-5xl font-bold text-stone-100 transition group-hover:text-[#FF3D00]/20 leading-none">
      {String(index + 1).padStart(2, '0')}
    </span>

    {/* Icon + title */}
    <div className="mb-3 flex items-start gap-3">
      <i
        className={`${project.icon ?? 'fas fa-code'} mt-1 text-sm text-[#FF3D00]`}
        aria-hidden
      />
      <h3 className="font-display text-xl font-bold leading-tight text-stone-900 md:text-2xl">
        <Link
          to={`/project/${project.slug}`}
          className="rounded outline-none transition hover:text-[#FF3D00] focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
        >
          {project.title}
        </Link>
      </h3>
    </div>

    {/* Description */}
    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-stone-500">
      {project.description}
    </p>

    {/* Tech tags */}
    <div className="mt-auto mb-6 flex flex-wrap gap-1.5">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-500"
        >
          {tech}
        </span>
      ))}
    </div>

    {/* Footer row */}
    <div className="flex items-center justify-between border-t border-stone-100 pt-4">
      <Link
        to={`/project/${project.slug}`}
        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-stone-700 transition hover:text-[#FF3D00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
      >
        View details
        <i className="fas fa-arrow-right text-[10px]" aria-hidden />
      </Link>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-stone-400 transition hover:text-[#FF3D00]"
          aria-label={`Live demo for ${project.title}`}
        >
          <i className="fas fa-external-link-alt" aria-hidden />
        </a>
      )}
    </div>
  </motion.article>
)

const Projects = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">04</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Heading with watermark */}
        <div className="relative mb-14 overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 left-0 select-none font-display text-[7rem] font-bold leading-none text-stone-100 md:text-[10rem]"
          >
            04
          </span>
          <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Projects
            </h2>
            <p className="max-w-xs font-mono text-xs text-stone-400 md:pb-2">
              Selected work across SaaS, AI, GIS, and cloud.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
