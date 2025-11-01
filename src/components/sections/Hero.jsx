import { handleNavClick } from '../../utils/scroll'
import { personalInfo } from '../../constants/personalInfo'
import { AnimatedGradient } from '../magicui/AnimatedGradient'
import { ShimmerButton } from '../magicui/ShimmerButton'

const Hero = () => {
  return (
    <section id="home" className="relative py-20 text-white overflow-hidden">
      <AnimatedGradient className="absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Hi, I'm{' '}
            <span className="text-yellow-300 whitespace-nowrap">
              {personalInfo.name}
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6">{personalInfo.title}</h2>
          <p className="text-xl mb-8">{personalInfo.bio.short}</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <ShimmerButton
              onClick={(e) => handleNavClick(e, 'contact')}
              className="bg-white text-blue-600 hover:bg-gray-200 font-semibold"
            >
              Contact Me
            </ShimmerButton>
            <ShimmerButton
              onClick={(e) => handleNavClick(e, 'projects')}
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 font-semibold"
            >
              View My Work
            </ShimmerButton>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-white p-2 shadow-2xl">
            <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
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
