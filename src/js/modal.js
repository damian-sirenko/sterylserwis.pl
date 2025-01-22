document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal'); // Модальне вікно
  const modalContent = document.querySelector('.modal-content'); // Вміст модального вікна
  const modalTitle = document.querySelector('.modal-title'); // Заголовок
  const openModalButtons = document.querySelectorAll('.offer-item-btn'); // Кнопки відкриття
  const closeModalButton = document.getElementById('close-modal'); // Кнопка закриття

  // Відкрити модальне вікно
  openModalButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); // Заборонити стандартну поведінку посилання
      const abonament = button.dataset.abonament; // Отримати тип абонемента
      if (modal && modalTitle) {
        modalTitle.textContent = `Zamówienie: ${abonament}`; // Оновити заголовок
        modal.classList.add('active'); // Додати клас active
        document.body.style.overflow = 'hidden'; // Заборонити прокрутку сторінки
      }
    });
  });

  // Закрити модальне вікно при натисканні кнопки
  closeModalButton.addEventListener('click', () => {
    closeModal();
  });

  // Закрити модальне вікно при натисканні поза межами вмісту
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Функція закриття модального вікна
  function closeModal() {
    modal.classList.remove('active'); // Видалити клас active
    document.body.style.overflow = 'auto'; // Відновити прокрутку сторінки
  }
});
