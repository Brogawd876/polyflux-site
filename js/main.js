// JavaScript functionality for Polyflux Ventures site

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileNav = document.getElementById('mobileNav');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! We will get back to you soon.';
          formStatus.classList.remove('hidden', 'text-red-500');
          formStatus.classList.add('text-green-500');
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
        formStatus.classList.remove('hidden', 'text-green-500');
        formStatus.classList.add('text-red-500');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        formStatus.classList.remove('hidden');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dynamic footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
