import { personalInfo } from '../../constants/personalInfo'
import { openChat } from '../command/commandBus'

const links = [
  { label: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
  { label: 'GitHub', href: personalInfo.socialLinks.github },
  { label: 'WhatsApp', href: personalInfo.socialLinks.whatsapp },
  { label: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
]

const Contact = () => (
  <section id="contact" className="border-t border-ink-200 px-5 py-20 text-center md:px-6 md:py-36">
    <p className="eyebrow">Contact</p>
    <h2
      className="mx-auto mt-6 max-w-3xl font-bold md:mt-8 leading-[1.04] tracking-[-0.03em] text-ink-900"
      style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
    >
      Have a product to build? Let&apos;s talk.
    </h2>
    <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-600 md:mt-6 md:text-lg">
      Open to freelance and full-time roles in SaaS, LLM/AI, healthcare, GIS and cloud-native products.
    </p>

    <a href={`mailto:${personalInfo.email}`} className="pill pill-solid mt-10 w-full max-w-xs py-3.5 text-sm normal-case tracking-normal sm:w-auto sm:max-w-none sm:px-10 md:mt-12">
      {personalInfo.email}
    </a>

    <ul className="mx-auto mt-10 grid max-w-xs grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-8">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-xs font-bold uppercase tracking-[0.1em] text-ink-900 underline-offset-[6px] hover:underline"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>

    <button
      type="button"
      onClick={openChat}
      className="mt-10 text-sm text-ink-500 underline decoration-ink-300 underline-offset-4 hover:text-ink-900 hover:decoration-ink-900"
    >
      Or ask the AI assistant about my work
    </button>
  </section>
)

export default Contact
