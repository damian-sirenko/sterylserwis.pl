document.addEventListener('DOMContentLoaded', () => {
  const toolsItems = document.querySelectorAll('.tools-list-item');

  toolsItems.forEach(item => {
    item.addEventListener('click', () => {
      // Перевіряємо чи елемент вже перевернутий
      const isFlipped = item.classList.contains('flip');

      // Скидаємо перевертання для всіх карток
      toolsItems.forEach(el => el.classList.remove('flip'));

      // Перевертаємо тільки клікнуту картку, якщо вона ще не була перевернута
      if (!isFlipped) {
        item.classList.add('flip');
      }
    });
  });
});
