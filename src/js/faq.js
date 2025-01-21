document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Закриваємо всі питання
      faqItems.forEach(el => el.classList.remove('open'));

      // Відкриваємо тільки клікнуте питання
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
});
