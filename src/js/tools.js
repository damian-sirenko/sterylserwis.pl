const toolsTabs = Array.from(document.querySelectorAll('.tools__tab'));

function selectToolsTab(selectedTab) {
  toolsTabs.forEach(tab => {
    const isSelected = tab === selectedTab;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.hidden = !isSelected;
  });
}

toolsTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectToolsTab(tab));
  tab.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab =
      toolsTabs[(index + step + toolsTabs.length) % toolsTabs.length];
    nextTab.focus();
    selectToolsTab(nextTab);
  });
});

const toolsVideo = document.querySelector('.tools__video');
const toolsDesktopQuery = window.matchMedia('(min-width: 1024px)');
const toolsReducedMotionQuery = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

if (toolsVideo && 'IntersectionObserver' in window) {
  const toolsVideoObserver = new IntersectionObserver(([entry]) => {
    const canPlay =
      entry.isIntersecting &&
      toolsDesktopQuery.matches &&
      !toolsReducedMotionQuery.matches;
    if (canPlay) {
      toolsVideo.play().catch(() => {});
    } else {
      toolsVideo.pause();
    }
  });
  toolsVideoObserver.observe(toolsVideo);
}
