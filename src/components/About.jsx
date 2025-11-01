const About = () => {
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
            <p className="text-gray-600 mb-6 leading-relaxed">
              I'm a passionate Senior Software Engineer with a knack for creating
              beautiful, functional websites. With over 7 years of experience in the
              field, I've specialized in developing full stack solutions for fintech,
              trading, and gaming platforms.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or enjoying outdoor activities. I
              believe in continuous learning and pushing the boundaries of what's
              possible on the web.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-bold text-gray-700">Name:</h4>
                <p className="text-gray-600">Muzammal Hussain</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Email:</h4>
                <p className="text-gray-600">muzammal.dev0@gmail.com</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Location:</h4>
                <p className="text-gray-600">Lahore, Pakistan</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Availability:</h4>
                <p className="text-gray-600">Freelance/Full-time</p>
              </div>
            </div>
            <a
              href="/assets/CV.pdf"
              download
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

