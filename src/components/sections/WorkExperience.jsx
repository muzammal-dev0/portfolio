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
    <section id="experience" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
          Experience
        </p>
        <h2 className="mb-12 max-w-lg font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Where I&apos;ve been building.
        </h2>

        <div className="space-y-4">
          {workExperience.map((exp) => {
            const isOpen = openId === exp.id
            return (
              <div
                key={exp.id}
                className={`overflow-hidden rounded-[1.5rem] border transition ${
                  isOpen
                    ? 'border-mark/25 bg-ink-50'
                    : 'border-ink/10 bg-white hover:border-ink/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  className="flex w-full flex-col gap-3 px-6 py-5 text-left md:flex-row md:items-center md:justify-between md:px-8 md:py-6"
                  aria-expanded={isOpen}
                >
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink md:text-2xl">
                      {formatPosition(exp.position)}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-mark">
                      {exp.company}
                      <span className="font-normal text-ink-400"> · {exp.location}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[11px] text-ink-500">
                      {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                    </span>
                    <i
                      className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs text-ink-400`}
                      aria-hidden
                    />
                  </div>
                </button>

                {isOpen && (
                  <ul className="space-y-3 border-t border-ink/10 px-6 pb-6 pt-4 md:px-8 md:pb-8">
                    {exp.responsibilities.slice(0, 5).map((resp, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-500 md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mark" aria-hidden />
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
