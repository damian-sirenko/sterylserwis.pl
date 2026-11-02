document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalForm = document.getElementById('modal-form');
  const modalStatus = document.getElementById('modal-status');
  const modalStatusMessage = document.getElementById('modal-status-message');

  const streetHouseField = document.getElementById('street-house');
  const postalCodeField = document.getElementById('postal-code');
  const cityField = document.getElementById('city');
  const addressHiddenField = document.getElementById('address');

  const startDateField = document.getElementById('start-date');

  if (startDateField) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    startDateField.min = `${yyyy}-${mm}-${dd}`;
  }

  const companyNameField = document.getElementById('company-name');

  const nipField = document.getElementById('nip');
  const fullNameField = document.getElementById('full-name');
  const peselField = document.getElementById('pesel');
  document.querySelectorAll('input[data-only-digits]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D+/g, '');
    });

    input.addEventListener('paste', e => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      input.value = text.replace(/\D+/g, '').slice(0, input.maxLength);
    });
  });

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

  const deliveryRadios = document.querySelectorAll(
    'input[name="Dostarczenie"]'
  );
  const paczkomatField = document.getElementById('paczkomat-field');
  const paczkomatInput = document.getElementById('paczkomat');

  function togglePaczkomatField() {
    const selectedDelivery = document.querySelector(
      'input[name="Dostarczenie"]:checked'
    ).value;
    const isPaczkomat = selectedDelivery === 'paczkomat';

    paczkomatField.style.display = isPaczkomat ? 'block' : 'none';
    paczkomatInput.required = isPaczkomat;
  }

  togglePaczkomatField(); // ініціалізація

  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', togglePaczkomatField);
  });

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

    if (
      addressHiddenField &&
      streetHouseField &&
      postalCodeField &&
      cityField
    ) {
      const street = streetHouseField.value.trim();
      const postal = postalCodeField.value.trim();
      const city = cityField.value.trim();
      addressHiddenField.value = `${street}, ${postal} ${city}`.trim();
    }

    const selectedType = document.querySelector(
      'input[name="Typ_klienta"]:checked'
    ).value;

    if (selectedType === 'Firma') {
      if (!/^\d{10}$/.test(nipField.value)) {
        modalStatus.classList.remove('hidden');
        modalStatusMessage.textContent =
          '❌ NIP musi zawierać dokładnie 10 cyfr';
        modalStatusMessage.style.color = 'red';
        nipField.focus();
        return;
      }
    }

    if (selectedType === 'Osoba prywatna') {
      if (!/^\d{11}$/.test(peselField.value)) {
        modalStatus.classList.remove('hidden');
        modalStatusMessage.textContent =
          '❌ PESEL musi zawierać dokładnie 11 cyfr';
        modalStatusMessage.style.color = 'red';
        peselField.focus();
        return;
      }
    }

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
