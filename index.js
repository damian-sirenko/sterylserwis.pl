import"./assets/go_to_top-otVYy5Mj.js";/* empty css                      */function y(){const e=document.querySelector(".container-header-hero");e.style.minHeight=`${window.innerHeight}px`}y();window.addEventListener("resize",y);document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".tools-list-item");e.forEach(n=>{n.addEventListener("click",()=>{const t=n.classList.contains("flip");e.forEach(s=>s.classList.remove("flip")),t||n.classList.add("flip")})})});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("modal"),n=document.querySelector(".modal-content"),t=document.querySelector(".modal-title"),s=document.querySelectorAll(".offer-item-btn"),r=document.getElementById("close-modal");s.forEach(c=>{c.addEventListener("click",k=>{k.preventDefault();const f=c.dataset.abonament;e&&t&&(t.textContent=`Formularz zamówienia abonamentu ${f}`,t.style.FontFamily="Montserrat, sans-serif",e.classList.add("active"),document.body.style.overflow="hidden",n.style.overflow="auto")})}),r.addEventListener("click",l),e.addEventListener("click",c=>{c.target===e&&l()});function l(){e.classList.remove("active"),document.body.style.overflow="auto"}document.addEventListener("keydown",c=>{c.key==="Escape"&&e.classList.contains("active")&&l()}),e&&e.querySelector("input, select, textarea").focus();const o=document.querySelectorAll('input[name="contractType"]'),d=document.getElementById("company-name"),a=document.getElementById("nip"),m=document.getElementById("full-name"),i=document.getElementById("pesel");function u(){document.querySelector('input[name="contractType"]:checked').value==="firma"?(d.disabled=!1,a.disabled=!1,m.disabled=!0,i.disabled=!0):(d.disabled=!0,a.disabled=!0,m.disabled=!1,i.disabled=!1)}u(),o.forEach(c=>{c.addEventListener("change",u)})});document.querySelectorAll(".how-list-item").forEach(e=>{e.addEventListener("mouseenter",()=>{e.classList.add("open")}),e.addEventListener("mouseleave",()=>{e.classList.remove("open")})});window.calculatePlan=function(){const n=[{name:"STERYL 20",packets:20,price:110},{name:"STERYL 30",packets:30,price:140},{name:"STERYL 50",packets:50,price:210},{name:"STERYL 100",packets:100,price:300},{name:"STERYL 150",packets:150,price:360},{name:"STERYL 200",packets:200,price:430},{name:"STERYL 300",packets:300,price:550},{name:"STERYL 500",packets:500,price:780}],t=parseInt(document.querySelector("#packets").value),s=document.querySelector("#packets"),r=document.querySelector("#result"),l=document.querySelector(".calc-button");if(isNaN(t)||t<=0){r.innerHTML="Proszę wpisać poprawną liczbę pakietów.";return}if(t>1e3){r.innerHTML=`
      Masz duży wolumen narzędzi do sterylizacji. <br>
      Warto skontaktować się z nami, aby ustalić indywidualne warunki współpracy.
    `,s.value="",l.blur();return}let o=null,d=1/0;n.forEach(a=>{const m=a.price/a.packets;let i=a.price;if(t>a.packets){const u=t-a.packets;i+=u*m}i<d&&(d=i,o={...a,totalCost:i,extraPackets:t>a.packets?t-a.packets:0,costPerPacket:m.toFixed(2)})}),o?r.innerHTML=`
      Przy ${t} pakietach miesięcznie najlepszym wyborem dla Ciebie jest abonament 
      <strong>${o.name}</strong>.<br>
      Koszt sterylizacji jednego pakietu w tym abonamencie wynosi <strong>${o.costPerPacket} zł</strong>.<br>
      ${o.extraPackets>0?`Miesięczny koszt tego abonamentu to <strong>${o.price.toFixed(2)} zł </strong>, <br>
			   koszt sterylizacji ${o.extraPackets} pakietów poza abonamentem wynosi <strong>${(o.extraPackets*o.costPerPacket).toFixed(2)} zł.</strong>`:"Brak dodatkowych kosztów. <br>"}
					<br> Całkowity koszt sterylizacli ${t} pakietów miesiecznie z abonamentem <strong>${o.name}</strong> wynosi <strong>${o.totalCost.toFixed(2)} zł. </strong>
					`:r.innerHTML="Nie znaleziono odpowiedniego abonamentu.",s.value="",l.blur()};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".faq-item");e.forEach(n=>{n.addEventListener("click",()=>{const t=n.classList.contains("open");e.forEach(s=>s.classList.remove("open")),t||n.classList.add("open")})})});let p;async function L(){const e={lat:50.08058630072034,lng:20.011118723923197},{Map:n}=await google.maps.importLibrary("maps"),{AdvancedMarkerElement:t}=await google.maps.importLibrary("marker");p=new n(document.getElementById("map"),{zoom:16,center:e,mapId:"DEMO_MAP_ID"}),new t({map:p,position:e,title:"Uluru"})}L();
//# sourceMappingURL=index.js.map
