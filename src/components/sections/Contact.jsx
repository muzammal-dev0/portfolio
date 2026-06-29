import { personalInfo } from '../../constants/personalInfo'

const contactDetails = [
  { icon: 'fas fa-envelope', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: 'fas fa-phone', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: personalInfo.location, href: null },
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', value: 'LinkedIn profile', href: personalInfo.socialLinks.linkedin },
  { icon: 'fab fa-github', label: 'GitHub', value: 'GitHub profile', href: personalInfo.socialLinks.github },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp', value: 'Message on WhatsApp', href: personalInfo.socialLinks.whatsapp },
]

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">06</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        <div className="relative mb-14 overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 left-0 select-none font-display text-[7rem] font-bold leading-none text-stone-100 md:text-[10rem]"
          >
            06
          </span>
          <h2 className="relative font-display text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Get In Touch
          </h2>
        </div>

        <div className="max-w-2xl border border-stone-200 bg-stone-50 p-6 md:p-8">
          <p className="mb-8 text-base leading-relaxed text-stone-500">
            {personalInfo.contactMessage}
          </p>

          <div className="space-y-5">
            {contactDetails.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200 bg-white">
                  <i className={`${info.icon} text-xs text-[#FF3D00]`} aria-hidden />
                </div>
                <div>
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-stone-400">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="break-all text-sm text-stone-700 transition hover:text-[#FF3D00]"
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-stone-700">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
