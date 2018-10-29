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

	$scope.mostrarExpedientesRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/recibidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesAsignados1 = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/asignados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/descargados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/revisados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/remitidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesAsignados2 = ()=> {
		$scope.accion = "conPrevio";
        $scope.textoBoton = "Remitir Con Previo";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/asignados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesConPrevio = ()=> {
		$scope.accion = "reingresar";
        $scope.textoBoton = "Reingresar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/conprevio"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpediente = ()=> {
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/expedienteParticular",
            data : {numExpediente : numExpValidado}
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
                    case 6:
                        $scope.accion = "reingresar";
                        $scope.textoBoton = "Reingresar";
                        break;
                    default:
                        window.alert("Error del sistema en el registro del expediente");
                }
            }
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

    $scope.darSeguimientoExpediente = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "formularios/expedientes/ficha_de_asignacion_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "formularios/expedientes/ficha_de_descargo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "formularios/expedientes/ficha_de_revision_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "formularios/expedientes/ficha_de_remision_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "conPrevio":
                var newUrl = "formularios/expedientes/ficha_de_remision_con_previo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "reingresar":
                var newUrl = "formularios/expedientes/ficha_de_reingreso_con_previo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            
        }
    };

});

