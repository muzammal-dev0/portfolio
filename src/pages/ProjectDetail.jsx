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
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/#projects"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs text-stone-400 transition hover:text-[#FF3D00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
        >
          <i className="fas fa-arrow-left text-[10px]" aria-hidden />
          Back to projects
        </Link>

        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">Project</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Title */}
        <h1 className="mb-4 font-display text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
          {project.title}
        </h1>

        {project.role && (
          <p className="mb-10 font-mono text-sm text-stone-400">
            Role:{' '}
            <span className="text-[#FF3D00]">{project.role}</span>
          </p>
        )}

        {/* Icon banner */}
        <div className="mb-10 overflow-hidden border border-stone-200 bg-white">
          <div className="relative flex aspect-video items-center justify-center bg-stone-50">
            <i
              className={`${project.icon ?? 'fas fa-code'} text-6xl text-[#FF3D00]/30 md:text-7xl`}
              aria-hidden
            />
            {/* Offset decorative frame */}
            <div className="pointer-events-none absolute inset-4 border border-[#FF3D00]/10" aria-hidden />
          </div>
        </div>

        {/* Description */}
        <p className="mb-10 text-base leading-relaxed text-stone-500 md:text-lg">
          {project.description}
        </p>

        {/* Highlights */}
        {project.bullets?.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 font-display text-xl font-bold text-stone-900 md:text-2xl">
              Highlights
            </h2>
            <ul className="space-y-3">
              {project.bullets.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-500 md:text-base">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#FF3D00]/50" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Stack */}
        <section className="mb-12">
          <h2 className="mb-5 font-display text-xl font-bold text-stone-900 md:text-2xl">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border border-stone-200 bg-white px-3 py-1.5 font-mono text-xs text-stone-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-10">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-[#FF3D00] px-5 py-2.5 font-mono text-sm font-semibold text-white transition hover:bg-[#e53500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00]"
          >
            Discuss this project →
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-300 px-5 py-2.5 font-mono text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
            >
              <i className="fas fa-external-link-alt text-xs" aria-hidden />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-300 px-5 py-2.5 font-mono text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
            >
              <i className="fab fa-github text-xs" aria-hidden />
              GitHub
            </a>
          )}
        </div>

        <p className="mt-12 font-mono text-xs text-stone-400">
          Questions?{' '}
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-[#FF3D00] transition hover:underline"
          >
            {personalInfo.email}
          </a>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail
