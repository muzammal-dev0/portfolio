import { Link } from 'react-router-dom'
import { projects } from '../../constants/projects'
import LogSection from '../layout/LogSection'

const splitTitle = (title) => {
  const [name, ...rest] = title.split(' — ')
  return { name, tagline: rest.join(' — ') }
}

const Projects = () => (
  <LogSection id="projects" label="Projects" title="Selected work.">
    <ul className="border-t border-ink-200">
      {projects.map((project) => {
        const { name, tagline } = splitTitle(project.title)
        return (
          <li key={project.id} className="border-b border-ink-200">
            <Link to={`/project/${project.slug}`} className="group block py-7 md:py-10">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                    {name}
                  </span>
                </h3>
                <i
                  className="fas fa-arrow-right shrink-0 text-sm text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-ink-900"
                  aria-hidden
                />
              </div>
              {tagline && <p className="mt-1 text-[15px] text-ink-500 md:text-base">{tagline}</p>}
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600 md:mt-4 md:text-base">{project.description}</p>
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.06em] text-ink-500 md:text-xs md:tracking-[0.08em]">
                {project.technologies.slice(0, 5).join(' / ')}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  </LogSection>
)

export default Projects
