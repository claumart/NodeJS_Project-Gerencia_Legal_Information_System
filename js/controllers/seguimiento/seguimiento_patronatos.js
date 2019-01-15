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

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

	$scope.mostrarPatronatosRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/recibidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronatosAsignados = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/asignados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronatosDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/descargados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronatosRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/revisados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronatosRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/remitidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronato = ()=> {
        var numPatronatoValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/patronatos/mostrar/patronatoParticular",
            data : {numExpediente : numPatronatoValidado}
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
                        $scope.modalMessage = "Error del sistema en el registro del patronato";
                        document.getElementById('myModal').style.display = "flex";
                }
            }
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.darSeguimientoPatronato = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "../formularios/patronatos/ficha_de_asignacion_patronatos.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "../formularios/patronatos/ficha_de_descargo_patronatos.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "../formularios/patronatos/ficha_de_revision_patronatos.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "../formularios/patronatos/ficha_de_remision_patronatos.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;    
        }
    };

});

