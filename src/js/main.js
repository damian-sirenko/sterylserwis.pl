function setHeroHeight() {
  const hero = document.querySelector('.container-header-hero');
  hero.style.height = `${window.innerHeight}px`;
}

// Викликаємо функцію при завантаженні сторінки та зміні розміру вікна
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);
