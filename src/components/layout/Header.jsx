import { useState } from "react";
import { scrollToSection, handleNavClick } from "../../utils/scroll";

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
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center text-white text-2xl font-bold"
        >
          <span>Portfolio</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {["home", "about", "experience", "skills", "projects", "contact"].map(
            (section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, section)}
                className="text-white hover:text-gray-300 transition capitalize focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
              >
                {section}
              </a>
            )
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-2"
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
        className={`md:hidden bg-gray-800 p-4 mt-2 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        role="menu"
      >
        {["home", "about", "experience", "skills", "projects", "contact"].map(
          (section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavigation(e, section)}
              className="block text-white py-2 capitalize hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset rounded px-2"
              role="menuitem"
            >
              {section}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
