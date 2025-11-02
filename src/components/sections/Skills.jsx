import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  versionControlSkills,
  cloudDeploymentSkills,
  testingSkills,
  projectManagementSkills,
  toolsAndOtherSkills,
} from '../../constants/skills'
import { IconCloud } from '@/components/ui/icon-cloud'
import { iconCloudImages } from '../../constants/iconCloudSkills'
import { BorderBeam } from '../magicui/BorderBeam'

const Skills = () => {
  // Organize skills by category
  const skillCategories = [
    { title: 'Frontend', skills: frontendSkills },
    { title: 'Backend', skills: backendSkills },
    { title: 'Database', skills: databaseSkills },
    { title: 'Version Control & Collaboration', skills: versionControlSkills },
    { title: 'Cloud and Deployment', skills: cloudDeploymentSkills },
    { title: 'Testing & Code Quality', skills: testingSkills },
    { title: 'Project Management & Collaboration', skills: projectManagementSkills },
    { title: 'Tools & Other Technologies', skills: toolsAndOtherSkills },
  ]

  // Calculate total index for BorderBeam delay
  let globalIndex = 0

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Skill Names by Category */}
          <div className="w-full lg:w-1/2 space-y-8">
            {skillCategories.map((category, categoryIndex) => {
              if (category.skills.length === 0) return null
              
              const categoryStartIndex = globalIndex
              
              return (
                <div key={categoryIndex} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-700 border-b-2 border-blue-500 pb-2">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => {
                      const currentIndex = categoryStartIndex + skillIndex
                      globalIndex++
                      
                      return (
                        <div
                          key={skillIndex}
                          className="relative bg-white rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                        >
                          <div className="flex items-center justify-center gap-2 relative z-10">
                            {skill.iconUrl ? (
                              <>
                                <img 
                                  src={skill.iconUrl} 
                                  alt={skill.title}
                                  className="w-5 h-5 md:w-6 md:h-6"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextElementSibling.style.display = 'inline'
                                  }}
                                />
                                <i 
                                  className={`${skill.icon} ${skill.iconColor || 'text-gray-600'} text-lg md:text-xl`}
                                  style={{ display: 'none' }}
                                ></i>
                              </>
                            ) : (
                              <i className={`${skill.icon} ${skill.iconColor || 'text-gray-600'} text-lg md:text-xl`}></i>
                            )}
                            <h3 className="text-sm md:text-base font-semibold text-gray-800">
                              {skill.title}
                            </h3>
                          </div>
                          <BorderBeam 
                            size={60}
                            duration={6}
                            delay={currentIndex * 0.1}
                            colorFrom="#ffaa40"
                            colorTo="#9c40ff"
                            borderWidth={2}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side - Icon Cloud */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <div className="relative w-full h-[1000px]">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center" style={{ alignItems: 'flex-start', paddingTop: '0' }}>
                <IconCloud images={iconCloudImages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
