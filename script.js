// script.js - helpers for navbar, mobile toggle, smooth scroll
document.addEventListener('DOMContentLoaded', () => {

  // Load navbar.html if container exists
  const container = document.querySelector('#navbar-container');
  if (container) {
    fetch('navbar.html')
      .then(r => r.text())
      .then(html => {
        container.innerHTML = html;
        setupMobileToggle();
        setupSmoothScroll();
      })
      .catch(e => console.error('Navbar load error:', e));
  } else {
    // If navbar is already in the page
    setupMobileToggle();
    setupSmoothScroll();
  }

});

// mobile menu toggle
function setupMobileToggle() {
  const btn = document.getElementById('mobileToggle');
  const nav = document.querySelector('.main-nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// smooth scrolling for internal links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        // close nav on mobile after click
        const nav = document.querySelector('.main-nav');
        if (nav && nav.classList.contains('show')) {
          nav.classList.remove('show');
        }
      }
    });
  });
}
