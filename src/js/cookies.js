const consentKey = 'sterylConsent';
const consentBanner = document.getElementById('cookieConsent');

function readConsent() {
  try {
    return localStorage.getItem(consentKey);
  } catch (error) {
    return null;
  }
}

function saveConsent(value) {
  try {
    localStorage.setItem(consentKey, value);
  } catch (error) {
    return;
  }
}

function applyConsent(value) {
  const state = value === 'granted' ? 'granted' : 'denied';
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: state,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }
  window.dataLayer.push({ event: 'consent_update', consent_analytics: state });
}

function showConsentBanner() {
  if (consentBanner) consentBanner.hidden = false;
}

if (consentBanner) {
  if (!readConsent()) showConsentBanner();

  consentBanner.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset.consent;
      saveConsent(value);
      applyConsent(value);
      consentBanner.hidden = true;
    });
  });
}

document.querySelectorAll('.js-cookie-settings').forEach(button => {
  button.addEventListener('click', showConsentBanner);
});
