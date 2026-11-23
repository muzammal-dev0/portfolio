import { workExperience } from '../../constants/experience'
import LogSection from '../layout/LogSection'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = (d) => {
  if (d === 'CURRENT') return 'Present'
  const [, m, y] = d.split('/')
  return m && y ? `${months[parseInt(m, 10) - 1]} ${y}` : d
}

const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

const WorkExperience = () => (
  <LogSection id="experience" label="Experience" title="Where I've worked.">
    <ol className="space-y-12 md:space-y-16">
      {workExperience.map((exp) => (
        <li key={exp.id} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <p className="pt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ink-500">
            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
          </p>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-ink-900 md:text-2xl">{titleCase(exp.position)}</h3>
            <p className="mt-1 text-ink-500">
              {titleCase(exp.company)}, {exp.location.split(', ').slice(-2).join(', ')}
            </p>
            <ul className="mt-5 space-y-3 md:mt-6">
              {exp.responsibilities.slice(0, 4).map((resp, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-600 md:text-base">
                  <span className="mt-[0.75em] h-px w-3 shrink-0 bg-ink-900" aria-hidden />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </LogSection>
)

export default WorkExperience
