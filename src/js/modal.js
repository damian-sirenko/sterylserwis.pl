document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal'); // Модальне вікно
  const modalTitle = document.querySelector('.modal-title'); // Заголовок модального вікна
  const openModalButtons = document.querySelectorAll('.offer-item-btn'); // Кнопки "ZAMAWIAM"
  const closeModal = document.getElementById('close-modal'); // Кнопка закриття

  // Відкрити модальне вікно
  openModalButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Забороняємо стандартну поведінку <a>
      const abonament = button.dataset.abonament; // Отримуємо тип абонемента
      if (modal && modalTitle) {
        modalTitle.textContent = `Zamówienie: ${abonament}`; // Встановлюємо назву у модальному вікні
        modal.classList.add('active'); // Додаємо клас для відображення модального вікна
        document.body.style.overflow = 'hidden'; // Забороняємо прокрутку сторінки
      }
    });
  });

  // Закрити модальне вікно
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active'); // Видаляємо клас
      setTimeout(() => {
        modal.style.display = 'none'; // Приховуємо вікно після анімації
        document.body.style.overflow = 'auto'; // Відновлюємо прокрутку сторінки
      }, 500); // Час, який відповідає transition в CSS
    });
  }
});
