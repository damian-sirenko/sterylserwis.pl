import"./assets/go_to_top-nvb4_xjg.js";function p(){const e=document.querySelector(".container-header-hero");e.style.minHeight=`${window.innerHeight}px`}p();window.addEventListener("resize",p);document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".tools-list-item");e.forEach(o=>{o.addEventListener("click",()=>{const t=o.classList.contains("flip");e.forEach(s=>s.classList.remove("flip")),t||o.classList.add("flip")})})});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("modal"),o=document.querySelector(".modal-content"),t=document.querySelector(".modal-title"),s=document.querySelectorAll(".offer-item-btn"),r=document.getElementById("close-modal");s.forEach(c=>{c.addEventListener("click",y=>{y.preventDefault();const k=c.dataset.abonament;e&&t&&(t.textContent=`Formularz zamówienia abonamentu ${k}`,t.style.FontFamily="Montserrat, sans-serif",e.classList.add("active"),document.body.style.overflow="hidden",o.style.overflow="auto")})}),r.addEventListener("click",l),e.addEventListener("click",c=>{c.target===e&&l()});function l(){e.classList.remove("active"),document.body.style.overflow="auto"}document.addEventListener("keydown",c=>{c.key==="Escape"&&e.classList.contains("active")&&l()}),e&&e.querySelector("input, select, textarea").focus();const n=document.querySelectorAll('input[name="contractType"]'),d=document.getElementById("company-name"),a=document.getElementById("nip"),m=document.getElementById("full-name"),i=document.getElementById("pesel");function u(){document.querySelector('input[name="contractType"]:checked').value==="firma"?(d.disabled=!1,a.disabled=!1,m.disabled=!0,i.disabled=!0):(d.disabled=!0,a.disabled=!0,m.disabled=!1,i.disabled=!1)}u(),n.forEach(c=>{c.addEventListener("change",u)})});document.querySelectorAll(".how-list-item").forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("open")?e.classList.remove("open"):(document.querySelectorAll(".how-list-item").forEach(o=>{o.classList.remove("open")}),e.classList.add("open"))})});window.calculatePlan=function(){const o=[{name:"STERYL 20",packets:20,price:110},{name:"STERYL 30",packets:30,price:140},{name:"STERYL 50",packets:50,price:210},{name:"STERYL 100",packets:100,price:300},{name:"STERYL 150",packets:150,price:360},{name:"STERYL 200",packets:200,price:430},{name:"STERYL 300",packets:300,price:550},{name:"STERYL 500",packets:500,price:780}],t=parseInt(document.querySelector("#packets").value),s=document.querySelector("#packets"),r=document.querySelector("#result"),l=document.querySelector(".calc-button");if(isNaN(t)||t<=0){r.innerHTML="Proszę wpisać poprawną liczbę pakietów.";return}if(t>1e3){r.innerHTML=`
      Masz duży wolumen narzędzi do sterylizacji. <br>
      Warto skontaktować się z nami, aby ustalić indywidualne warunki współpracy.
    `,s.value="",l.blur();return}let n=null,d=1/0;o.forEach(a=>{const m=a.price/a.packets;let i=a.price;if(t>a.packets){const u=t-a.packets;i+=u*m}i<d&&(d=i,n={...a,totalCost:i,extraPackets:t>a.packets?t-a.packets:0,costPerPacket:m.toFixed(2)})}),n?r.innerHTML=`
      Przy ${t} pakietach miesięcznie najlepszym wyborem dla Ciebie jest abonament 
      <strong>${n.name}</strong>.<br>
      Koszt sterylizacji jednego pakietu w tym abonamencie wynosi <strong>${n.costPerPacket} zł</strong>.<br>
      ${n.extraPackets>0?`Miesięczny koszt tego abonamentu to <strong>${n.price.toFixed(2)} zł </strong>, <br>
			   koszt sterylizacji ${n.extraPackets} pakietów poza abonamentem wynosi <strong>${(n.extraPackets*n.costPerPacket).toFixed(2)} zł.</strong>`:"Brak dodatkowych kosztów. <br>"}
					<br> Całkowity koszt sterylizacli ${t} pakietów miesiecznie z abonamentem <strong>${n.name}</strong> wynosi <strong>${n.totalCost.toFixed(2)} zł. </strong>
					`:r.innerHTML="Nie znaleziono odpowiedniego abonamentu.",s.value="",l.blur()};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".faq-item");e.forEach(o=>{o.addEventListener("click",()=>{const t=o.classList.contains("open");e.forEach(s=>s.classList.remove("open")),t||o.classList.add("open")})})});
//# sourceMappingURL=index.js.map
