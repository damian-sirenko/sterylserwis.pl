const faqSection = document.querySelector('.faq');

if (faqSection) {
  const faqTabs = Array.from(faqSection.querySelectorAll('.faq__tab'));
  const faqList = faqSection.querySelector('.faq__list');
  const faqToggles = Array.from(faqSection.querySelectorAll('.faq__toggle'));
  const faqFiltered = Array.from(faqSection.querySelectorAll('.faq__list [data-cat]'));

  function setFaqItem(toggle, open) {
    const answer = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.closest('.faq__item').classList.toggle('is-open', open);
    if (answer) answer.hidden = !open;
  }

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      faqToggles
        .filter(other => other !== toggle && other.getAttribute('aria-expanded') === 'true')
        .forEach(other => setFaqItem(other, false));
      setFaqItem(toggle, willOpen);
    });
  });

  function selectFaqTab(selectedTab) {
    const filter = selectedTab.dataset.filter;
    faqTabs.forEach(tab => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });
    faqList.dataset.filter = filter;
    faqList.setAttribute('aria-labelledby', selectedTab.id);
    faqFiltered.forEach(element => {
      element.hidden = filter !== 'all' && element.dataset.cat !== filter;
    });
  }

  faqTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectFaqTab(tab));
    tab.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const nextTab = faqTabs[(index + step + faqTabs.length) % faqTabs.length];
      nextTab.focus();
      selectFaqTab(nextTab);
    });
  });

  const initialTab = faqTabs.find(tab => tab.getAttribute('aria-selected') === 'true');
  if (initialTab) selectFaqTab(initialTab);
}
