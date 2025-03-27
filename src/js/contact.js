const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');
const spinner = document.getElementById('spinner');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // 🔄 WYSYŁANIE... (польською)
  spinner.innerHTML = 'Wysyłanie wiadomości...';
  spinner.style.display = 'block';
  result.style.display = 'none';

  const formData = new FormData(form);
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
      spinner.style.display = 'none';
      result.style.display = 'block';
      result.style.marginTop = '8px'; // ✅ відступ від кнопки
      const json = await response.json();

      if (response.status === 200) {
        result.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M20.285 6.709a1 1 0 0 0-1.41-1.418l-9.192 9.191-4.242-4.242a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l10-10z"/>
            </svg>
            <span style="color: white; font-weight: 500;">Wiadomość została wysłana!</span>
          </div>
        `;
        form.reset();
      } else {
        result.innerHTML = '❌ ' + json.message;
        result.style.color = 'red';
      }

      setTimeout(() => {
        result.style.display = 'none';
      }, 3000);
    })
    .catch(error => {
      spinner.style.display = 'none';
      result.innerHTML = '❌ Wystąpił problem z połączeniem. Spróbuj ponownie.';
      result.style.color = 'red';
      result.style.display = 'block';
      result.style.marginTop = '8px';

      setTimeout(() => {
        result.style.display = 'none';
      }, 3000);
    });
});
