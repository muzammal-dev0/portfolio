import { personalInfo } from '../../constants/personalInfo'
import { projects } from '../../constants/projects'
import {
  frontendSkills, backendSkills, databaseSkills,
  versionControlSkills, cloudDeploymentSkills, testingSkills, aiSkills,
} from '../../constants/skills'

const techCount =
  frontendSkills.length + backendSkills.length + databaseSkills.length +
  versionControlSkills.length + cloudDeploymentSkills.length + testingSkills.length + aiSkills.length

const highlights = [
  { value: `${projects.length}+`, label: 'Products shipped' },
  { value: '3+', label: 'Years building' },
  { value: `${techCount}+`, label: 'Tools in use' },
]

const About = () => {
  return (
    <section id="about" className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
              About
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
              I build products that survive real traffic and real deadlines.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-ink-500 md:text-lg lg:col-span-7">
            {personalInfo.bio.long.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={personalInfo.cvPath}
                download="Muzammal-Hussain-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ink-50 transition hover:bg-mark"
              >
                Download CV
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-ink/10 pt-12 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-3xl bg-ink-50 p-6 md:p-8">
              <p className="font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-ink-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
