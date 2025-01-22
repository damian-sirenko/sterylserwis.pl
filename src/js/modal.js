document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const contractTypeInputs = document.querySelectorAll('[name="contractType"]');
  const companyNameField = document.getElementById('company-name');
  const fullNameField = document.getElementById('full-name');
  const nipField = document.getElementById('nip');
  const peselField = document.getElementById('pesel');

  // Оновлення доступності полів форми залежно від вибору
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

  contractTypeInputs.forEach(input => {
    input.addEventListener('change', updateFields);
  });

  // Відкриття модального вікна
  setTimeout(() => {
    modal.style.bottom = '0';
  }, 300);

  // Закриття модального вікна
  closeModal.addEventListener('click', () => {
    modal.style.bottom = '-100%';
  });

  // Ініціалізація форми
  updateFields();
});
