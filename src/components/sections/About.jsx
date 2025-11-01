import { personalInfo } from '../../constants/personalInfo'

const About = () => {
  const infoItems = [
    { label: 'Name:', value: personalInfo.name },
    { label: 'Email:', value: personalInfo.email },
    { label: 'Location:', value: personalInfo.location },
    { label: 'Availability:', value: personalInfo.availability },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
            <div className="bg-gray-200 h-96 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-gray-600 text-lg">About Image</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">Who am I?</h3>
            {personalInfo.bio.long.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {infoItems.map((item, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-700">{item.label}</h4>
                  <p className="text-gray-600">{item.value}</p>
                </div>
              ))}
            </div>
            <a
              href={personalInfo.cvPath}
              download="CV.pdf"
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
