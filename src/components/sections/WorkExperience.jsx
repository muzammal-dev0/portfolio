import { useState } from 'react'
import { workExperience } from '../../constants/experience'

const formatDate = (dateString) => {
  if (dateString === 'CURRENT') return 'Now'
  const parts = dateString.split('/')
  if (parts.length === 3) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${months[parseInt(parts[1], 10) - 1]} ${parts[2]}`
  }
  return dateString
}

const formatPosition = (position) => position.replace(/ASSOCIATE\s+/i, '').trim()

const WorkExperience = () => {
  const [openId, setOpenId] = useState(workExperience[0]?.id ?? null)

  return (
    <section id="experience" className="bg-night py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:pl-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Path
        </p>
        <h2 className="mb-14 max-w-lg font-display text-4xl font-extrabold tracking-tight text-night-50 md:text-5xl">
          Places I&apos;ve built and shipped from.
        </h2>

        <div className="space-y-3">
          {workExperience.map((exp) => {
            const isOpen = openId === exp.id
            return (
              <div
                key={exp.id}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen
                    ? 'border-signal/40 bg-night-800/80'
                    : 'border-night-200/10 bg-night-800/40 hover:border-night-200/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  className="flex w-full flex-col gap-3 px-6 py-5 text-left md:flex-row md:items-center md:justify-between md:px-8 md:py-6"
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3 className="font-display text-xl font-bold text-night-50 md:text-2xl">
                      {formatPosition(exp.position)}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-signal">
                      {exp.company}
                      <span className="text-night-400"> · {exp.location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-night-300">
                      {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                    </span>
                    <i
                      className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-night-400`}
                      aria-hidden
                    />
                  </div>
                </button>

                {isOpen && (
                  <ul className="space-y-3 border-t border-night-200/10 px-6 pb-6 pt-4 md:px-8 md:pb-8">
                    {exp.responsibilities.slice(0, 5).map((resp, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-night-200 md:text-base">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience
