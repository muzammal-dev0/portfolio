/**
 * Smoothly scrolls to a section by its ID
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Prevents default and scrolls to section
 * Useful for anchor link handlers
 */
export const handleNavClick = (e, sectionId) => {
  e.preventDefault()
  scrollToSection(sectionId)
}

