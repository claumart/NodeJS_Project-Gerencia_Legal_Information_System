function loadMenuBar(){
	var menuBar = document.getElementById('gsl-menu');
	var divContenedor = document.createElement('div');
	menuBar.innerHTML = '<div class="top-bar-left">' +
			    	'<ul class="dropdown menu" data-dropdown-menu>' +
			      		'<li style="flex-basis: 60px" title="inicio">' +
			      			'<a href="index.html"><span><img src="images/blue-home-icon.png" width="100%"></span></a>' +
			      		'</li>' +
			      		'<li class="has-submenu">' +
			        		'<a href="#0">Crear ficha de entrada</a>' +
					        '<ul class="submenu menu vertical" data-submenu>' +
						        '<li><a href="nueva_ficha_expedientes.html#titulo_registro">De expedientes</a></li>' +
						        '<li><a href="nueva_ficha_opiniones.html#titulo_registro">De opiniones</a></li>' +
						        '<li><a href="nueva_ficha_patronatos.html#titulo_registro">De patronatos</a></li>' +
					        '</ul>' +
					    '</li>' +
					    '<li><a href="#0">Dar seguimiento</a>' +
					    	'<ul class="submenu menu vertical" data-submenu>' +
						        '<li><a href="seguimiento_expedientes.html#titulo_seguimiento">A expedientes</a></li>' +
						        '<li><a href="seguimiento_opiniones.html#titulo_seguimiento">A opiniones</a></li>' +
						        '<li><a href="seguimiento_patronatos.html#titulo_seguimiento">A patronatos</a></li>' +
					        '</ul>' +
					    '</li>' +
					    '<li><a href="buscar.html">Buscar</a></li>' +
					    '<li><a href="archivar.html">Archivar</a></li>' +
					    '<li><a href="modulo_administrador.html">Opciones de Administrador</a></li>' +
			    	'</ul>' +
				'</div>';
}