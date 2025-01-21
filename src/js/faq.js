document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо всі елементи з класом faq-item
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Якщо елемент вже відкритий, закриваємо його
      const isOpen = item.classList.contains('open');

      // Закриваємо всі інші елементи
      faqItems.forEach(el => {
        el.classList.remove('open');
        const icon = el.querySelector('.faq-item-icon use');
        if (icon) {
          icon.setAttribute('href', '../img/icons.svg#plus_faq'); // Іконка плюса
        }
        const answer = el.querySelector('.faq-item-answer');
        if (answer) {
          answer.style.maxHeight = null; // Приховуємо відповідь
        }
      });

      // Відкриваємо або закриваємо клікнутий елемент
      if (!isOpen) {
        item.classList.add('open');
        const icon = item.querySelector('.faq-item-icon use');
        if (icon) {
          icon.setAttribute('href', '../img/icons.svg#minus_faq'); // Іконка мінуса
        }
        const answer = item.querySelector('.faq-item-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px'; // Показуємо відповідь
        }
      }
    });
  });
});
