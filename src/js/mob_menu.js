const backdrop = document.querySelector('.backdrop');
const openMenuBtn = document.querySelector('.burger-menu-wrap');
const closeMenuBtn = document.querySelector('.menu-close-btn');
const overlay = document.querySelector('.backdrop-overlay');

const openMenu = () => {
  backdrop.classList.add('is-open');
  overlay.classList.add('is-open');

  // Робимо елементи видимими
  backdrop.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
};

const closeMenu = () => {
  // Видаляємо класи для плавного закриття
  backdrop.classList.remove('is-open');
  overlay.classList.remove('is-open');

  // Через 300 мс змінюємо visibility
  setTimeout(() => {
    backdrop.style.visibility = 'hidden';
    overlay.style.visibility = 'hidden';
  }, 300); // Відповідає тривалості transition
};

// Додаємо обробники подій
openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
