const revealItems = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (
  revealItems.length &&
  'IntersectionObserver' in window &&
  !prefersReducedMotion
) {
  document.documentElement.classList.add('has-reveal');

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px' }
  );

  revealItems.forEach(item => revealObserver.observe(item));
}
