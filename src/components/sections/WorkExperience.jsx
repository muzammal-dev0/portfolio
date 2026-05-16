import { workExperience } from '../../constants/experience'

const formatYear = (dateString) => {
  if (dateString === 'CURRENT') return 'Present'
  const parts = dateString.split('/')
  if (parts.length === 3) return parts[2]
  return dateString
}

const formatPosition = (position) => position.replace(/ASSOCIATE\s+/i, '').trim()

const WorkExperience = () => {
  return (
    <section id="experience" className="border-t border-slate-200 bg-slate-100 py-20 md:py-28">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="mb-14 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Work Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            My professional journey in software development.
          </p>
        </header>

        <div className="relative">
          <div
            className="absolute bottom-8 left-5 top-8 w-0.5 -translate-x-1/2 bg-violet-300"
            aria-hidden
          />
          <ul className="relative space-y-8">
            {workExperience.map((exp) => (
              <li key={exp.id} className="relative flex gap-6 sm:gap-8">
                <div className="relative z-10 flex w-10 shrink-0 justify-center pt-7">
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border-[3px] border-slate-100 bg-violet-600 shadow-sm ring-2 ring-violet-200"
                    aria-hidden
                  />
                </div>
                <article className="min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-200/50 md:p-8">
                  <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                        {formatPosition(exp.position)}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-2 text-base font-semibold text-violet-600">
                        <i className="fas fa-building text-sm opacity-90" aria-hidden />
                        {exp.company}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{exp.location}</p>
                    </div>
                    <p className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-500 sm:pt-1">
                      <i className="far fa-calendar-alt text-violet-500" aria-hidden />
                      <span>
                        {formatYear(exp.startDate)} — {formatYear(exp.endDate)}
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-2.5 text-slate-700">
                    {exp.responsibilities.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex gap-3 text-base leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WorkExperience
