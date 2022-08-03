// Declarar variable para lista de filtros bloqueados
let ListaDominios=[];

// Extraer URLs de base de datos y guardar en array
fetch('https://script.google.com/macros/s/AKfycbzZpQ1X-cvxGqrFqFkKNHWwgcxeyyedmCkMx8Dvf8zLUaX7h7c_FM-b6_8RBfw0bos8_w/exec?sheet=webs')
.then(response => response.json())
.then(Listas => {Listas.data.map(function(element){ListaDominios.push(element["dominio"]);});});

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
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Si contiene un texto válido
	if(tab.url!=undefined){
		// ListaDominios - Lista de IPs a bloquear
		// tab.url - URL de página cargada

		let url = new URL(tab.url) // Declarar URL de la pestaña como objeto URL (La variable URL en mayúsculas da un conflicto y no funcionará)
		let Dominio = url.hostname // Nombre de dominio

		// Si array dominio contiene X
		if (ListaDominios.includes(Dominio)){
			// Cerrar pestaña
			chrome.tabs.remove(tabId);
			
		// En caso de que se habra una pagina about:blank
		} else if (tab.url=="about:blank"){
			// Esperar 5 segundos (Por si redirecciona)
			setTimeout(function(){
				// Cerrar pestaña
				chrome.tabs.remove(tabId);
			},5000);
		}
	}
});