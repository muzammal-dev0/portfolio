import { personalInfo } from '../../constants/personalInfo'
import { projects } from '../../constants/projects'
import {
  frontendSkills, backendSkills, databaseSkills,
  versionControlSkills, cloudDeploymentSkills, testingSkills, aiSkills,
} from '../../constants/skills'

const techCount =
  frontendSkills.length + backendSkills.length + databaseSkills.length +
  versionControlSkills.length + cloudDeploymentSkills.length + testingSkills.length + aiSkills.length

const stats = [
  { value: `${projects.length}+`, label: 'Projects shipped' },
  { value: '3+', label: 'Years building' },
  { value: '5+', label: 'Teams & clients' },
  { value: `${techCount}+`, label: 'Technologies' },
]

const About = () => {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">02</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Heading with watermark number */}
        <div className="relative mb-14 overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 left-0 select-none font-display text-[7rem] font-bold leading-none text-stone-100 md:text-[10rem]"
          >
            02
          </span>
          <h2 className="relative font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — bio */}
          <div>
            <div className="space-y-5 text-base leading-relaxed text-stone-500 md:text-lg">
              <p>{personalInfo.bio.long[0]}</p>
              <p>{personalInfo.bio.long[1]}</p>
            </div>

            <div className="mt-10 h-px bg-stone-200" />

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={personalInfo.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-stone-300 px-5 py-2.5 font-mono text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                <i className="fas fa-file-alt text-xs" aria-hidden />
                Download CV
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-stone-300 px-5 py-2.5 font-mono text-sm text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
              >
                <i className="fab fa-github text-xs" aria-hidden />
                GitHub
              </a>
            </div>
          </div>

          {/* Right — stats */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="group border border-stone-200 bg-stone-50 p-6 transition hover:border-[#FF3D00]/30"
                >
                  <p className="mb-1 font-display text-4xl font-bold text-[#FF3D00]">{s.value}</p>
                  <p className="font-mono text-xs uppercase tracking-wider text-stone-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Specialisation note */}
            <div className="mt-4 border-l-4 border-[#FF3D00] bg-stone-50 py-4 pl-5 pr-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[#FF3D00]">Specialises in</p>
              <p className="mt-1 text-sm text-stone-600">
                Multi-tenant SaaS · AI/LLM pipelines · GIS (ArcGIS, PostGIS) · Cloud (AWS, GCP)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
