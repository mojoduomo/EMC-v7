(function() {
  'use strict';
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero, .ph');
  function updateNav() {
    if (!hero || !nav) return;
    nav.classList.toggle('nav--dark', hero.getBoundingClientRect().bottom > 60);
  }
  if (hero) { updateNav(); window.addEventListener('scroll', updateNav, { passive: true }); }
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();
