app.service('limpieza', function() {
    this.limpiarRegistrarExpForm = (scope)=>{
        scope.acumulados = "No";
        scope.tipo_fecha = "actual";
        scope.interesado = "";
        scope.procedencia_select = null;
        scope.empleado_receptor_select = null;
        scope.num_expediente_NA = "";
        scope.fecha_entrada = null;
        scope.hora_entrada = 1;
        scope.minuto_entrada = 0;
        scope.ampm = "am";
        scope.apoderado = "";
        scope.num_expediente_NA = "";
        scope.num_folios_NA = 0;
        scope.asunto_NA_select = null;
        scope.asunto_A_select = null;
        var acumuladosBox = document.getElementById('si_acumulados_box');
        for(i = 2; i <=scope.numAcumulados; i++){
            var idExpedienteAEliminar = "expediente" + i;
            acumuladosBox.removeChild(document.getElementById(idExpedienteAEliminar));
        }
        scope.numAcumulados = 1;
        scope.num_expediente1 = "";
        scope.num_folios_expediente1 = 0;


    }
});

app.controller("formCtrl", function($scope, $http, utilities, limpieza, urlUtility) {
	$scope.acumulados = "No";
	$scope.tipo_fecha = "actual";
	$scope.numAcumulados = 1;
	$scope.interesado = "";
	$scope.num_expediente_NA = "";
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.apoderado = "";
    $scope.serverUrl = urlUtility.getServerUrl();

	$scope.agregarExpediente = ()=> {
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

    $scope.validarFormulario = ()=> {
    	if($scope.interesado.length < 46 && $scope.interesado.trim().length > 0){
            var interesadoValidado = $scope.interesado.trim();
    		if($scope.procedencia_select != null){
    			if($scope.empleado_receptor_select != null){
    				if($scope.acumulados == "No"){
    					if($scope.num_expediente_NA.length < 21 && $scope.num_expediente_NA.trim().length > 0){
                            var numExpValidado = utilities.eliminateSpace($scope.num_expediente_NA.toUpperCase().trim());
    						if(!isNaN($scope.num_folios_NA) && $scope.num_folios_NA > 0){
    							if($scope.asunto_NA_select != null){
    								if($scope.tipo_fecha == "actual"){
                                        var now = date.toLocaleString('es-GB');
                                        var now = date.toLocaleString('es-GB');
                                        now = utilities.formatearFechaActual(now);
                                        var apoderadoLegal = $scope.apoderado.trim();
                                            $http({
                                                method : "POST",
                                                url : $scope.serverUrl + "/formularios/expedientes/registrar/noAcumulado",
                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                    folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : now,
                                                    apoderado : apoderadoLegal
                                                }
                                            }).then(function mySuccess(response) {
                                                limpieza.limpiarRegistrarExpForm($scope);
                                            }, function myError(response) {
                                                console.log(response.statusText);
                                            });

    								}else if($scope.tipo_fecha == "personalizada"){
    									if($scope.fecha_entrada != null) {
    										if(!isNaN($scope.hora_entrada) && $scope.hora_entrada >= 1 && $scope.hora_entrada <= 12){
    											if(!isNaN($scope.minuto_entrada) && $scope.minuto_entrada >= 0 && $scope.minuto_entrada <= 59){
    												var fechaPersonalizada = utilities.formatearFechaPersonalizada($scope.fecha_entrada, $scope.hora_entrada, $scope.minuto_entrada, $scope.ampm);
    												var apoderadoLegal = $scope.apoderado.trim();
                                                        $http({
                                                            method : "POST",
                                                            url : $scope.serverUrl + "/formularios/expedientes/registrar/noAcumulado",
                                                            data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                                folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : fechaPersonalizada,
                                                                apoderado : apoderadoLegal
                                                            }
                                                        }).then(function mySuccess(response) {
                                                            limpieza.limpiarRegistrarExpForm($scope);
                                                        }, function myError(response) {
                                                            console.log(response.statusText);
                                                        });
    											}else {
    											window.alert("Por favor seleccione un rango de minutos valido entre 0 a 59");
    											}
    										}else {
    											window.alert("Por favor seleccione una hora valida entre 1 a 12");
    										}
    									}else {
    										window.alert("Por favor seleccione la fecha de entrada del expediente");
    									}
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
    					if($scope.asunto_A_select != null){
    						var numeroExpedientes = parseInt($scope.numAcumulados, 10);
    					    for(i = 1; i <= numeroExpedientes; i++) {
        						var inputExpId = "num_expediente" + i;
        						var inputExp = document.getElementById(inputExpId);
        						var inputFolioId = "num_folios_expediente" + i;
        						var inputFolio = document.getElementById(inputFolioId);
        						if(inputExp.value.length < 21 && inputExp.value.trim().length > 0) {
        							if(!isNaN(inputFolio.value) && inputFolio.value > 0){
        								if(i == numeroExpedientes){
        									if($scope.tipo_fecha == "actual"){
        									    var date = new Date();
                                                var now = date.toLocaleString('es-GB');
                                                now = utilities.formatearFechaActual(now);
                                                var numExpedientes = [];
                                                var numerosFolios = [];
                                                for(j = 1; j <= numeroExpedientes; j++) {
                                                    var inputExpId = "num_expediente" + j;
                                                    var inputExp = document.getElementById(inputExpId);
                                                    var inputFolioId = "num_folios_expediente" + j;
                                                    var inputFolio = document.getElementById(inputFolioId);
                                                    var numExpValidado = utilities.eliminateSpace(inputExp.value.toUpperCase().trim());
                                                    numExpedientes[j-1] = numExpValidado;
                                                    numerosFolios[j-1] = inputFolio.value;
                                                    if(j == numeroExpedientes){
                                                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                        var apoderadoLegal = $scope.apoderado.trim();
                                                            $http({
                                                                method : "POST",
                                                                url : $scope.serverUrl + "/formularios/expedientes/registrar/acumulado",
                                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpedientes : numExpedientes,
                                                                    folios : numerosFolios, idAsunto : $scope.asunto_A_select.idAsunto, fecha : now, 
                                                                    cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                limpieza.limpiarRegistrarExpForm($scope);
                                                                console.log(response.data);
                                                                }, function myError(response) {
                                                                 console.log(response.statusText);
                                                            });

                                                    }
                                                }
    	    								}else if($scope.tipo_fecha == "personalizada"){
    	    									if($scope.fecha_entrada != null) {
    	    										if(!isNaN($scope.hora_entrada) && $scope.hora_entrada >= 1 && $scope.hora_entrada <= 12){
    	    											if(!isNaN($scope.minuto_entrada) && $scope.minuto_entrada >= 0 && $scope.minuto_entrada <= 59){
    	    												var fechaPersonalizada = utilities.formatearFechaPersonalizada($scope.fecha_entrada, $scope.hora_entrada, $scope.minuto_entrada, $scope.ampm);
    	    												var numExpedientes = [];
			                                                var numerosFolios = [];
			                                                for(j = 1; j <= numeroExpedientes; j++) {
			                                                    var inputExpId = "num_expediente" + j;
			                                                    var inputExp = document.getElementById(inputExpId);
			                                                    var inputFolioId = "num_folios_expediente" + j;
			                                                    var inputFolio = document.getElementById(inputFolioId);
			                                                    var numExpValidado = utilities.eliminateSpace(inputExp.value.toUpperCase().trim());
                                                                numExpedientes[j-1] = numExpValidado;
			                                                    numerosFolios[j-1] = inputFolio.value;
			                                                    if(j == numeroExpedientes){
			                                                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                                    var apoderadoLegal = $scope.apoderado.trim();
                                                                        $http({
                                                                        method : "POST",
                                                                        url : $scope.serverUrl + "/formularios/expedientes/registrar/acumulado",
                                                                        data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpedientes : numExpedientes,
                                                                            folios : numerosFolios, idAsunto : $scope.asunto_A_select.idAsunto, fecha : fechaPersonalizada, 
                                                                            cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal
                                                                        }
                                                                    }).then(function mySuccess(response) {
                                                                        limpieza.limpiarRegistrarExpForm($scope);
                                                                        console.log(response.data);
                                                                        }, function myError(response) {
                                                                         console.log(response.statusText);
                                                                    });
			                                                    }
    	    												}

    	    											}else {
    	    											window.alert("Por favor seleccione una hora valida entre 1 a 12");
    	    											}
    	    										}else {
    	    											window.alert("Por favor seleccione una hora valida entre 1 a 12");
    	    										}
    	    									}else {
    	    										window.alert("Por favor seleccione la fecha de entrada del expediente");
    	    									}
    	    								}
        								}
        							}else{
        								window.alert("Por favor seleccione un numero de folios de expediente valido y mayor a cero");
        								break;
        							}

        						}else{
        							window.alert("El campo Número de expediente es muy largo o está vacío, por favor ingrese un valor valido y sin espacios");
        							break;
        						}
    					    }
    					}else{
    						window.alert("Por favor seleccione el asunto de los expedientes");
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