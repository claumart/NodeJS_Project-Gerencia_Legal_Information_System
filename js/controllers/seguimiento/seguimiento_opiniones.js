app.service("utilities", function() {
	this.formatearFecha = (lista)=> {
		for(x in lista){
			var d = new Date(lista[x].fechaEntrada);
    		var n = d.toLocaleString();
    		lista[x].fechaEntrada = n;
		}
		return lista;
	};

    this.eliminateSpace = (str)=> {
        return str.replace(/\s+/g, "");
    };
});

app.controller("seguimientoCtrl", function($scope, $http, $window, utilities, urlUtility) {
	$scope.accion = "";
    $scope.textoBoton = "";
    $scope.serverUrl = urlUtility.getServerUrl();

	$scope.mostrarOpinionesRecibidas = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/recibidas"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarOpinionesAsignadas = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/asignadas"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarOpinionesDescargadas = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/descargadas"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarOpinionesRevisadas = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/revisadas"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarOpinionesRemitidas = ()=> {
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/remitidas"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarOpinion = ()=> {
        var numOficioValidado = utilities.eliminateSpace($scope.num_oficio.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/opiniones/mostrar/oficioParticular",
            data : {numOficio : numOficioValidado}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
            if(lista.length > 0){
                switch (lista[0].idEstado) {
                    case 1:
                        $scope.accion = "asignar";
                        $scope.textoBoton = "Asignar";
                        break;
                    case 2:
                        $scope.accion = "descargar";
                        $scope.textoBoton = "Descargar";
                        break;
                    case 3:
                        $scope.accion = "revisar";
                        $scope.textoBoton = "Revisar";
                        break;
                    case 4:
                        $scope.accion = "remitir";
                        $scope.textoBoton = "Remitir";
                    case 5:
                        $scope.accion = "compleatdo";
                        $scope.textoBoton = "Completado";
                        break;
                    default:
                        window.alert("Error del sistema en el registro de la opinion");
                }
            }
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

    $scope.darSeguimientoOpinion = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "../formularios/opiniones/ficha_de_asignacion_opiniones.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "../formularios/opiniones/ficha_de_descargo_opiniones.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "../formularios/opiniones/ficha_de_revision_opiniones.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "../formularios/opiniones/ficha_de_remision_opiniones.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;  
        }
    };

});

