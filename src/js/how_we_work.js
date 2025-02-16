document.querySelectorAll('.how-list-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('open');
  });
  item.addEventListener('mouseleave', () => {
    item.classList.remove('open');
  });
});
