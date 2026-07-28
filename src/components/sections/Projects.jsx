import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../constants/projects'

const Projects = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="bg-night-50 py-24 text-night md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:pl-8">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal-dim">
              Selected work
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Projects that went live.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-night-400">
            SaaS, Agentic AI, healthcare, GIS — built for real users and real constraints.
          </p>
        </div>

        <ul className="divide-y divide-night-100 border-y border-night-100">
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, delay: Math.min(index * 0.05, 0.3) }
              }
            >
              <Link
                to={`/project/${project.slug}`}
                className="group flex flex-col gap-4 py-8 transition md:flex-row md:items-center md:gap-10 md:py-10"
              >
                <span className="shrink-0 font-mono text-xs text-night-300 md:w-10">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl font-bold tracking-tight transition group-hover:text-signal-dim md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-night-400 md:text-base">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-night-100/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-night-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-night-400 transition group-hover:text-signal-dim md:shrink-0">
                  Open
                  <i className="fas fa-arrow-right text-[10px] transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Projects
