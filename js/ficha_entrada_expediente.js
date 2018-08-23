var app = angular.module("formApp", []);

app.service('utilities', ()=> {
    this.trim = (str)=> {
        return str.replace(/^\s+|\s+$/g, "");
    };

    this.eliminateSpace = (str)=>{
    	return str.replace(/\s+/g, "");
    };

    this.validarFecha
});

app.controller("formCtrl", function($scope, $http) {
	$scope.acumulados = "No";
	$scope.tipo_fecha = "actual";
	$scope.numAcumulados = 1;
	$scope.interesado = "";
	$scope.num_expediente_NA = "";

	//$scope.populateDependencia();
	$scope.agregarExpediente = ()=> {
		console.log($scope.numAcumulados);
		var acumuladosBox = document.getElementById('si_acumulados_box');
		var numeroExpedientes = parseInt($scope.numAcumulados, 10);
		var idExpediente = 'expediente' + ++numeroExpedientes;
		var divFila = document.createElement('div');
		var divNumExpedienteCol = document.createElement('div');
		var divFoliosCol = document.createElement('idiv');
		var numExpedienteLabel = document.createElement('label');
		var foliosLabel = document.createElement('label');
		var numExpedienteInput = document.createElement('input');
		var foliosInput = document.createElement('input');
		divFila.setAttribute('class','grid-x grid-padding-x');
		divFila.setAttribute('id', idExpediente);
		divNumExpedienteCol.setAttribute('class', 'medium-4 small-12 cell');
		divFoliosCol.setAttribute('class', 'medium-4 small-12 cell');
		numExpedienteLabel.innerHTML = "Número de Expediente:";
		foliosLabel.innerHTML = "Folios:";
		numExpedienteInput.setAttribute('type', 'text');
		numExpedienteInput.setAttribute('id', 'num_' + idExpediente);
		numExpedienteInput.setAttribute('name', 'num_' + idExpediente);
		numExpedienteInput.setAttribute('ng-model', 'num_' + idExpediente);
		foliosInput.setAttribute('type', 'number');
		foliosInput.setAttribute('id', 'num_folios_' + idExpediente);
		foliosInput.setAttribute('name', 'num_folios_' + idExpediente);
		foliosInput.setAttribute('ng-model', 'num_folios_' + idExpediente);
		foliosInput.setAttribute('value', '0');
		foliosInput.setAttribute('min', '0');
		divNumExpedienteCol.appendChild(numExpedienteLabel);
		divNumExpedienteCol.appendChild(numExpedienteInput);
		divFoliosCol.appendChild(foliosLabel);
		divFoliosCol.appendChild(foliosInput);
		divFila.appendChild(divNumExpedienteCol);
		divFila.appendChild(divFoliosCol);
		acumuladosBox.appendChild(divFila);
		$scope.numAcumulados = numeroExpedientes;
	};

	$scope.eliminarUltimoExpediente = ()=> {
		var numeroExpedientes = parseInt($scope.numAcumulados, 10);
		if(numeroExpedientes > 1){
			var idExpedienteAEliminar = "expediente" + numeroExpedientes;
			var acumuladosBox = document.getElementById('si_acumulados_box');
			acumuladosBox.removeChild(document.getElementById(idExpedienteAEliminar));
			$scope.numAcumulados = --numeroExpedientes;
		}
	};

	//$scope.populateDependencia = ()=> {
		$http({
        	method : "POST",
        	url : "http://localhost:3000/populate/select/dependencia"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
    		console.log(lista);
    		var d = new Date();
    		var n = d.toISOString();
    		console.log(n);
        	$scope.dependenciaList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	//};

	$http({
        	method : "POST",
        	url : "http://localhost:3000/populate/select/empleadoReceptor"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
    		console.log(lista);
        	$scope.empleadoReceptorList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $http({
        	method : "POST",
        	url : "http://localhost:3000/populate/select/asunto"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
    		console.log(lista);
        	$scope.asuntoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $scope.validarFormulario = ()=> {
    	if($scope.interesado.length < 46 && $scope.interesado.trim().length > 0){
    		if($scope.procedencia_select != null){
    			if($scope.empleado_receptor_select != null){
    				if($scope.acumulados == "No"){
    					if($scope.num_expediente_NA.length < 21 && $scope.num_expediente_NA.trim().length > 0){
    						if(!isNaN($scope.num_folios_NA) && $scope.num_folios_NA > 0){
    							if($scope.asunto_NA_select != null){
    								if($scope.tipo_fecha == "actual"){
    									var d = new Date();
    									var n = d.toLocaleString();
    									window.alert("Todo bien con fecha actual " + n);

    								}else if($scope.tipo_fecha == "personalizada"){
    									window.alert("Todo bien con fecha personalizada " + $scope.fecha_entrada);
    								}
    							}else{
    								window.alert("Por favor seleccione el asunto del expediente");
    							}
    						}else{
    							window.alert("Por favor seleccione un numero de folios de expediente valido y mayor a cero");
    						}
    					}else {
    						window.alert("El campo Número de expediente es muy largo o está vacío, por favor ingrese un valor valido y sin espacios");
    					}
    				}else if($scope.acumulados == "Si"){
    					if($scope.num_expediente_NA){

    					}
    				}else{
    					window.alert("Por favor seleccione si están ingresando expedientes acumulados");
    				}
    			}else{
    				window.alert("Por favor seleccione el empleado que recibe los expedientes");
    			}
    		}else{
    			window.alert("Por favor seleccione una dependencia de procedencia");
    		}
    	}else {
    		window.alert("El campo Interesado es muy largo o está vacío, por favor ingrese un valor valido");
    	}
    };


});