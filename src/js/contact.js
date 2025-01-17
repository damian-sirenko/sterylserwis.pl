function validateForm() {
  const accept = document.getElementById('accept');
  if (!accept.checked) {
    alert('Ви повинні прийняти регламент перед відправкою форми.');
    return false;
  }
  return true;
}
