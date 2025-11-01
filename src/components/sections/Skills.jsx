import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  devOpsSkills,
} from '../../constants/skills'

const SkillCard = ({ skill }) => (
  <div className={`${skill.cardClass} p-8 hover:shadow-xl transition`}>
    <div className={`text-4xl ${skill.iconColor} mb-4`}>
      <i className={skill.icon}></i>
    </div>
    <h3 className={`text-xl font-bold mb-2 ${skill.textColor}`}>{skill.title}</h3>
    <p className={skill.textColor}>{skill.description}</p>
  </div>
)

const SkillsSection = ({ title, skills }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-6 text-gray-700 border-b border-gray-300 pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </div>
  </div>
)

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>
        <SkillsSection title="Frontend Development" skills={frontendSkills} />
        <SkillsSection title="Backend Development" skills={backendSkills} />
        <SkillsSection title="Database Skills" skills={databaseSkills} />
        <SkillsSection title="DevOps & Tools" skills={devOpsSkills} />
      </div>
    </section>
  )
}

export default Skills
