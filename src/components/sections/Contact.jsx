import { useState } from 'react'
import { personalInfo } from '../../constants/personalInfo'
import { PulsatingButton } from '../magicui/PulsatingButton'

const ContactInfo = ({ icon, label, value, href }) => (
  <div className="mb-6 flex items-start gap-4">
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600"
      aria-hidden
    >
      <i className={`${icon} text-lg`} />
    </div>
    <div className="min-w-0 pt-0.5">
      <h4 className="font-bold text-slate-900">{label}</h4>
      {href ? (
        <a
          href={href}
          className="break-all text-slate-600 transition hover:text-violet-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      ) : (
        <p className="text-slate-600">{value}</p>
      )}
    </div>
  </div>
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
    setSubmitStatus(null)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formEl = e.currentTarget
    const hp = formEl.elements.namedItem('botcheck')
    if (hp && 'value' in hp && hp.value) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey || String(accessKey).trim() === '') {
      setSubmitStatus('config')
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        access_key: accessKey,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: 'Portfolio contact',
        message: formData.message.trim(),
        from_name: formData.name.trim(),
        botcheck: hp && 'value' in hp ? hp.value : '',
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
        if (import.meta.env.DEV) {
          console.error('Web3Forms error:', data)
        }
      }
    } catch (error) {
      setSubmitStatus('error')
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    { icon: 'fas fa-phone', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: personalInfo.location },
  ]

  const inputRing = 'focus:outline-none focus:ring-2 focus:ring-violet-500'

  return (
    <section id="contact" className="border-t border-slate-200 bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600">
            Have a project in mind? Let&apos;s work together to create something amazing.
          </p>
        </header>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-2/5">
            <h3 className="mb-2 text-xl font-bold text-slate-900">Contact Information</h3>
            <p className="mb-8 text-slate-600 leading-relaxed">{personalInfo.contactMessage}</p>
            {contactInfo.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>

          <div className="lg:flex-1">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-slate-200/80 bg-slate-100 p-6 shadow-inner md:p-8"
              noValidate
            >
              <div className="sr-only" aria-hidden>
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="botcheck" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="relative z-10 mb-6">
                <label htmlFor="name" className="mb-2 block font-semibold text-slate-800">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 ${inputRing} ${
                    errors.name ? 'border-red-400' : 'border-slate-200'
                  }`}
                  placeholder="John Doe"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative z-10 mb-6">
                <label htmlFor="email" className="mb-2 block font-semibold text-slate-800">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 ${inputRing} ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  }`}
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative z-10 mb-6">
                <label htmlFor="message" className="mb-2 block font-semibold text-slate-800">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 ${inputRing} ${
                    errors.message ? 'border-red-400' : 'border-slate-200'
                  }`}
                  placeholder="Tell me about your project..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              {submitStatus === 'success' && (
                <div
                  className="relative z-10 mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"
                  role="alert"
                >
                  <p className="font-semibold">Thank you for your message.</p>
                  <p className="text-sm text-emerald-800">I will get back to you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div
                  className="relative z-10 mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"
                  role="alert"
                >
                  <p className="font-semibold">Something went wrong.</p>
                  <p className="text-sm text-red-800">Please try again or email me directly.</p>
                </div>
              )}
              {submitStatus === 'config' && (
                <div
                  className="relative z-10 mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
                  role="status"
                >
                  <p className="font-semibold">Form not configured</p>
                  <p className="text-sm">
                    Add <code className="rounded bg-amber-100 px-1">VITE_WEB3FORMS_ACCESS_KEY</code> to a{' '}
                    <code className="rounded bg-amber-100 px-1">.env</code> file (see{' '}
                    <code className="rounded bg-amber-100 px-1">.env.example</code>). Get a free key at{' '}
                    <a
                      href="https://web3forms.com/"
                      className="font-medium underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      web3forms.com
                    </a>
                    .
                  </p>
                </div>
              )}
              <div className="relative z-10">
                <PulsatingButton
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-3.5 font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                  pulseColor="124, 58, 237"
                  disabled={isSubmitting}
                >
                  <i className="fas fa-paper-plane" aria-hidden />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </PulsatingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
