// Portfolio JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Add animation classes to elements as they scroll into view
  const animateOnScroll = function () {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("animate-fadeIn");

        // Add slide-up animation to section titles
        const title = section.querySelector("h2");
        if (title) {
          title.classList.add("animate-slideUp");
        }
      }
    });
  };

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Also run on initial load
  animateOnScroll();

  // Form submission handling
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill out all required fields");
        return;
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it and show a success message
      console.log("Form submission:", { name, email, subject, message });

      // Show success message (you could create a better UI for this)
      alert("Thank you for your message! I will get back to you soon.");

      // Reset form
      contactForm.reset();
    });
  }

  // Add project card hover class
  const projectCards = document.querySelectorAll("#projects .bg-white");
  projectCards.forEach((card) => {
    card.classList.add("project-card");
  });

  // Add typing effect to hero text (optional)
  const heroText = document.querySelector("#home h1");
  if (heroText) {
    heroText.classList.add("gradient-text");
  }
});
