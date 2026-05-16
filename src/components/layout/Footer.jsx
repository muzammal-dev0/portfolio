import { personalInfo } from '../../constants/personalInfo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ]

  const connectLinks = [
    {
      href: personalInfo.socialLinks.github,
      label: 'GitHub',
      icon: <i className="fab fa-github text-lg" aria-hidden />,
    },
    {
      href: personalInfo.socialLinks.linkedin,
      label: 'LinkedIn',
      icon: <i className="fab fa-linkedin text-lg" aria-hidden />,
    },
    {
      href: personalInfo.socialLinks.whatsapp,
      label: 'WhatsApp',
      icon: <i className="fab fa-whatsapp text-lg" aria-hidden />,
    },
    {
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      icon: <i className="fas fa-envelope text-lg" aria-hidden />,
    },
  ]

  return (
    <footer className="bg-slate-900 py-14 text-slate-300">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="mb-3 text-lg font-bold text-white">
              <span className="font-mono text-violet-400" aria-hidden>
                &lt;/&gt;
              </span>{' '}
              <span className="text-white">{personalInfo.title}</span>
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {personalInfo.footerTagline}
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-violet-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {connectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-violet-600 hover:text-white"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} {personalInfo.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
