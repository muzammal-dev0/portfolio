import { personalInfo } from '../../constants/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      href: personalInfo.socialLinks.linkedin,
      icon: 'fab fa-linkedin-in',
      label: 'LinkedIn',
    },
    {
      href: personalInfo.socialLinks.github,
      icon: 'fab fa-github',
      label: 'GitHub',
    },
    {
      href: personalInfo.socialLinks.whatsapp,
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp',
    },
  ]

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
            <p className="text-gray-400">{personalInfo.title}</p>
          </div>
          <div>
            <p className="text-gray-400">&copy; {currentYear} All Rights Reserved</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
