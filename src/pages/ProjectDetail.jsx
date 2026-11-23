import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, projects } from '../constants/projects'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { personalInfo } from '../constants/personalInfo'

const splitTitle = (title) => {
  const [name, ...rest] = title.split(' — ')
  return { name, tagline: rest.join(' — ') }
}

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const { name, tagline } = splitTitle(project.title)
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <div className="min-h-screen bg-ink-50 font-sans text-ink-900 antialiased">
      <Header />

      <main className="px-5 pb-20 pt-10 md:px-6 md:pb-28 md:pt-20">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-ink-900 underline-offset-[6px] hover:underline"
          >
            <i className="fas fa-arrow-left text-[10px]" aria-hidden />
            All projects
          </Link>

          <p className="eyebrow mt-10 md:mt-14">Project</p>
          <h1
            className="mt-4 font-bold leading-[1.04] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.25rem)' }}
          >
            {name}
          </h1>
          {tagline && <p className="mt-3 text-lg text-ink-500 md:text-xl">{tagline}</p>}

          <p className="mt-8 text-lg leading-relaxed text-ink-800 md:mt-10 md:text-[1.375rem] md:leading-[1.6]">
            {project.description}
          </p>

          {project.bullets?.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center gap-4">
                <h2 className="eyebrow shrink-0">Highlights</h2>
                <span className="h-px flex-1 bg-ink-200" aria-hidden />
              </div>
              <ul className="mt-8 space-y-4">
                {project.bullets.map((line, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-700 md:text-lg">
                    <span className="mt-[0.8em] h-px w-3 shrink-0 bg-ink-900" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-16">
            <div className="flex items-center gap-4">
              <h2 className="eyebrow shrink-0">Stack</h2>
              <span className="h-px flex-1 bg-ink-200" aria-hidden />
            </div>
            <p className="mt-6 font-mono text-sm uppercase leading-loose tracking-[0.06em] text-ink-700">
              {project.technologies.join(' / ')}
            </p>
          </section>

          <div className="mt-14 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`About ${name}`)}`}
              className="pill pill-solid"
            >
              Discuss this project
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pill">
                Live demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="pill">
                GitHub ↗
              </a>
            )}
          </div>

          {next && next.slug !== project.slug && (
            <Link to={`/project/${next.slug}`} className="group mt-16 block border-t border-ink-200 pt-8 md:mt-24">
              <p className="eyebrow">Next project</p>
              <p className="mt-3 flex items-center justify-between text-2xl font-bold tracking-tight md:text-3xl">
                {splitTitle(next.title).name}
                <i className="fas fa-arrow-right text-base transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
            </Link>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}

export default ProjectDetail
