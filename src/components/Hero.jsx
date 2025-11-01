const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Hi, I'm{' '}
            <span className="text-yellow-300 whitespace-nowrap">
              Muzammal Hussain
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">Senior Software Engineer</h2>
          <p className="text-xl mb-8">
            With over 7+ years of experience building full stack websites for
            fintech, trading, and gaming platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
              className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              View My Work
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-white p-2 shadow-2xl">
            <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
              <img
                src="/images/profile.JPG"
                alt="Muzammal Hussain"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

