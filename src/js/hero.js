function updateHeroHeight() {
  const heroSection = document.querySelector('.container-header-hero');
  heroSection.style.minHeight = `${window.innerHeight}px`;
}

// Встановлення висоти при завантаженні сторінки
updateHeroHeight();

// Оновлення висоти при зміні розміру вікна
window.addEventListener('resize', updateHeroHeight);
