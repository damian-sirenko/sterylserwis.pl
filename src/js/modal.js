document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalForm = document.getElementById('modal-form');
  const modalStatus = document.getElementById('modal-status');
  const modalStatusMessage = document.getElementById('modal-status-message');

  const companyNameField = document.getElementById('company-name');
  const nipField = document.getElementById('nip');
  const fullNameField = document.getElementById('full-name');
  const peselField = document.getElementById('pesel');
  const formNameField = modalForm.querySelector(
    'input[name="Nazwa_formularzu"]'
  );

  const contractTypeRadios = document.querySelectorAll(
    'input[name="Typ_klienta"]'
  );

  function updateFieldStates() {
    const selected = document.querySelector(
      'input[name="Typ_klienta"]:checked'
    ).value;
    const isCompany = selected === 'Firma';

    companyNameField.disabled = !isCompany;
    nipField.disabled = !isCompany;
    fullNameField.disabled = isCompany;
    peselField.disabled = isCompany;
  }

  updateFieldStates();

  contractTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateFieldStates);
  });

  closeModalBtn.addEventListener('click', function () {
    modal.classList.remove('active');
    modalStatus.classList.add('hidden');
  });

  document.querySelectorAll('.offer-item-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const abonament = this.getAttribute('data-abonament');
      modal.classList.add('active');

      // const messageField = document.getElementById('message');
      // if (abonament && messageField) {
      //   messageField.value = `Zamówienie abonamentu: ${abonament}`;
      // }

      if (formNameField && abonament) {
        formNameField.value = `Formularz zamówienia abonamentu: ${abonament}`;
      }

      modalStatus.classList.add('hidden');
      modalStatusMessage.textContent = '';
      updateFieldStates();
    });
  });

  modalForm.addEventListener('submit', function (event) {
    event.preventDefault();

    modalStatus.classList.remove('hidden');
    modalStatusMessage.style.color = '#333';
    modalStatusMessage.innerHTML = '📨 Wysyłanie wiadomości...';

    const formData = new FormData(modalForm);

    formData.append('subject', 'Zamówienie z formularza STERYL SERWIS');
    formData.append('from_name', 'STERYL SERWIS – formularz zamówienia');

    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then(async response => {
        const json = await response.json();
        modalStatus.classList.remove('hidden');
        if (response.status === 200) {
          modalStatusMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#4CAF50">
                <path d="M20.285 6.709a1 1 0 0 0-1.41-1.418l-9.192 9.191-4.242-4.242a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l10-10z"/>
              </svg>
              <span style="font-weight: 500;">Wiadomość została wysłana!</span>
            </div>
          `;
          modalForm.reset();
          setTimeout(() => {
            modal.classList.remove('active');
            modalStatus.classList.add('hidden');
          }, 3000);
        } else {
          modalStatusMessage.textContent = '❌ ' + json.message;
          modalStatusMessage.style.color = 'red';
        }
      })
      .catch(error => {
        modalStatus.classList.remove('hidden');
        modalStatusMessage.textContent =
          '❌ Coś poszło nie tak. Spróbuj ponownie.';
        modalStatusMessage.style.color = 'red';
      });
  });
});
