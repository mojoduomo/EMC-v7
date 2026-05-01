(function() {
  'use strict';
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero, .ph');
  function updateNav() {
    if (!hero || !nav) return;
    nav.classList.toggle('nav--dark', hero.getBoundingClientRect().bottom > 60);
  }
  if (hero) { updateNav(); window.addEventListener('scroll', updateNav, { passive: true }); }
  var hamburger = document.querySelector('.nav__hamburger');
  var navLinks = document.querySelector('.nav__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', function() { navLinks.classList.remove('open'); }); });
  }

  // Fade-up
  var fadeObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(function(el) { fadeObs.observe(el); });

  // Count-up stats
  function countUp(el, target, duration) {
    var startTime = performance.now();
    el.textContent = '0';
    function update(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  var statObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var numEl = e.target.querySelector('.stat__num');
        if (numEl) {
          var text = numEl.textContent.trim();
          var num = parseInt(text.replace(/[^0-9]/g, ''));
          if (!isNaN(num) && num > 0) {
            countUp(numEl, num, 1200);
          }
          if (text === '0') {
            numEl.style.opacity = '0';
            setTimeout(function() { numEl.style.transition = 'opacity 0.5s'; numEl.style.opacity = '1'; }, 400);
          }
        }
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat').forEach(function(el) { statObs.observe(el); });

  // Leapfrog arrow pulse
  var arrow = document.querySelector('.leap__arrow');
  if (arrow) {
    arrow.style.animation = 'pulse 2s ease-in-out infinite';
    var style = document.createElement('style');
    style.textContent = '@keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }';
    document.head.appendChild(style);
  }
})();
