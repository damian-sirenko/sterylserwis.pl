document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const contractTypeInputs = document.querySelectorAll('[name="contractType"]');
  const companyNameField = document.getElementById('company-name');
  const fullNameField = document.getElementById('full-name');
  const nipField = document.getElementById('nip');
  const peselField = document.getElementById('pesel');

  // Функція оновлення доступності полів
  const updateFields = () => {
    const selectedValue = document.querySelector(
      '[name="contractType"]:checked'
    ).value;
    if (selectedValue === 'firma') {
      companyNameField.disabled = false;
      nipField.disabled = false;
      fullNameField.disabled = true;
      peselField.disabled = true;
    } else {
      companyNameField.disabled = true;
      nipField.disabled = true;
      fullNameField.disabled = false;
      peselField.disabled = false;
    }
  };

  // Ініціалізація стану полів
  updateFields();

  // Додати слухачів подій для перемикачів
  contractTypeInputs.forEach(input => {
    input.addEventListener('change', updateFields);
  });

  // Закриття модального вікна
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Відновити прокрутку сторінки
  });

  // Відкриття модального вікна
  setTimeout(() => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Заборонити прокрутку сторінки
  }, 300);
});
