import { useState } from 'react'
import { personalInfo } from '../../constants/personalInfo'
import { PulsatingButton } from '../magicui/PulsatingButton'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Meteors } from '../magicui/Meteors'

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center mb-4">
    <div className="text-xl text-blue-500 mr-4">
      <i className={icon}></i>
    </div>
    <div>
      <h4 className="font-bold text-gray-700">{label}</h4>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
)


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    // Clear error when user starts typing
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

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Here you would typically send the form data to a server
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      console.log('Form submission:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', label: 'Location:', value: personalInfo.location },
    { icon: 'fas fa-envelope', label: 'Email:', value: personalInfo.email },
    { icon: 'fas fa-phone', label: 'Phone:', value: personalInfo.phone },
  ]

  const socialLinks = [
    {
      href: personalInfo.socialLinks.linkedin,
      label: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: 'text-blue-600',
    },
    {
      href: personalInfo.socialLinks.github,
      label: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      color: 'text-gray-800',
    },
    {
      href: personalInfo.socialLinks.whatsapp,
      label: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: 'text-green-600',
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Get In Touch
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">
              Contact Information
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {personalInfo.contactMessage}
            </p>
            {contactInfo.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
            {/* Dock for Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect with me</h4>
              <Dock 
                className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg"
                iconSize={50}
                iconMagnification={70}
                iconDistance={120}
              >
                {socialLinks.map((link, index) => (
                  <DockIcon 
                    key={index} 
                    className="bg-white/50 hover:bg-white/80 transition-colors rounded-full shadow-md"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`flex items-center justify-center w-full h-full ${link.color} hover:scale-110 transition-transform`}
                    >
                      {link.icon}
                    </a>
                  </DockIcon>
                ))}
              </Dock>
            </div>
          </div>
          <div className="md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="relative bg-white p-8 rounded-lg shadow-lg overflow-hidden"
              noValidate
            >
              <Meteors number={30} />
              <div className="relative z-10 mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative z-10 mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative z-10 mb-6">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative z-10 mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              {submitStatus === 'success' && (
                <div className="relative z-10 mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" role="alert">
                  <p className="font-semibold">✓ Thank you for your message!</p>
                  <p className="text-sm">I will get back to you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="relative z-10 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                  <p className="font-semibold">✗ Something went wrong.</p>
                  <p className="text-sm">Please try again or contact me directly via email.</p>
                </div>
              )}
              <div className="relative z-10">
                <PulsatingButton
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  pulseColor="37, 99, 235"
                  disabled={isSubmitting}
                >
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
