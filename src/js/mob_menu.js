const backdrop = document.querySelector('.backdrop');
const openMenuBtn = document.querySelector('.burger-menu-wrap');
const closeMenuBtn = document.querySelector('.menu-close-btn');
const overlay = document.querySelector('.backdrop-overlay');
const menuItems = document.querySelectorAll('.mob-menu-item a');

// Функція для відкриття меню
const openMenu = () => {
  backdrop.classList.add('is-open');
  overlay.classList.add('is-open');
  // Робимо елементи видимими
  backdrop.style.visibility = 'visible';
  overlay.style.visibility = 'visible';
};

// Функція для закриття меню
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

// Закриваємо меню при кліку на будь-який пункт меню
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    closeMenu();
  });
});

// Закриваємо меню при кліку на оверлей
overlay.addEventListener('click', () => {
  closeMenu();
});

// Додаємо обробники подій для кнопок відкриття та закриття
openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
