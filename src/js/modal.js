document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');
  const modalTitle = document.querySelector('.modal-title');
  const openModalButtons = document.querySelectorAll('.offer-item-btn');
  const closeModalButton = document.getElementById('close-modal');

  // Відкриття модального вікна
  openModalButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const abonament = button.dataset.abonament; // Отримуємо абонемент
      if (modal && modalTitle) {
        modalTitle.textContent = `Zamówienie: ${abonament}`;
        modalTitle.style.FontFamily = 'Montserrat, sans-serif';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Забороняємо прокручування сторінки
        modalContent.style.overflow = 'auto';
      }
    });
  });

  // Закриття модального вікна
  closeModalButton.addEventListener('click', closeModal);

  // Закриття модального вікна при кліку поза вмістом
  modal.addEventListener('click', event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Функція закриття модального вікна
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Відновлюємо прокручування сторінки
  }

  // Додавання обробника події Escape для закриття модального вікна
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Фокус на перший елемент форми при відкритті модального вікна
  if (modal) {
    modal.querySelector('input, select, textarea').focus();
  }

  // Отримуємо елементи полів та радіокнопок
  const contractTypeRadios = document.querySelectorAll(
    'input[name="contractType"]'
  );
  const companyNameField = document.getElementById('company-name');
  const nipField = document.getElementById('nip');
  const fullNameField = document.getElementById('full-name');
  const peselField = document.getElementById('pesel');

  // Функція для оновлення стану полів форми
  function updateFormFields() {
    if (
      document.querySelector('input[name="contractType"]:checked').value ===
      'firma'
    ) {
      // Якщо вибрано "Firma", активуємо поля для фірми
      companyNameField.disabled = false;
      nipField.disabled = false;
      fullNameField.disabled = true;
      peselField.disabled = true;
    } else {
      // Якщо вибрано "Osoba", активуємо поля для особи
      companyNameField.disabled = true;
      nipField.disabled = true;
      fullNameField.disabled = false;
      peselField.disabled = false;
    }
  }

  // Викликаємо функцію при завантаженні сторінки
  updateFormFields();

  // Додаємо обробник події для зміни вибору радіокнопок
  contractTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateFormFields);
  });
});
