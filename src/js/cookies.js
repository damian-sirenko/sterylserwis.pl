// cookieConsent.js
document.addEventListener('DOMContentLoaded', function () {
  // Wyświetl okno cookies po 3 sekundach, jeśli zgoda nie została udzielona
  setTimeout(function () {
    if (!localStorage.getItem('cookieConsentAccepted')) {
      document.getElementById('cookieConsent').classList.add('show');
    }
  }, 3000);

  // Obsługa przycisku "Rozumiem"
  document
    .getElementById('cookieConsentBtn')
    .addEventListener('click', function () {
      localStorage.setItem('cookieConsentAccepted', 'true');
      document.getElementById('cookieConsent').classList.remove('show');
    });
});
