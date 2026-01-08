import { useState, useEffect } from 'react'
import { personalInfo } from '../../constants/personalInfo'

const Sidebar = () => {
  const [isAboutVisible, setIsAboutVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0
        setIsAboutVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.socialLinks.github,
      icon: 'fab fa-github',
    },
    {
      name: 'LinkedIn',
      url: personalInfo.socialLinks.linkedin,
      icon: 'fab fa-linkedin',
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: 'fas fa-envelope',
    },
    {
      name: 'WhatsApp',
      url: personalInfo.socialLinks.whatsapp,
      icon: 'fab fa-whatsapp',
    },
  ]

  // Change colors based on About section visibility
  const iconColor = isAboutVisible ? 'text-white' : 'text-[#8892b0]'
  const iconHoverColor = isAboutVisible ? 'hover:text-white' : 'hover:text-[#ff6b9d]'
  const lineColor = isAboutVisible ? 'bg-white' : 'bg-[#64ffda]'
  const emailColor = isAboutVisible ? 'text-white' : 'text-[#8892b0]'
  const emailHoverColor = isAboutVisible ? 'hover:text-white' : 'hover:text-[#ff6b9d]'

  return (
    <>
      {/* Vertical Social Media Icons - Left Side */}
      <div className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center space-y-6 z-20">
        <div className={`w-px h-32 ${lineColor} transition-colors duration-300`}></div>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconColor} ${iconHoverColor} transition-colors transform hover:-translate-y-1`}
            aria-label={link.name}
          >
            <i className={`${link.icon} text-2xl`}></i>
          </a>
        ))}
        <div className={`w-px h-32 ${lineColor} transition-colors duration-300`}></div>
      </div>

      {/* Vertical Email - Right Side */}
      <div className="hidden lg:flex fixed right-8 bottom-0 flex-col items-center space-y-6 z-20">
        <a
          href={`mailto:${personalInfo.email}`}
          className={`${emailColor} ${emailHoverColor} transition-colors text-sm tracking-wider`}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {personalInfo.email}
        </a>
        <div className={`w-px h-32 ${lineColor} transition-colors duration-300`}></div>
      </div>
    </>
  )
}

export default Sidebar

