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
  { value: `${projects.length}+`, label: 'Shipped products' },
  { value: '3+', label: 'Years in production' },
  { value: `${techCount}+`, label: 'Tools in rotation' },
]

const About = () => {
  return (
    <section id="about" className="bg-night-50 py-24 text-night md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:pl-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal-dim">
              Who I am
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              I turn messy product ideas into systems that hold up in production.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-night-500 md:text-lg">
            {personalInfo.bio.long.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={personalInfo.cvPath}
                download="Muzammal-Hussain-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-night px-6 py-3 font-mono text-xs uppercase tracking-wider text-night-50 transition hover:bg-signal hover:text-night"
              >
                Download CV
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-night-200 px-6 py-3 font-mono text-xs uppercase tracking-wider text-night-600 transition hover:border-night hover:text-night"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-night-100 pt-10 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label}>
              <p className="font-display text-5xl font-extrabold tracking-tight text-night md:text-6xl">
                {item.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-night-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
