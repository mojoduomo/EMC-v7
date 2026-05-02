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

  // Count-up with easing
  function countUp(el, target, duration, delay) {
    setTimeout(function() {
      var startTime = performance.now();
      el.textContent = '0';
      function update(now) {
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }, delay);
  }

  // Stat strip animation
  var statObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var stats = e.target.querySelectorAll('.stat');
        stats.forEach(function(stat, i) {
          var numEl = stat.querySelector('.stat__num');
          if (!numEl) return;
          var text = numEl.textContent.trim();
          var num = parseInt(text.replace(/[^0-9]/g, ''));
          var delay = i * 400;

          // Gold border flash on arrival
          setTimeout(function() {
            stat.style.borderLeftColor = '#fff';
            setTimeout(function() { stat.style.borderLeftColor = ''; }, 600);
          }, delay);

          // Numeric — count up
          if (!isNaN(num) && num > 0) {
            countUp(numEl, num, 1000, delay);
          }
          // Zero — dramatic blink
          else if (text === '0') {
            numEl.style.opacity = '0';
            numEl.style.transform = 'scale(0.5)';
            setTimeout(function() {
              numEl.style.transition = 'opacity 0.6s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
              numEl.style.opacity = '1';
              numEl.style.transform = 'scale(1)';
            }, delay + 200);
          }
          // Non-numeric (e.g. "If / then") — fade and slide in
          else if (isNaN(num)) {
            var original = numEl.textContent;
            numEl.style.opacity = '0';
            numEl.style.transform = 'translateX(-10px)';
            setTimeout(function() {
              numEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              numEl.style.opacity = '1';
              numEl.style.transform = 'translateX(0)';
            }, delay + 100);
          }
        });
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  var statsContainer = document.querySelector('.stats');
  if (statsContainer) statObs.observe(statsContainer);

  // Leapfrog arrow pulse
  var arrow = document.querySelector('.leap__arrow');
  if (arrow) {
    arrow.style.animation = 'pulse 2.5s ease-in-out infinite';
    var style = document.createElement('style');
    style.textContent = '@keyframes pulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }';
    document.head.appendChild(style);
  }
})();

// Stat tap feedback — brief flash on click/tap
document.querySelectorAll('.stat').forEach(function(stat) {
  stat.addEventListener('click', function() {
    stat.style.transition = 'background 0.1s';
    stat.style.background = 'rgba(250,250,248,0.06)';
    setTimeout(function() {
      stat.style.background = 'transparent';
    }, 200);
  });
});
