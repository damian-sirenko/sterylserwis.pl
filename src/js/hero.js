const heroCtaMain = document.querySelector('.hero__cta-main');
const stickyHeader = document.getElementById('stickyHeader');
const mobileCta = document.getElementById('mobileCta');
const heroVideo = document.querySelector('.hero__video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setBarVisible(element, visible) {
  if (!element) return;
  element.classList.toggle('is-visible', visible);
  element.toggleAttribute('inert', !visible);
  element.setAttribute('aria-hidden', String(!visible));
}

if (heroCtaMain && 'IntersectionObserver' in window) {
  const ctaObserver = new IntersectionObserver(([entry]) => {
    const scrolledPast =
      !entry.isIntersecting && entry.boundingClientRect.top < 0;
    setBarVisible(stickyHeader, scrolledPast);
    setBarVisible(mobileCta, scrolledPast);
  });
  ctaObserver.observe(heroCtaMain);
}

if (heroVideo) {
  const applyMotionPreference = () => {
    if (reducedMotion.matches) {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(() => {});
    }
  };

  applyMotionPreference();
  reducedMotion.addEventListener('change', applyMotionPreference);

  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver(([entry]) => {
      if (reducedMotion.matches) return;
      if (entry.isIntersecting) {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    });
    videoObserver.observe(heroVideo);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('vacation-modal');
  const closeBtn = document.getElementById('vacation-modal-close');

  if (!modal || !closeBtn) return;

  document.body.classList.add('vacation-modal-open');

  closeBtn.addEventListener('click', () => {
    modal.classList.add('is-hidden');
    document.body.classList.remove('vacation-modal-open');
  });
});
