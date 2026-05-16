import { useState, useEffect } from 'react'
import { personalInfo } from '../../constants/personalInfo'

const Sidebar = () => {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home')
      if (hero) {
        const bottom = hero.getBoundingClientRect().bottom
        setPastHero(bottom < 80)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const socialLinks = [
    { name: 'GitHub', url: personalInfo.socialLinks.github, icon: 'fab fa-github' },
    { name: 'LinkedIn', url: personalInfo.socialLinks.linkedin, icon: 'fab fa-linkedin' },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'fas fa-envelope' },
    { name: 'WhatsApp', url: personalInfo.socialLinks.whatsapp, icon: 'fab fa-whatsapp' },
  ]

  const iconClass = pastHero ? 'text-slate-500' : 'text-slate-600'
  const iconHover = 'hover:text-rose-600'
  const lineClass = pastHero ? 'bg-slate-300' : 'bg-slate-200'
  const emailClass = pastHero ? 'text-slate-500' : 'text-slate-600'

  return (
    <>
      <div className="fixed bottom-0 left-8 z-20 hidden flex-col items-center space-y-5 lg:flex">
        <div className={`h-24 w-px ${lineClass} transition-colors`} />
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconClass} ${iconHover} transition-colors`}
            aria-label={link.name}
          >
            <i className={`${link.icon} text-xl`} />
          </a>
        ))}
        <div className={`h-24 w-px ${lineClass} transition-colors`} />
      </div>

      <div className="fixed bottom-0 right-8 z-20 hidden flex-col items-center space-y-5 lg:flex">
        <a
          href={`mailto:${personalInfo.email}`}
          className={`${emailClass} ${iconHover} text-xs tracking-widest transition-colors`}
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {personalInfo.email}
        </a>
        <div className={`h-24 w-px ${lineClass} transition-colors`} />
      </div>
    </>
  )
}

export default Sidebar
