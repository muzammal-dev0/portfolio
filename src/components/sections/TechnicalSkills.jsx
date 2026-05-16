import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  versionControlSkills,
  cloudDeploymentSkills,
  testingSkills,
  projectManagementSkills,
} from '../../constants/skills'

const categories = [
  {
    title: 'Frontend',
    skills: frontendSkills,
    icon: 'fas fa-code',
    iconBg: 'bg-blue-600',
  },
  {
    title: 'Backend',
    skills: backendSkills,
    icon: 'fas fa-server',
    iconBg: 'bg-emerald-600',
  },
  {
    title: 'Database',
    skills: databaseSkills,
    icon: 'fas fa-database',
    iconBg: 'bg-violet-600',
  },
  {
    title: 'Version control & collaboration',
    skills: versionControlSkills,
    icon: 'fas fa-code-branch',
    iconBg: 'bg-indigo-600',
  },
  {
    title: 'Cloud & DevOps',
    skills: cloudDeploymentSkills,
    icon: 'fas fa-cloud',
    iconBg: 'bg-orange-500',
  },
  {
    title: 'Testing & quality',
    skills: testingSkills,
    icon: 'fas fa-vial',
    iconBg: 'bg-pink-600',
  },
  {
    title: 'Project management',
    skills: projectManagementSkills,
    icon: 'fas fa-wrench',
    iconBg: 'bg-amber-500',
  },
].filter((c) => c.skills.length > 0)

const TechnicalSkills = () => {
  return (
    <section id="skills" className="border-y border-slate-200 bg-slate-100 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Technical Skills
          </h2>
          <p className="text-lg text-slate-600 md:text-xl">
            A comprehensive toolkit for building modern, scalable applications.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-200/50 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${cat.iconBg} text-white shadow-sm`}
                >
                  <i className={`${cat.icon} text-lg`} aria-hidden />
                </div>
                <h3 className="pt-1 text-lg font-bold text-slate-900">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.title}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
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
