window.calculatePlan = function calculatePlan() {
  const plans = [
    { name: 'STERYL 20', packets: 20, price: 110.0 },
    { name: 'STERYL 30', packets: 30, price: 140.0 },
    { name: 'STERYL 50', packets: 50, price: 210.0 },
    { name: 'STERYL 100', packets: 100, price: 300.0 },
    { name: 'STERYL 150', packets: 150, price: 360.0 },
    { name: 'STERYL 200', packets: 200, price: 430.0 },
    { name: 'STERYL 300', packets: 300, price: 550.0 },
    { name: 'STERYL 500', packets: 500, price: 780.0 },
  ];

  // Отримуємо значення кількості пакетів
  const packets = parseInt(document.querySelector('#packets').value);
  const packetsInput = document.querySelector('#packets');
  const resultDiv = document.querySelector('#result');
  const calcButton = document.querySelector('.calc-button');

  // Валідація введених даних
  if (isNaN(packets) || packets <= 0) {
    resultDiv.innerHTML = 'Proszę wpisać poprawną liczbę pakietów.';
    return;
  }
  if (packets > 1000) {
    resultDiv.innerHTML = `
      Masz duży wolumen narzędzi do sterylizacji. <br>
      Warto skontaktować się z nami, aby ustalić indywidualne warunki współpracy.
    `;
    packetsInput.value = ''; // Очищаємо поле вводу
    calcButton.blur(); // Знімаємо фокус з кнопки
    return;
  }

  let bestPlan = null;
  let lowestTotalCost = Infinity;

  plans.forEach(plan => {
    const costPerPacket = plan.price / plan.packets; // Вартість одного пакета
    let totalCost = plan.price;

    // Додавання вартості додаткових пакетів
    if (packets > plan.packets) {
      const extraPackets = packets - plan.packets;
      totalCost += extraPackets * costPerPacket;
    }

    // Пошук найкращого плану
    if (totalCost < lowestTotalCost) {
      lowestTotalCost = totalCost;
      bestPlan = {
        ...plan,
        totalCost: totalCost,
        extraPackets: packets > plan.packets ? packets - plan.packets : 0,
        costPerPacket: costPerPacket.toFixed(2),
      };
    }
  });

  // Відображення результату
  if (bestPlan) {
    resultDiv.innerHTML = `
      Przy ${packets} pakietach miesięcznie najlepszym wyborem dla Ciebie jest abonament 
      <strong>${bestPlan.name}</strong>.<br>
      Koszt sterylizacji jednego pakietu w tym abonamencie wynosi <strong>${
        bestPlan.costPerPacket
      } zł</strong>.<br>
      ${
        bestPlan.extraPackets > 0
          ? `Miesięczny koszt tego abonamentu to <strong>${bestPlan.price.toFixed(
              2
            )} zł </strong>, <br>
			   koszt sterylizacji ${
           bestPlan.extraPackets
         } pakietów poza abonamentem wynosi <strong>${(
              bestPlan.extraPackets * bestPlan.costPerPacket
            ).toFixed(2)} zł.</strong>`
          : 'Brak dodatkowych kosztów. <br>'
      }
					<br> Całkowity koszt sterylizacli ${packets} pakietów miesiecznie z abonamentem <strong>${
      bestPlan.name
    }</strong> wynosi <strong>${bestPlan.totalCost.toFixed(2)} zł. </strong>
					`;
  } else {
    resultDiv.innerHTML = 'Nie znaleziono odpowiedniego abonamentu.';
  }
  packetsInput.value = '';
  calcButton.blur();
};
