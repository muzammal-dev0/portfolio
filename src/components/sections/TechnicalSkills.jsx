import {
  frontendSkills, backendSkills, databaseSkills,
  versionControlSkills, cloudDeploymentSkills, testingSkills, aiSkills,
} from '../../constants/skills'

const categories = [
  { title: 'Frontend', skills: frontendSkills, icon: 'fas fa-code' },
  { title: 'Backend', skills: backendSkills, icon: 'fas fa-server' },
  { title: 'Database', skills: databaseSkills, icon: 'fas fa-database' },
  { title: 'AI & Automation', skills: aiSkills, icon: 'fas fa-brain' },
  { title: 'Cloud & DevOps', skills: cloudDeploymentSkills, icon: 'fas fa-cloud' },
  { title: 'Tooling & Testing', skills: [...testingSkills, ...versionControlSkills], icon: 'fas fa-tools' },
].filter((c) => c.skills.length > 0)

const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-stone-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">03</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Heading with watermark */}
        <div className="relative mb-14 overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 left-0 select-none font-display text-[7rem] font-bold leading-none text-stone-100 md:text-[10rem]"
          >
            03
          </span>
          <div className="relative flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
              Technical Skills
            </h2>
            <p className="max-w-xs font-mono text-xs text-stone-400 md:pb-2">
              Tools I use to build production systems.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group border border-stone-200 bg-white p-6 transition hover:border-[#FF3D00]/40"
            >
              {/* Category header */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#FF3D00]" aria-hidden />
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-stone-700">
                  {cat.title}
                </span>
                <i className={`${cat.icon} ml-auto text-xs text-stone-300`} aria-hidden />
              </div>

              {/* Divider */}
              <div className="mb-5 h-px bg-stone-100 group-hover:bg-[#FF3D00]/20 transition" />

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.title}
                    className="border border-stone-200 bg-stone-50 px-2.5 py-1 font-mono text-xs text-stone-600 transition group-hover:border-stone-300"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnicalSkills
