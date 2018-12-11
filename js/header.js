function loadHeader(){
	var header = document.getElementsByTagName('header')[0];
	var hostUrl = "http://localhost/gerencia_legal_test";
	header.innerHTML = '<h1>Gerencia de Servicios Legales</h1>' +
	'<img src="' + hostUrl +'/images/logo_amdc.png">';
}