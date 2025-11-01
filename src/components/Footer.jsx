const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Muzammal Hussain</h3>
            <p className="text-gray-400">Senior Software Engineer</p>
          </div>
          <div>
            <p className="text-gray-400">&copy; {currentYear} All Rights Reserved</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <a
              href="https://www.linkedin.com/in/muzammal-hussain-836a96151/"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/muzammal-dev0"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=923074727093"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

