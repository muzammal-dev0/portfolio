import { personalInfo } from '../../constants/personalInfo'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-night-200/10 bg-night py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:pl-8">
        <p className="font-display text-lg font-bold text-night-50">
          {personalInfo.name.split(' ')[0]}
          <span className="text-signal">.</span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-night-400">
          &copy; {year} · {personalInfo.location}
        </p>
        <div className="flex gap-4">
          {[
            { href: personalInfo.socialLinks.github, icon: 'fab fa-github', label: 'GitHub' },
            { href: personalInfo.socialLinks.linkedin, icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
            { href: `mailto:${personalInfo.email}`, icon: 'fas fa-envelope', label: 'Email' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={l.label}
              className="text-night-400 transition hover:text-signal"
            >
              <i className={l.icon} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
