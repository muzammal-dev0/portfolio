import { personalInfo } from '../../constants/personalInfo'

const links = [
  { label: 'Email', href: `mailto:${personalInfo.email}`, value: personalInfo.email },
  { label: 'Phone', href: `tel:${personalInfo.phone.replace(/\s/g, '')}`, value: personalInfo.phone },
  { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin, value: 'Connect' },
  { label: 'GitHub', href: personalInfo.socialLinks.github, value: 'Code' },
  { label: 'WhatsApp', href: personalInfo.socialLinks.whatsapp, value: 'Chat' },
]

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-night-50 py-24 text-night md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-signal/30 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:pl-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal-dim">
          Contact
        </p>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          Got a product to ship?
          <span className="block text-signal-dim"> Let&apos;s talk.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-night-400 md:text-lg">
          {personalInfo.contactMessage}
        </p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-12 block break-all font-display text-2xl font-bold tracking-tight text-night transition hover:text-signal-dim md:text-4xl lg:text-5xl"
        >
          {personalInfo.email}
        </a>

        <div className="mt-14 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-full border border-night-200 bg-white/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-night-600 transition hover:border-night hover:text-night"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
