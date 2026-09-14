import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../constants/projects'

const Projects = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="bg-ink-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
              Work
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Selected projects
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-400">
            SaaS, Agentic AI, healthcare, and GIS — shipped for real users.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: Math.min(index * 0.05, 0.3) }
              }
              className={`group flex flex-col rounded-[1.75rem] border border-ink/8 bg-white p-7 transition hover:border-mark/30 hover:shadow-[0_20px_50px_-30px_rgba(17,17,17,0.35)] md:p-8 ${
                index === 0 ? 'md:col-span-2 md:flex-row md:items-stretch md:gap-10' : ''
              }`}
            >
              <div
                className={`mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-50 text-mark transition group-hover:bg-mark group-hover:text-white ${
                  index === 0 ? 'md:mb-0 md:h-auto md:w-28 md:rounded-3xl' : ''
                }`}
              >
                <i className={`${project.icon ?? 'fas fa-code'} text-lg`} aria-hidden />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h3
                  className={`font-display font-bold tracking-tight text-ink ${
                    index === 0 ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
                  }`}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="transition hover:text-mark focus:outline-none focus-visible:ring-2 focus-visible:ring-mark"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className={`mt-3 text-sm leading-relaxed text-ink-500 ${index === 0 ? 'max-w-2xl md:text-base' : 'line-clamp-3'}`}>
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, index === 0 ? 7 : 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-ink-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/project/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition group-hover:text-mark"
                >
                  View case
                  <i className="fas fa-arrow-right text-[10px] transition group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
