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

        <div className="flex flex-col lg:flex-row gap-8 items-start">
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
