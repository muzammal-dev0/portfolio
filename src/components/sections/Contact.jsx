import { useState } from 'react'
import { personalInfo } from '../../constants/personalInfo'

const contactDetails = [
  { icon: 'fas fa-envelope', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: 'fas fa-phone', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: personalInfo.location, href: null },
]

const inputClass =
  'w-full border border-stone-200 bg-white px-4 py-3 font-sans text-sm text-stone-900 placeholder:text-stone-400 transition focus:border-[#FF3D00] focus:outline-none focus:ring-0'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitStatus(null)
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Required'
    if (!formData.email.trim()) errs.email = 'Required'
    else if (!validateEmail(formData.email)) errs.email = 'Invalid email'
    if (!formData.message.trim()) errs.message = 'Required'
    else if (formData.message.trim().length < 10) errs.message = 'Too short (min 10 chars)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const hp = e.currentTarget.elements.namedItem('botcheck')
    if (hp?.value) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey?.trim()) {
      setSubmitStatus('config')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: 'Portfolio contact',
          message: formData.message.trim(),
          from_name: formData.name.trim(),
          botcheck: hp?.value ?? '',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section label */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF3D00]">06</span>
          <span className="h-px w-10 bg-stone-200" />
        </div>

        {/* Heading with watermark */}
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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <p className="mb-8 text-base leading-relaxed text-stone-500">
              {personalInfo.contactMessage}
            </p>

            <div className="space-y-5">
              {contactDetails.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200 bg-stone-50">
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

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="border border-stone-200 bg-stone-50 p-6 md:p-8"
              noValidate
            >
              <div className="sr-only" aria-hidden>
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
                  Name <span className="text-[#FF3D00]">*</span>
                </label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  placeholder="John Doe"
                  className={`${inputClass} ${errors.name ? 'border-red-400' : ''}`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && <p className="mt-1.5 font-mono text-xs text-red-500" role="alert">{errors.name}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
                  Email <span className="text-[#FF3D00]">*</span>
                </label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <p className="mt-1.5 font-mono text-xs text-red-500" role="alert">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-stone-500">
                  Message <span className="text-[#FF3D00]">*</span>
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none ${errors.message ? 'border-red-400' : ''}`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && <p className="mt-1.5 font-mono text-xs text-red-500" role="alert">{errors.message}</p>}
              </div>

              {submitStatus === 'success' && (
                <div className="mb-5 border-l-4 border-emerald-500 bg-emerald-50 py-3 pl-4 pr-4" role="alert">
                  <p className="font-mono text-sm text-emerald-700">Sent — I'll be in touch soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-5 border-l-4 border-red-500 bg-red-50 py-3 pl-4 pr-4" role="alert">
                  <p className="font-mono text-sm text-red-700">Something went wrong. Try emailing me directly.</p>
                </div>
              )}
              {submitStatus === 'config' && (
                <div className="mb-5 border-l-4 border-[#FF3D00] bg-orange-50 py-3 pl-4 pr-4" role="status">
                  <p className="font-mono text-sm text-orange-700">
                    Add <code className="bg-orange-100 px-1">VITE_WEB3FORMS_ACCESS_KEY</code> to <code className="bg-orange-100 px-1">.env</code>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF3D00] py-3.5 font-mono text-sm font-semibold text-white transition hover:bg-[#e53500] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D00] focus-visible:ring-offset-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
