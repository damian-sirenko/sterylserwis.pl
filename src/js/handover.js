const handoverTabs = Array.from(document.querySelectorAll('.handover__tab'));
const handoverSteps = document.getElementById('handover-steps');
const handoverModeItems = document.querySelectorAll('.handover [data-for]');

function selectHandoverMode(selectedTab) {
  const mode = selectedTab.dataset.mode;

  handoverTabs.forEach(tab => {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  handoverModeItems.forEach(item => {
    const modes = item.dataset.for.split(' ');
    item.hidden = !modes.includes(mode);
  });

  if (handoverSteps) {
    handoverSteps.setAttribute('aria-labelledby', selectedTab.id);
    handoverSteps.dataset.mode = mode;
    const visibleSteps = Array.from(
      handoverSteps.querySelectorAll('.handover__step')
    ).filter(step => !step.hidden);
    visibleSteps.forEach((step, index) => {
      step.classList.toggle('is-last', index === visibleSteps.length - 1);
    });
  }
}

const initialHandoverTab = handoverTabs.find(
  tab => tab.getAttribute('aria-selected') === 'true'
);
if (initialHandoverTab) selectHandoverMode(initialHandoverTab);

handoverTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectHandoverMode(tab));
  tab.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab =
      handoverTabs[(index + step + handoverTabs.length) % handoverTabs.length];
    nextTab.focus();
    selectHandoverMode(nextTab);
  });
});

if (handoverSteps && 'IntersectionObserver' in window) {
  const stepObserver = new IntersectionObserver(
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

  handoverSteps
    .querySelectorAll('.handover__step')
    .forEach(step => stepObserver.observe(step));
}
