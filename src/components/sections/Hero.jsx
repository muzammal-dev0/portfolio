import { handleNavClick } from "../../utils/scroll";
import { personalInfo } from "../../constants/personalInfo";

const Hero = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: personalInfo.socialLinks.github,
      icon: "fab fa-github",
    },
    {
      name: "LinkedIn",
      url: personalInfo.socialLinks.linkedin,
      icon: "fab fa-linkedin",
    },
    {
      name: "Email",
      url: `mailto:${personalInfo.email}`,
      icon: "fas fa-envelope",
    },
    {
      name: "WhatsApp",
      url: personalInfo.socialLinks.whatsapp,
      icon: "fab fa-whatsapp",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a192f] text-white"
    >
      {/* Organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#2d4a6e] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Vertical Social Media Icons - Left Side */}
      <div className="hidden lg:flex fixed left-8 bottom-0 flex-col items-center space-y-6 z-20">
        <div className="w-px h-32 bg-[#64ffda]"></div>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#ff6b9d] transition-colors transform hover:-translate-y-1"
            aria-label={link.name}
          >
            <i className={`${link.icon} text-2xl`}></i>
          </a>
        ))}
        <div className="w-px h-32 bg-[#64ffda]"></div>
      </div>

      {/* Vertical Email - Right Side */}
      <div className="hidden lg:flex fixed right-8 bottom-0 flex-col items-center space-y-6 z-20">
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-[#8892b0] hover:text-[#ff6b9d] transition-colors text-sm tracking-wider"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {personalInfo.email}
        </a>
        <div className="w-px h-32 bg-[#64ffda]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <p className="text-[#ff6b9d] text-lg mb-4 font-mono">
              Hi There
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              I'm{" "}
              <span className="text-[#ff6b9d] whitespace-nowrap">
                {personalInfo.name.split(" ")[0]}
              </span>
              <br />
              <span className="text-[#ff6b9d]">
                {personalInfo.name.split(" ")[1]}
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-[#8892b0]">
              I am a {personalInfo.title}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const link = document.createElement("a");
                  link.href = personalInfo.cvPath;
                  link.download = "CV.pdf";
                  link.click();
                }}
                className="px-8 py-3 bg-[#ff6b9d] text-white font-semibold rounded hover:bg-[#ff8fb3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6b9d] focus:ring-offset-2 focus:ring-offset-[#0a192f]"
              >
                Resume
              </button>
              <button
                onClick={(e) => handleNavClick(e, "contact")}
                className="px-8 py-3 bg-transparent text-white border-2 border-white font-semibold rounded hover:bg-white hover:text-[#0a192f] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a192f]"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6b9d] opacity-20 rounded-lg blur-3xl transform rotate-6"></div>
              <div className="relative bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6e] rounded-lg p-8 shadow-2xl">
                <div className="w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Social Links */}
      <div className="lg:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#ff6b9d] transition-colors"
            aria-label={link.name}
          >
            <i className={`${link.icon} text-2xl`}></i>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
