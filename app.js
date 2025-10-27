/* app.js
   - mobile menu toggle
   - typing animation (Frontend Developer | Web Designer | Coder)
   - smooth scroll + active link on scroll
   - reveal on scroll using IntersectionObserver (adds .in-view)
   - small utilities (footer year)
*/

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------
     NAV TOGGLE (mobile)
     -------------------- */
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');

  navToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
    // swap icon for feedback
    const icon = navToggle.querySelector('i');
    if (navbar.classList.contains('show')) {
      icon.className = 'bx bx-x';
      navToggle.setAttribute('aria-label', 'Close navigation');
    } else {
      icon.className = 'bx bx-menu';
      navToggle.setAttribute('aria-label', 'Open navigation');
    }
  });

  // close mobile menu when a nav-link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
        navToggle.querySelector('i').className = 'bx bx-menu';
      }
    });
  });

  /* --------------------
     TYPING EFFECT
     -------------------- */
  const words = ['Frontend Developer', 'Web Designer', 'Coder'];
  const typingTarget = document.getElementById('typing-target');
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const DELAY_AFTER = 900;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = words[wordIndex];
    if (!isDeleting) {
      typingTarget.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, DELAY_AFTER);
        return;
      }
      setTimeout(type, TYPING_SPEED);
    } else {
      typingTarget.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, DELETING_SPEED);
    }
  }
  type();

  /* --------------------
     SMOOTH SCROLL + ACTIVE LINK ON SCROLL
     -------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);

  // smooth scroll for internal links (subtract header height)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = document.getElementById('header').offsetHeight + 8;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  /* --------------------
     REVEAL ON SCROLL (IntersectionObserver)
     - elements have class "reveal-safe" and optional data-delay attribute
     - when in view, we add "in-view" to trigger CSS transform of ::before
     -------------------- */
  const revealElements = document.querySelectorAll('.reveal-safe');

  const obsOptions = { threshold: 0.12 };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // once visible, stop observing to improve performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, obsOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------
     UTILS
     -------------------- */
  // set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});