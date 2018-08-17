var app = angular.module("searchApp", []);
app.controller("searchCtrl", function($scope) {
	$scope.tipo_fecha1 = "fecha_especifica";
	$scope.tipo_fecha2 = "fecha_especifica";
	//$scope.procedencia_select ="none"
	$scope.dependenciaList = [
        {"idProcedencia" : "1", "nombreDependencia" : "Catastro"},
        {"idProcedencia" : "2", "nombreDependencia" : "Tierras"},
        {"idProcedencia" : "3", "nombreDependencia" : "Finanzas"},
        {"idProcedencia" : "4", "nombreDependencia" : "Trans450"}];
    $scope.empleadoReceptorList = [
        {"numEmpleado" : "1", "nombreEmpleado" : "Mirian"},
        {"numEmpleado" : "2", "nombreEmpleado" : "Marielos"},
        {"numEmpleado" : "3", "nombreEmpleado" : "Elsa"},
        {"numEmpleado" : "4", "nombreEmpleado" : "Karen Bonilla"}];
    $scope.asuntoList = [
        {"idAsunto" : "1", "nombreAsunto" : "Prescripción"},
        {"idAsunto" : "2", "nombreAsunto" : "Exoneración"},
        {"idAsunto" : "3", "nombreAsunto" : "Notas de Credito"},
        {"idasunto" : "4", "nombreAsunto" : "Apelación"}];
    $scope.abogadoAsignadoList = [
        {"numEmpleado" : "5", "nombreAbogado" : "Carolina Arambu"},
        {"numEmpleado" : "6", "nombreAbogado" : "Granados"},
        {"numEmpleado" : "7", "nombreAbogado" : "Jorge Godoy"},
        {"numEmpleado" : "8", "nombreAbogado" : "Lesama"}];
    $scope.estadoExpedienteList = [
        {"idEstadoExpediente" : "1", "nombreEstado" : "Recibido"},
        {"idEstadoExpediente" : "2", "nombreEstado" : "asignado"},
        {"idEstadoExpediente" : "3", "nombreEstado" : "Previo"},
        {"idEstadoExpediente" : "4", "nombreEstado" : "Descargado"},
        {"idEstadoExpediente" : "5", "nombreEstado" : "Remitido"}];
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