const pricingRange = document.getElementById('pricing-range');
const pricingNumber = document.getElementById('pricing-packets');
const pricingResult = document.getElementById('pricing-result');
const pricingPlans = Array.from(
  document.querySelectorAll('.pricing__grid .pricing__card')
);
const pricingSingle = document.querySelector('.pricing__card--single');
const pricingMax = 1000;

const formatPln = value =>
  value.toLocaleString('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' zł';

const packetsLabel = packets =>
  packets === 1 ? 'Przy 1 pakiecie' : `Przy ${packets} pakietach`;

function costHtml(packets, total, extraText) {
  return `<span class="pricing__cost-label">${packetsLabel(packets)} miesięcznie:</span><span class="pricing__cost-value">${formatPln(total)}</span>${extraText ? `<span class="pricing__cost-extra">${extraText}</span>` : ''}`;
}

function planCost(card, packets) {
  const limit = Number(card.dataset.limit);
  const price = Number(card.dataset.price);
  const unit = Number(card.dataset.unit);
  const extra = Math.max(0, packets - limit);
  return { total: price + extra * unit, extra };
}

function clearPricing(message) {
  [...pricingPlans, pricingSingle].forEach(card => {
    if (!card) return;
    card.classList.remove('is-best');
    card.querySelector('.pricing__cost').textContent = '';
  });
  pricingResult.innerHTML = message;
}

function updatePricing(packets) {
  if (!Number.isInteger(packets) || packets < 1) {
    clearPricing(
      'Przesuń suwak lub wpisz liczbę pakietów, a pokażemy koszt każdego wariantu.'
    );
    return;
  }
  if (packets > pricingMax) {
    clearPricing(
      'Przy tak dużej liczbie pakietów skontaktuj się z nami: <a href="tel:+48739015287">739 015 287</a> — ustalimy indywidualne warunki.'
    );
    return;
  }

  const options = pricingPlans.map(card => {
    const { total, extra } = planCost(card, packets);
    const unit = Number(card.dataset.unit);
    card.querySelector('.pricing__cost').innerHTML = costHtml(
      packets,
      total,
      extra > 0
        ? `w tym ${extra} ponad limit: <span class="pricing__nowrap">${formatPln(extra * unit)}</span>`
        : 'mieści się w abonamencie'
    );
    return { card, total, name: card.querySelector('.pricing__name').textContent };
  });

  if (pricingSingle) {
    const total = packets * Number(pricingSingle.dataset.single);
    pricingSingle.querySelector('.pricing__cost').innerHTML = costHtml(
      packets,
      total,
      `${packets} × 6,50 zł`
    );
    options.push({ card: pricingSingle, total, name: 'bez umowy' });
  }

  const best = options.reduce((a, b) => (b.total < a.total ? b : a));
  options.forEach(option =>
    option.card.classList.toggle('is-best', option === best)
  );

  const label = best.card === pricingSingle ? 'bez umowy' : `abonament <strong>${best.name}</strong>`;
  pricingResult.innerHTML = `Przy <strong>${packets}</strong> pakietach miesięcznie najkorzystniej wychodzi ${label}: <strong>${formatPln(best.total)}</strong> miesięcznie.`;
}

if (pricingRange && pricingNumber && pricingResult) {
  pricingRange.addEventListener('input', () => {
    const packets = Number(pricingRange.value);
    pricingNumber.value = packets;
    updatePricing(packets);
  });

  pricingNumber.addEventListener('input', () => {
    if (pricingNumber.value === '') {
      updatePricing(0);
      return;
    }
    const packets = Math.floor(Number(pricingNumber.value));
    pricingRange.value = Math.min(Math.max(packets, 1), Number(pricingRange.max));
    updatePricing(packets);
  });
}
