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
          // Установка правильного атрибута для іконки
          icon.setAttribute('href', '#plus_faq'); // Замінюємо "плюс"
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
          // Замінюємо іконку на "мінус"
          icon.setAttribute('href', '#minus_faq');
        }
        const answer = item.querySelector('.faq-item-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px'; // Показуємо відповідь
        }
      }
    });
  });

  // Додавання додаткового захисту для мобільних браузерів
  const svgElements = document.querySelectorAll('.faq-item-icon use');
  svgElements.forEach(svg => {
    if (!svg.getAttribute('href')) {
      svg.setAttribute('href', '#plus_faq'); // Встановлюємо початкову іконку
    }
  });
});
