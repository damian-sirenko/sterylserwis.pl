const mobileNav = document.getElementById('mobileNav');

if (mobileNav) {
  const openButtons = document.querySelectorAll('.burger-menu-wrap, .js-menu-open');
  const closeTargets = mobileNav.querySelectorAll('[data-mnav-close]');
  const navLinks = mobileNav.querySelectorAll('a');
  let lastFocused = null;

  function openMobileNav() {
    lastFocused = document.activeElement;
    mobileNav.classList.add('is-open');
    mobileNav.removeAttribute('inert');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-mnav-open');
    openButtons.forEach(button => button.setAttribute('aria-expanded', 'true'));
    const closeButton = mobileNav.querySelector('.mnav__close');
    if (closeButton) closeButton.focus();
  }

  function closeMobileNav() {
    if (!mobileNav.classList.contains('is-open')) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('inert', '');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-mnav-open');
    openButtons.forEach(button => button.setAttribute('aria-expanded', 'false'));
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  openButtons.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mobileNav');
    button.addEventListener('click', openMobileNav);
  });
  closeTargets.forEach(target => target.addEventListener('click', closeMobileNav));
  navLinks.forEach(link => link.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileNav();
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
    if (event.matches) closeMobileNav();
  });
}
