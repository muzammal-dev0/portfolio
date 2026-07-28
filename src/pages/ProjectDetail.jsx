import { Link, useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug } from '../constants/projects'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { personalInfo } from '../constants/personalInfo'

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : null

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-night font-sans text-night-50 antialiased lg:pl-16">
      <div className="site-grain" aria-hidden />
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/#projects"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-night-400 transition hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <i className="fas fa-arrow-left text-[10px]" aria-hidden />
          Back to work
        </Link>

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Project
        </p>

        <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {project.title}
        </h1>

        {project.role && (
          <p className="mb-10 font-mono text-sm text-night-400">
            Role: <span className="text-signal">{project.role}</span>
          </p>
        )}

        <div className="mb-10 flex aspect-video items-center justify-center rounded-2xl border border-night-200/10 bg-night-800">
          <i
            className={`${project.icon ?? 'fas fa-code'} text-6xl text-signal/25 md:text-7xl`}
            aria-hidden
          />
        </div>

        <p className="mb-10 text-base leading-relaxed text-night-200 md:text-lg">
          {project.description}
        </p>

        {project.bullets?.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 font-display text-xl font-bold md:text-2xl">Highlights</h2>
            <ul className="space-y-3">
              {project.bullets.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-night-200 md:text-base">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-5 font-display text-xl font-bold md:text-2xl">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-night-200/15 bg-night-800 px-3 py-1.5 font-mono text-xs text-night-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-night-200/10 pt-10">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-night transition hover:bg-night-50"
          >
            Discuss this project
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-night-200/20 px-6 py-3 font-mono text-xs uppercase tracking-wider text-night-200 transition hover:border-signal hover:text-signal"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-night-200/20 px-6 py-3 font-mono text-xs uppercase tracking-wider text-night-200 transition hover:border-signal hover:text-signal"
            >
              GitHub
            </a>
          )}
        </div>

        <p className="mt-12 font-mono text-xs text-night-400">
          Questions?{' '}
          <a href={`mailto:${personalInfo.email}`} className="text-signal transition hover:underline">
            {personalInfo.email}
          </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail
