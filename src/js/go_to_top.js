// Додаємо подію DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const goToTopButton = document.getElementById('goToTop');

  // Показувати кнопку після певної кількості пікселів прокрутки
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      // Змінюйте значення "300" за потреби
      goToTopButton.style.display = 'flex';
    } else {
      goToTopButton.style.display = 'none';
    }
  });

  // Повернення до верху при кліку на кнопку
  goToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавна прокрутка
    });
  });
});
