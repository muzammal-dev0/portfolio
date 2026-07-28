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
            className="shrink-0 rounded-full border border-night-200/15 bg-night-800/60 px-5 py-2.5 font-mono text-sm text-night-100"
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
    <section id="skills" className="overflow-hidden bg-night py-24 md:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:pl-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Toolkit
        </p>
        <h2 className="max-w-xl font-display text-4xl font-extrabold tracking-tight text-night-50 md:text-5xl">
          What I reach for when shipping real systems.
        </h2>
      </div>

      <div className="space-y-2 border-y border-night-200/10 py-4">
        <MarqueeRow items={rowA} reduced={prefersReducedMotion} />
        <MarqueeRow items={rowB} reverse reduced={prefersReducedMotion} />
      </div>
    </section>
  )
}

export default TechnicalSkills
