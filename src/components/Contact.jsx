import { useState } from 'react'

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
    // For demo purposes, we'll just log it and show a success message
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
              I'm interested in freelance opportunities – especially ambitious or large
              projects. However, if you have other requests or questions, don't hesitate
              to contact me.
              <br />
              <span className="block mt-2">
                I can help you kick start your startup and build your project from
                scratch.
              </span>
            </p>
            <div className="flex items-center mb-4">
              <div className="text-xl text-blue-500 mr-4">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Location:</h4>
                <p className="text-gray-600">Lahore, Pakistan</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-xl text-blue-500 mr-4">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Email:</h4>
                <p className="text-gray-600">muzammal.dev0@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="text-xl text-blue-500 mr-4">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-700">Phone:</h4>
                <p className="text-gray-600">+923074727093</p>
              </div>
            </div>
            <div className="flex mt-8 space-x-4">
              <a
                href="https://www.linkedin.com/in/muzammal-hussain-836a96151/"
                className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/muzammal-dev0"
                className="h-12 w-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-black transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=923074727093"
                className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
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
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

