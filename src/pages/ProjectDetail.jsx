import { Link, useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug } from '../constants/projects'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { personalInfo } from '../constants/personalInfo'

const isRealLink = (url) => Boolean(url && url !== '#' && String(url).trim() !== '')

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : null

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <Link
          to="/#projects"
          className="mb-8 inline-flex items-center gap-2 rounded text-sm font-medium text-violet-600 transition hover:text-violet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
        >
          <i className="fas fa-arrow-left" aria-hidden />
          Back to projects
        </Link>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">{project.title}</h1>
        {project.role && (
          <p className="mb-6 text-lg text-slate-600">
            <span className="font-semibold text-slate-800">Role:</span> {project.role}
          </p>
        )}

        <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          <div className="relative aspect-video bg-violet-50/90">
            <div className="flex h-full w-full items-center justify-center">
              <i
                className={`${project.icon ?? 'fas fa-code'} text-6xl text-violet-500 md:text-7xl`}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-slate-700">{project.description}</p>

        {project.bullets && project.bullets.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-violet-600 md:text-2xl">Highlights</h2>
            <ul className="list-inside list-disc space-y-2 text-slate-700 md:text-lg">
              {project.bullets.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {project.note && (
          <p className="mb-10 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950">
            {project.note}
          </p>
        )}

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-violet-600 md:text-2xl">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          {isRealLink(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-400 hover:text-violet-700"
            >
              <i className="fab fa-github" aria-hidden />
              View code
            </a>
          )}
          {isRealLink(project.demo) && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-violet-600 bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-500"
            >
              <i className="fas fa-external-link-alt" aria-hidden />
              Live demo
            </a>
          )}
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-violet-400"
          >
            Discuss this project
          </Link>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Questions? Email{' '}
          <a href={`mailto:${personalInfo.email}`} className="font-medium text-violet-600 hover:underline">
            {personalInfo.email}
          </a>
          .
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default ProjectDetail
