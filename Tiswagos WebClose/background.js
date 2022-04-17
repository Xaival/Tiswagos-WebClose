// Declarar variable para lista de filtros bloqueados
let ListaDominios=[];

// Extraer URLs de base de datos y guardar en array
fetch('https://sheets.googleapis.com/v4/spreadsheets/1YG61sHOVHp-38W7WBMoZTuGT6zrEMW1_DB7gTtZJlZs/values/webs!F2:F?key=AIzaSyBIwM6uww1cw0vxk-4uEPkhY_5QzNE4ixI')
.then(response => response.json())
.then(Listas => {Listas.values.map(function(element){ListaDominios.push(element[0]);});});

// Mostrar fecha
let actual = new Date();
let siglo, mes, dia, hora, minuto, segundo;
siglo=actual.getFullYear();
mes=(actual.getMonth()+1 < 10) ? '0'+(actual.getMonth()+1) : actual.getMonth()+1;
dia=(actual.getDate() < 10) ? '0'+actual.getDate() : actual.getDate();
hora=(actual.getHours() < 10) ? '0'+actual.getHours() : actual.getHours();
minuto=(actual.getMinutes() < 10) ? '0'+actual.getMinutes() : actual.getMinutes();
segundo=(actual.getSeconds() < 10) ? '0'+actual.getSeconds() : actual.getSeconds();
console.log("Lista actualizada el "+siglo+"/"+mes+"/"+dia+" "+hora+":"+minuto+":"+segundo);


// Evento - cargar una pestaña
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // Si contiene un texto válido
  if(tab.url!=undefined){
    // ListaDominios - Lista de IPs a bloquear
    // tab.url - URL de página cargada

    let url = new URL(tab.url) // Declarar URL de la pestaña como objeto URL (La variable URL en mayúsculas da un conflicto y no funcionará)
    let Dominio = url.hostname // Nombre de dominio

    // Si array dominio contiene X
    if (ListaDominios.includes(Dominio) || tab.url=="about:blank"){
      // Cerrar pestaña
      chrome.tabs.remove(tabId);
    }
  }
});