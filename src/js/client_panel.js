const cpanel = document.querySelector('.cpanel');

if (cpanel) {
  const features = Array.from(cpanel.querySelectorAll('.cpanel__feature'));
  const screens = Array.from(cpanel.querySelectorAll('.cpanel__screen'));
  const caption = cpanel.querySelector('.cpanel__caption');
  const featureList = cpanel.querySelector('.cpanel__features');
  const phone = cpanel.querySelector('.cpanel__phone');
  const lightbox = document.getElementById('cpanel-lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.cpanel__lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.cpanel__lightbox-close') : null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let isVisible = false;
  let isHovered = false;
  let isStopped = reducedMotion.matches;

  function showScreen(index) {
    current = index;
    features.forEach((feature, i) => {
      const isActive = i === index;
      feature.classList.toggle('is-active', isActive);
      feature.setAttribute('aria-pressed', String(isActive));
    });
    screens.forEach((screen, i) => {
      screen.classList.toggle('is-active', i === index);
    });
    if (featureList && featureList.scrollWidth > featureList.clientWidth) {
      const item = features[index].parentElement;
      const padding = parseFloat(getComputedStyle(featureList).paddingLeft) || 0;
      featureList.scrollTo({
        left: item.offsetLeft - padding,
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
      });
    }
    if (caption) {
      caption.textContent = features[index].querySelector('.cpanel__feature-text').textContent;
    }
  }

  function updatePlayback() {
    const lightboxOpen = lightbox ? lightbox.open : false;
    cpanel.classList.toggle('is-autoplay', !isStopped);
    cpanel.classList.toggle('is-paused', !isVisible || isHovered || lightboxOpen);
  }

  features.forEach((feature, index) => {
    feature.addEventListener('click', () => {
      isStopped = true;
      showScreen(index);
      updatePlayback();
    });
    feature
      .querySelector('.cpanel__progress')
      .addEventListener('animationend', () => {
        if (isStopped) return;
        showScreen((current + 1) % features.length);
      });
  });

  cpanel.addEventListener('mouseenter', () => {
    isHovered = true;
    updatePlayback();
  });
  cpanel.addEventListener('mouseleave', () => {
    isHovered = false;
    updatePlayback();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.3 }).observe(cpanel);
  } else {
    isVisible = true;
  }

  if (phone && lightbox && lightboxImg && typeof lightbox.showModal === 'function') {
    phone.addEventListener('click', () => {
      const screen = screens[current];
      lightboxImg.src = screen.currentSrc || screen.src;
      lightboxImg.alt = screen.alt;
      lightbox.showModal();
      updatePlayback();
    });
    lightboxClose.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('close', () => {
      lightboxImg.src = '';
      updatePlayback();
    });
  }

  showScreen(0);
  updatePlayback();
}
