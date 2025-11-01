import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  devOpsSkills,
} from '../../constants/skills'
import { IconCloud } from '@/components/ui/icon-cloud'
import { iconCloudImages } from '../../constants/iconCloudSkills'
import { BorderBeam } from '../magicui/BorderBeam'

const Skills = () => {
  // Combine all skills into a single array
  const allSkills = [
    ...frontendSkills,
    ...backendSkills,
    ...databaseSkills,
    ...devOpsSkills,
  ]

  const handleImageError = (e, skill) => {
    // Fallback to Font Awesome icon if image fails to load
    e.target.style.display = 'none'
    // We'll use state to track this, but for now just hide and show FA icon
  }

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Skill Names */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allSkills.map((skill, index) => (
                <div
                  key={index}
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
                    delay={index * 0.1}
                    colorFrom="#ffaa40"
                    colorTo="#9c40ff"
                    borderWidth={2}
                  />
                </div>
              ))}
            </div>
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
