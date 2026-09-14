import { useReducedMotion } from 'framer-motion'
import {
  frontendSkills, backendSkills, databaseSkills,
  versionControlSkills, cloudDeploymentSkills, testingSkills, aiSkills,
} from '../../constants/skills'

const allSkills = [
  ...aiSkills,
  ...backendSkills,
  ...frontendSkills,
  ...databaseSkills,
  ...cloudDeploymentSkills,
  ...testingSkills,
  ...versionControlSkills,
].map((s) => s.title)

const rowA = allSkills.filter((_, i) => i % 2 === 0)
const rowB = allSkills.filter((_, i) => i % 2 === 1)

const MarqueeRow = ({ items, reverse, reduced }) => {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex w-max gap-3 ${
          reduced ? '' : reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
      >
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-ink-100"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const TechnicalSkills = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="skills" className="overflow-hidden bg-ink py-24 text-ink-50 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
          Skills
        </p>
        <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          The stack I trust in production.
        </h2>
      </div>

      <div className="space-y-2 border-y border-white/10 py-4">
        <MarqueeRow items={rowA} reduced={prefersReducedMotion} />
        <MarqueeRow items={rowB} reverse reduced={prefersReducedMotion} />
      </div>
    </section>
  )
}

export default TechnicalSkills
