import { workExperience } from '../../constants/experience'

const formatDate = (dateString) => {
  if (dateString === 'CURRENT') return 'Present'
  const parts = dateString.split('/')
  if (parts.length === 3) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${months[parseInt(parts[1], 10) - 1]} ${parts[2]}`
  }
  return dateString
}

const formatPosition = (position) => position.replace(/ASSOCIATE\s+/i, '').trim()

const WorkExperience = () => {
  return (
    <section id="experience" className="bg-stone-50 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">05</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Heading with watermark */}
        <div className="relative mb-14 overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 left-0 select-none font-display text-[7rem] font-bold leading-none text-stone-100 md:text-[10rem]"
          >
            05
          </span>
          <h2 className="relative font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute bottom-0 left-[19px] top-2 w-0.5 bg-gradient-to-b from-[#FF3D00]/60 via-stone-200 to-transparent md:left-[23px]"
            aria-hidden
          />

          <ul className="space-y-10">
            {workExperience.map((exp) => (
              <li key={exp.id} className="relative flex gap-8 md:gap-10">
                {/* Dot */}
                <div className="relative z-10 flex w-10 shrink-0 justify-center pt-6">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full border-2 border-[#FF3D00] bg-stone-50 shadow-[0_0_0_3px_rgba(255,61,0,0.12)]"
                    aria-hidden
                  />
                </div>

                {/* Card */}
                <article className="min-w-0 flex-1 border border-stone-200 bg-white p-6 md:p-8">
                  {/* Header */}
                  <div className="mb-5 flex flex-col gap-3 border-b border-stone-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-stone-900 sm:text-2xl">
                        {formatPosition(exp.position)}
                      </h3>
                      <p className="mt-1 font-mono text-sm font-semibold text-[#FF3D00]">
                        {exp.company}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-stone-400">{exp.location}</p>
                    </div>
                    <div className="shrink-0 border border-stone-200 bg-stone-50 px-3 py-1.5">
                      <span className="font-mono text-xs text-stone-500">
                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-3">
                    {exp.responsibilities.slice(0, 5).map((resp, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-500 md:text-base">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#FF3D00]/50" aria-hidden />
                        <span>{resp}</span>
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
