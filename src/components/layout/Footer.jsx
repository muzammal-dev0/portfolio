import { personalInfo } from '../../constants/personalInfo'

const quickLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
]

const connectLinks = [
  { href: personalInfo.socialLinks.github, label: 'GitHub', icon: 'fab fa-github' },
  { href: personalInfo.socialLinks.linkedin, label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
  { href: personalInfo.socialLinks.whatsapp, label: 'WhatsApp', icon: 'fab fa-whatsapp' },
  { href: `mailto:${personalInfo.email}`, label: 'Email', icon: 'fas fa-envelope' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 py-14 text-stone-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <p className="mb-3 font-display text-base font-bold text-stone-100">
              {personalInfo.name.split(' ')[0]}{' '}
              <span className="italic text-[#FF3D00]">{personalInfo.name.split(' ')[1]}</span>
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-stone-500">
              {personalInfo.footerTagline}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 transition hover:text-[#FF3D00]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center border border-stone-700 text-stone-500 transition hover:border-[#FF3D00] hover:text-[#FF3D00]"
                >
                  <i className={`${link.icon} text-sm`} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-8 text-center">
          <p className="font-mono text-xs text-stone-600">
            &copy; {year} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
