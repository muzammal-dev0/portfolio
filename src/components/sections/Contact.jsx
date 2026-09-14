import { personalInfo } from '../../constants/personalInfo'

const links = [
  { label: 'Email', href: `mailto:${personalInfo.email}` },
  { label: 'Phone', href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
  { label: 'GitHub', href: personalInfo.socialLinks.github },
  { label: 'WhatsApp', href: personalInfo.socialLinks.whatsapp },
]

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-6 py-24 text-ink-50 md:py-32">
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-mark/30 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mark">
          Contact
        </p>
        <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          Have a product in mind?
          <span className="italic text-mark"> Let&apos;s build it.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg">
          {personalInfo.contactMessage}
        </p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-12 block break-all font-display text-2xl font-bold tracking-tight transition hover:text-mark md:text-4xl"
        >
          {personalInfo.email}
        </a>

        <div className="mt-12 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-100 transition hover:border-mark hover:bg-mark hover:text-white"
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
