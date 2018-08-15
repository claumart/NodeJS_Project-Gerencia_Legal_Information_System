var app = angular.module("searchApp", []);
app.controller("searchCtrl", function($scope) {
	$scope.tipo_fecha1 = "fecha_especifica";
	$scope.tipo_fecha2 = "fecha_especifica";
	//$scope.procedencia_select ="none"
	$scope.procendenciaList = [
        {"idProcedencia" : "1", "nombreDependencia" : "Catastro"},
        {"idProcedencia" : "2", "nombreDependencia" : "Tierras"},
        {"idProcedencia" : "3", "nombreDependencia" : "Finanzas"},
        {"idProcedencia" : "4", "nombreDependencia" : "Trans450"}];
    $scope.empleadoReceptorList = [
        {"numEmpleado" : "1", "nombreEmpleado" : "Mirian"},
        {"numEmpleado" : "2", "nombreEmpleado" : "Marielos"},
        {"numEmpleado" : "3", "nombreEmpleado" : "Elsa"},
        {"numEmpleado" : "4", "nombreEmpleado" : "Karen Bonilla"}];
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
	$scope.copyAbogadoAsignadoValue = ()=>{
		
	}
	$scope.copyDependicaRemisionValue = ()=>{
		
	}
	$scope.copyEstadoExpedienteValue = ()=>{
		
	}
});