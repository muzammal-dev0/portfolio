import { useState } from "react";
import { scrollToSection, handleNavClick } from "../../utils/scroll";
import { personalInfo } from "../../constants/personalInfo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (e, sectionId) => {
    handleNavClick(e, sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#0a192f] p-4 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center text-2xl font-bold text-[#ff6b9d] hover:text-[#ff8fb3] transition-colors"
        >
          <span>&lt;/{personalInfo.name.split(" ")[0]}&gt;</span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {["home", "about", "projects"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              className="text-white hover:text-[#ff6b9d] transition capitalize focus:outline-none focus:ring-2 focus:ring-[#ff6b9d] focus:ring-offset-2 focus:ring-offset-[#0a192f] rounded px-2 py-1"
            >
              {section === "projects" ? "Portfolio" : section}
            </a>
          ))}
          <button
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-4 py-2 border-2 border-[#ff6b9d] text-white hover:bg-[#ff6b9d] transition-colors rounded focus:outline-none focus:ring-2 focus:ring-[#ff6b9d] focus:ring-offset-2 focus:ring-offset-[#0a192f]"
          >
            Let's Talk
          </button>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b9d] focus:ring-offset-2 focus:ring-offset-[#0a192f] rounded p-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-[#112240] p-4 mt-2 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        role="menu"
      >
        {["home", "about", "projects"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={(e) => handleNavigation(e, section)}
            className="block text-white py-2 capitalize hover:text-[#ff6b9d] focus:outline-none focus:ring-2 focus:ring-[#ff6b9d] focus:ring-inset rounded px-2"
            role="menuitem"
          >
            {section === "projects" ? "Portfolio" : section}
          </a>
        ))}
        <button
          onClick={(e) => handleNavigation(e, "contact")}
          className="mt-4 w-full px-4 py-2 border-2 border-[#ff6b9d] text-white hover:bg-[#ff6b9d] transition-colors rounded"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

export default Header;
