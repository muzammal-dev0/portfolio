import { workExperience } from '../../constants/experience'
import { BorderBeam } from '../magicui/BorderBeam'

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Work Experience
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {workExperience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-hidden"
            >
              <BorderBeam
                size={60}
                duration={6}
                delay={index * 0.2}
                colorFrom="#ffaa40"
                colorTo="#9c40ff"
                borderWidth={2}
              />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">
                      {exp.company}
                    </p>
                    <p className="text-gray-600">{exp.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mt-6">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-700 leading-relaxed"
                    >
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

