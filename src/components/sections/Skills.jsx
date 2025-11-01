import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  devOpsSkills,
} from '../../constants/skills'
import { IconCloud } from '@/components/ui/icon-cloud'
import { iconCloudImages } from '../../constants/iconCloudSkills'

const Skills = () => {
  // Combine all skills into a single array
  const allSkills = [
    ...frontendSkills,
    ...backendSkills,
    ...databaseSkills,
    ...devOpsSkills,
  ]

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          My Skills
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Left Side - Skill Names */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-sm md:text-base font-semibold text-gray-800">
                    {skill.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Icon Cloud */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <IconCloud images={iconCloudImages} />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-gray-500 px-4 py-2">
                <p className="text-center whitespace-nowrap">
                  <i className="fas fa-mouse mr-2"></i>
                  Click and drag to rotate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
