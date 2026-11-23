import {
  frontendSkills, backendSkills, databaseSkills,
  versionControlSkills, cloudDeploymentSkills, testingSkills, integrationSkills, aiSkills,
} from '../../constants/skills'
import LogSection from '../layout/LogSection'

const groups = [
  { name: 'AI & LLM', items: aiSkills },
  { name: 'Backend', items: backendSkills },
  { name: 'Frontend', items: frontendSkills },
  { name: 'Data', items: databaseSkills },
  { name: 'Cloud & DevOps', items: cloudDeploymentSkills },
  { name: 'Testing', items: testingSkills },
  { name: 'Integrations', items: integrationSkills },
  { name: 'Version control', items: versionControlSkills },
].filter((g) => g.items.length)

const TechnicalSkills = () => (
  <LogSection id="skills" label="Stack" title="The tools I use in production.">
    <dl className="divide-y divide-ink-200 border-y border-ink-200">
      {groups.map((g) => (
        <div key={g.name} className="grid gap-1.5 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="text-sm font-bold text-ink-900">{g.name}</dt>
          <dd className="leading-relaxed text-ink-600">{g.items.map((s) => s.title).join(', ')}</dd>
        </div>
      ))}
    </dl>
  </LogSection>
)

export default TechnicalSkills
