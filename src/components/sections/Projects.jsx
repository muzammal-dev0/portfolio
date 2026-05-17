import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../constants/projects'

const outlineDetailsClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-violet-400 hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2'

const ProjectCard = ({ project, index, prefersReducedMotion }) => (
  <motion.article
    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-48px' }}
    transition={
      prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.35, delay: Math.min(index * 0.06, 0.45), ease: [0.22, 1, 0.36, 1] }
    }
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md shadow-slate-200/60 transition-shadow hover:shadow-xl"
  >
    <div className="relative aspect-video shrink-0 bg-violet-50/90">
      <div className="flex h-full w-full items-center justify-center">
        <i
          className={`${project.icon ?? 'fas fa-code'} text-5xl text-violet-500 md:text-6xl`}
          aria-hidden
        />
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5 md:p-6">
      <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
        <Link
          to={`/project/${project.slug}`}
          className="rounded-sm transition-colors hover:text-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        >
          {project.title}
        </Link>
      </h3>
      {project.role && (
        <p className="mb-2 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Role:</span> {project.role}
        </p>
      )}
      <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-600 md:text-base">
        {project.description}
      </p>
      {project.bullets && project.bullets.length > 0 && (
        <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          {project.bullets.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
      <div className="mb-5 flex flex-wrap gap-2">
        {project.technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-900"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <Link to={`/project/${project.slug}`} className={outlineDetailsClass}>
          Details
        </Link>
      </div>
    </div>
  </motion.article>
)

const Projects = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="border-y border-slate-200 bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="mb-14 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            A selection of projects that showcase my skills and experience.
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
