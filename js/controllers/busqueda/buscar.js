app.controller("searchCtrl", function($scope, $http, $window, utilities, urlUtility) {
	$scope.tipo_fecha1 = "fecha_especifica";
	$scope.tipo_fecha2 = "fecha_especifica";
	$scope.buscar_input = "";
	$scope.serverUrl = urlUtility.getServerUrl();
	$scope.procedencia_select = "";
	$scope.empleado_receptor_select = "";
	$scope.asunto_select = "";
	$scope.abogado_asignado_select = "";
	$scope.estado_expediente_select = "";
	$scope.tipo_busqueda_select = "exp";

	
	$http({
    	method : "POST",
    	url : $scope.serverUrl + "/populate/select/dependencia"
    }).then(function mySuccess(response) {
		var lista = JSON.parse(response.data);
        $scope.dependenciaList = lista;
    }, function myError(response) {
    	console.log(response.statusText);
    });


	$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/empleadoReceptor"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.empleadoReceptorList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/asunto"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.asuntoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/abogadoAsignado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.abogadoAsignadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/estadoExpediente"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.estadoExpedienteList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


	$scope.copyProcedenciaValue = ()=>{
		if($scope.parametro_busqueda=="procedencia"){
			$scope.buscar_input = $scope.procedencia_select.nombreDependencia;
		}
	};
	$scope.copyEmpleadoReceptorValue = ()=>{
		if($scope.parametro_busqueda=="empleadoReceptor"){
			$scope.buscar_input = $scope.empleado_receptor_select.nombreEmpleado;
		}

	};
	$scope.copyAsuntoValue = ()=>{
		if($scope.parametro_busqueda=="asunto"){
			$scope.buscar_input = $scope.asunto_select.nombreAsunto;
		}

	};
	$scope.copyAbogadoAsignadoValue = ()=>{
		if($scope.parametro_busqueda=="abogadoAsignado"){
			$scope.buscar_input = $scope.abogado_asignado_select.nombreAbogado;
		}
	};
	$scope.copyDependicaRemisionValue = ()=>{
		if($scope.parametro_busqueda=="dependenciaRemision"){
			$scope.buscar_input = $scope.dependencia_remision_select.nombreDependencia;
		}
	};
	$scope.copyEstadoExpedienteValue = ()=>{
		if($scope.parametro_busqueda=="estadoExpediente"){
			$scope.buscar_input = $scope.estado_expediente_select.nombreEstado;
		}
	};
});