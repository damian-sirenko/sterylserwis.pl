const howSteps = document.querySelectorAll('#how-steps .how__step');

if (howSteps.length) {
  howSteps[howSteps.length - 1].classList.add('is-last');
}

if (howSteps.length && 'IntersectionObserver' in window) {
  const howStepObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-reached');
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('is-reached');
        }
      });
    },
    { rootMargin: '0px 0px -40% 0px' }
  );

  howSteps.forEach(step => howStepObserver.observe(step));
}
