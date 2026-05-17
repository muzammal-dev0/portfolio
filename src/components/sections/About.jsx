import ProfileImage from '../ProfileImage'
import { personalInfo } from '../../constants/personalInfo'
import { projects } from '../../constants/projects'
import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  versionControlSkills,
  cloudDeploymentSkills,
  testingSkills,
  aiSkills,
} from '../../constants/skills'

const About = () => {
  const techCount =
    frontendSkills.length +
    backendSkills.length +
    databaseSkills.length +
    versionControlSkills.length +
    cloudDeploymentSkills.length +
    testingSkills.length +
    aiSkills.length

  const stats = [
    { value: `${projects.length}+`, label: 'Projects completed' },
    { value: '3+', label: 'Years experience' },
    { value: '5+', label: 'Teams & clients' },
    { value: `${techCount}+`, label: 'Technologies' },
  ]

  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            <h2 className="mb-6 text-left text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              About Me
            </h2>
            <div className="mb-10 max-w-xl space-y-5 text-left text-lg leading-relaxed text-slate-600 md:text-xl">
              <p>{personalInfo.bio.long[0]}</p>
              <p>{personalInfo.bio.long[1]}</p>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <p className="text-3xl font-bold text-violet-600 md:text-4xl">{s.value}</p>
                  <p className="text-sm font-medium text-slate-500 md:text-base">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-md flex-1 justify-center lg:mx-0 lg:max-w-none lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-200/60 to-violet-400/20 blur-2xl"
                aria-hidden
              />
              <ProfileImage
                alt={personalInfo.name}
                className="relative w-full rounded-2xl object-cover shadow-xl ring-1 ring-slate-200/80 aspect-[4/5] max-h-[480px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
