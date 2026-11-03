const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

function setContactStatus(message, type) {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.dataset.type = type;
}

if (contactForm) {
  const submitButton = contactForm.querySelector('.contact__submit');

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    submitButton.disabled = true;
    setContactStatus('Wysyłanie wiadomości…', 'info');

    const payload = JSON.stringify(Object.fromEntries(new FormData(contactForm).entries()));

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: payload,
    })
      .then(async response => {
        const data = await response.json();
        if (response.status === 200) {
          setContactStatus('Dziękujemy! Wiadomość została wysłana — odpowiemy najszybciej, jak to możliwe.', 'success');
          contactForm.reset();
        } else {
          setContactStatus(data.message || 'Nie udało się wysłać wiadomości. Spróbuj ponownie.', 'error');
        }
      })
      .catch(() => {
        setContactStatus('Wystąpił problem z połączeniem. Spróbuj ponownie lub zadzwoń: 739 015 287.', 'error');
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());
