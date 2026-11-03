const orderModal = document.getElementById('modal');

if (orderModal && typeof orderModal.showModal === 'function') {
  const orderForm = document.getElementById('modal-form');
  const orderStatus = document.getElementById('modal-status');
  const orderStatusMessage = document.getElementById('modal-status-message');
  const orderSuccess = document.getElementById('order-success');
  const orderPlan = document.getElementById('order-plan');
  const orderSubmit = orderForm.querySelector('.order__submit');
  const formNameField = orderForm.querySelector('input[name="Nazwa_formularzu"]');
  const paczkomatField = document.getElementById('paczkomat-field');
  const paczkomatInput = document.getElementById('paczkomat');
  const startDateField = document.getElementById('start-date');
  const postalCodeField = document.getElementById('postal-code');

  if (startDateField) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    startDateField.min = `${yyyy}-${mm}-${dd}`;
  }

  function setOrderStatus(message, type) {
    orderStatusMessage.textContent = message;
    if (type) {
      orderStatus.dataset.type = type;
    } else {
      delete orderStatus.dataset.type;
    }
  }

  function updateClientType() {
    const selected = orderForm.querySelector('input[name="Typ_klienta"]:checked').value;
    orderForm.querySelectorAll('[data-for-type]').forEach(field => {
      const isActive = field.dataset.forType === selected;
      field.hidden = !isActive;
      field.querySelectorAll('input').forEach(input => {
        input.disabled = !isActive;
      });
    });
  }

  function updateDelivery() {
    const isPaczkomat =
      orderForm.querySelector('input[name="Dostarczenie"]:checked').value === 'paczkomat';
    paczkomatField.hidden = !isPaczkomat;
    paczkomatInput.disabled = !isPaczkomat;
    paczkomatInput.required = isPaczkomat;
  }

  function updateFormName() {
    if (formNameField && orderPlan) {
      formNameField.value = `Formularz zamówienia abonamentu: ${orderPlan.value}`;
    }
  }

  function openOrder(plan) {
    orderForm.hidden = false;
    orderSuccess.hidden = true;
    setOrderStatus('', null);
    if (plan && orderPlan) {
      const option = Array.from(orderPlan.options).find(item => item.value === plan);
      if (option) orderPlan.value = plan;
    }
    updateFormName();
    updateClientType();
    updateDelivery();
    orderModal.showModal();
    document.body.classList.add('is-order-open');
  }

  function closeOrder() {
    if (orderModal.open) orderModal.close();
  }

  document.querySelectorAll('.offer-item-btn, [data-abonament]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      openOrder(button.getAttribute('data-abonament'));
    });
  });

  document.getElementById('close-modal').addEventListener('click', closeOrder);
  orderModal.querySelectorAll('[data-order-close]').forEach(button =>
    button.addEventListener('click', closeOrder)
  );
  orderModal.addEventListener('click', event => {
    if (event.target === orderModal) closeOrder();
  });
  orderModal.addEventListener('close', () => {
    document.body.classList.remove('is-order-open');
  });

  orderForm.querySelectorAll('input[name="Typ_klienta"]').forEach(radio =>
    radio.addEventListener('change', updateClientType)
  );
  orderForm.querySelectorAll('input[name="Dostarczenie"]').forEach(radio =>
    radio.addEventListener('change', updateDelivery)
  );
  if (orderPlan) orderPlan.addEventListener('change', updateFormName);

  orderForm.querySelectorAll('input[data-only-digits]').forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D+/g, '');
    });
  });

  if (postalCodeField) {
    postalCodeField.addEventListener('input', () => {
      const digits = postalCodeField.value.replace(/\D+/g, '').slice(0, 5);
      postalCodeField.value = digits.length > 2 ? `${digits.slice(0, 2)}-${digits.slice(2)}` : digits;
    });
  }

  function validateOrder() {
    const checks = [
      { field: document.getElementById('nip'), test: value => /^\d{10}$/.test(value), message: 'NIP musi zawierać dokładnie 10 cyfr.' },
      { field: document.getElementById('pesel'), test: value => /^\d{11}$/.test(value), message: 'PESEL musi zawierać dokładnie 11 cyfr.' },
      { field: postalCodeField, test: value => /^\d{2}-\d{3}$/.test(value), message: 'Kod pocztowy musi mieć format 00-000.' },
    ];
    orderForm.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    for (const check of checks) {
      if (check.field && !check.field.disabled && !check.test(check.field.value.trim())) {
        check.field.setAttribute('aria-invalid', 'true');
        check.field.focus();
        setOrderStatus(check.message, 'error');
        return false;
      }
    }
    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();
      return false;
    }
    return true;
  }

  orderForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateOrder()) return;

    const street = document.getElementById('street-house').value.trim();
    const city = document.getElementById('city').value.trim();
    document.getElementById('address').value = `${street}, ${postalCodeField.value.trim()} ${city}`;

    const formData = new FormData(orderForm);
    formData.append('subject', `Zamówienie abonamentu ${orderPlan ? orderPlan.value : ''} – STERYL SERWIS`);
    formData.append('from_name', 'STERYL SERWIS – formularz zamówienia');

    orderSubmit.disabled = true;
    setOrderStatus('Wysyłanie zamówienia…', 'info');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then(async response => {
        const data = await response.json();
        if (response.status === 200) {
          orderForm.reset();
          setOrderStatus('', null);
          orderForm.hidden = true;
          orderSuccess.hidden = false;
          orderModal.querySelector('.order__box').scrollTop = 0;
        } else {
          setOrderStatus(data.message || 'Nie udało się wysłać zamówienia. Spróbuj ponownie.', 'error');
        }
      })
      .catch(() => {
        setOrderStatus('Wystąpił problem z połączeniem. Spróbuj ponownie lub zadzwoń: 739 015 287.', 'error');
      })
      .finally(() => {
        orderSubmit.disabled = false;
      });
  });
}
