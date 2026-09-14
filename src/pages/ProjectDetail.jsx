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
    <div className="min-h-screen bg-ink-50 font-sans text-ink antialiased">
      <div className="site-grain" aria-hidden />
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/#projects"
          className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition hover:text-mark"
        >
          <i className="fas fa-arrow-left text-[10px]" aria-hidden />
          Back to work
        </Link>

        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
          Project
        </p>

        <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {project.title}
        </h1>

        {project.role && (
          <p className="mb-10 text-sm text-ink-400">
            Role: <span className="font-semibold text-mark">{project.role}</span>
          </p>
        )}

        <div className="mb-10 flex aspect-video items-center justify-center rounded-[1.75rem] bg-ink text-mark/40">
          <i className={`${project.icon ?? 'fas fa-code'} text-6xl md:text-7xl`} aria-hidden />
        </div>

        <p className="mb-10 text-base leading-relaxed text-ink-500 md:text-lg">
          {project.description}
        </p>

        {project.bullets?.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 font-display text-xl font-bold md:text-2xl">Highlights</h2>
            <ul className="space-y-3">
              {project.bullets.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-500 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mark" aria-hidden />
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
                className="rounded-full bg-white px-3 py-1.5 font-mono text-xs text-ink-500 shadow-sm ring-1 ring-ink/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-ink/10 pt-10">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ink-50 transition hover:bg-mark"
          >
            Discuss this project
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              GitHub
            </a>
          )}
        </div>

        <p className="mt-12 text-sm text-ink-400">
          Questions?{' '}
          <a href={`mailto:${personalInfo.email}`} className="font-semibold text-mark hover:underline">
            {personalInfo.email}
          </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail
