// ── SCROLL ANIMATIONS ──
// Fades in sections and cards as they enter the viewport.

const FADE_TARGETS = [
  '.skill-chip',
  '.project-card',
  '.section-eyebrow',
  '.section-title',
  '.section-desc',
  '.hero-stat',
];

function initScrollAnimations() {
  // Set initial hidden state
  const elements = document.querySelectorAll(FADE_TARGETS.join(','));
  elements.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 30}ms, transform 0.5s ease ${i * 30}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// Respect reduced motion preference
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
}
