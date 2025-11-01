import { useState } from 'react'
import { personalInfo } from '../../constants/personalInfo'
import { ShimmerButton } from '../magicui/ShimmerButton'

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

const SocialLink = ({ href, icon, className }) => (
  <a
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={icon}
  >
    <i className={icon}></i>
  </a>
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields')
      return
    }

    // Here you would typically send the form data to a server
    console.log('Form submission:', formData)

    // Show success message
    alert('Thank you for your message! I will get back to you soon.')

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', label: 'Location:', value: personalInfo.location },
    { icon: 'fas fa-envelope', label: 'Email:', value: personalInfo.email },
    { icon: 'fas fa-phone', label: 'Phone:', value: personalInfo.phone },
  ]

  const socialLinks = [
    {
      href: personalInfo.socialLinks.linkedin,
      icon: 'fab fa-linkedin-in',
      className:
        'h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition',
    },
    {
      href: personalInfo.socialLinks.github,
      icon: 'fab fa-github',
      className:
        'h-12 w-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-black transition',
    },
    {
      href: personalInfo.socialLinks.whatsapp,
      icon: 'fab fa-whatsapp',
      className:
        'h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition',
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
            <div className="flex mt-8 space-x-4">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <ShimmerButton
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                background="rgba(37, 99, 235, 1)"
              >
                Send Message
              </ShimmerButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
