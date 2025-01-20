document.querySelectorAll('.how-list-item').forEach(step => {
  step.addEventListener('click', () => {
    // Якщо крок відкритий, закриваємо його
    if (step.classList.contains('open')) {
      step.classList.remove('open');
    } else {
      // Закриваємо всі інші кроки
      document.querySelectorAll('.how-list-item').forEach(otherStep => {
        otherStep.classList.remove('open');
      });
      // Відкриваємо поточний крок
      step.classList.add('open');
    }
  });
});
