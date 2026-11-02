function updateHeroHeight() {
  const heroSection = document.querySelector('.container-header-hero');

  if (heroSection) {
    heroSection.style.minHeight = `${window.innerHeight}px`;
  }
}

updateHeroHeight();

window.addEventListener('resize', updateHeroHeight);

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
