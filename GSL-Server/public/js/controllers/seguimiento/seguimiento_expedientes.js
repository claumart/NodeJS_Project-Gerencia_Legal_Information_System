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

app.controller("seguimientoCtrl", function($scope, $http, $window, utilities) {
	$scope.privilegios = [];
    $scope.accion = "";
    $scope.textoBoton = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
        method : "POST",
        url : "/usuario/obtenerPrivilegios",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        $scope.privilegios = JSON.parse(response.data);
    }, function myError(response) {
        console.log(response.statusText);
    });

	$scope.mostrarExpedientesRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";

		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/recibidos",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesAsignados1 = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";

		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/asignados",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";

		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/descargados",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/revisados",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/remitidos",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesAsignados2 = ()=> {
		$scope.accion = "conPrevio";
        $scope.textoBoton = "Remitir Con Previo";

		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/asignados",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpedientesConPrevio = ()=> {
		$scope.accion = "reingresar";
        $scope.textoBoton = "Reingresar";

		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/conprevio",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpediente = ()=> {
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/expedienteParticular",
            headers: {'Content-Type': 'application/json'},
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
                        break;
                    case 5:
                        $scope.accion = "compleatdo";
                        $scope.textoBoton = "Completado";
                        break;
                    case 6:
                        $scope.accion = "reingresar";
                        $scope.textoBoton = "Reingresar";
                        break;
                    default:
                        $scope.modalMessage = "Error del sistema en el registro del expediente";
                        document.getElementById('myModal').style.display = "flex";
                }
            }
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.darSeguimientoExpediente = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "/expedientes/asignar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "/expedientes/descargar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "/expedientes/revisar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "/expedientes/remitir_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "conPrevio":
                var newUrl = "/expedientes/remitir_con_previo#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "reingresar":
                var newUrl = "/expedientes/reingresar_con_previo#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            
        }
    };

});

