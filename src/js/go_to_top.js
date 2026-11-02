document.addEventListener('DOMContentLoaded', () => {
  const goToTopButton = document.getElementById('goToTop');
  if (!goToTopButton) return;

  const toggleButton = () => {
    goToTopButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
  };

  toggleButton();
  window.addEventListener('scroll', toggleButton, { passive: true });

  goToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
