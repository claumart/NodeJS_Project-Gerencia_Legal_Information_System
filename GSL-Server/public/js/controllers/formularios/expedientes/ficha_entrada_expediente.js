/***********************Hecho por Shirley Claudette Martínez***********************/
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

app.controller("formCtrl", function($scope, $http, $window, utilities, limpieza) {
	$scope.acumulados = "No";
	$scope.tipo_fecha = "actual";
	$scope.numAcumulados = 1;
	$scope.interesado = "";
	$scope.num_expediente_NA = "";
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.apoderado = "";
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

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
    	url : "/populate/select/dependencia",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
		var lista = JSON.parse(response.data);
        $scope.dependenciaList = lista;
    }, function myError(response) {
    	console.log(response.statusText);
    });


	$http({
        method : "POST",
        url : "/populate/select/empleadoReceptor",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
    	var lista = JSON.parse(response.data);
        $scope.empleadoReceptorList = lista;
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : "/populate/select/asunto",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
    	var lista = JSON.parse(response.data);
        $scope.asuntoList = lista;
    }, function myError(response) {
        console.log(response.statusText);
    });

    /*****************************************Verificar y completar formulario de modificacion*****************************************/
    /**********************************************************************************************************************************/
    ComprobarModoModificacion = ()=> {
        if($scope.urlParams.mod == 1) {
            LlenarCampos();
            MostrarExpedientes();
        }
    };

    LlenarCampos = ()=>{
       $http({
            method : "POST",
            url : "/modificacion/expedientes/obtener/formularioEntrada",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            $scope.interesado = lista[0].interesado;
            if(lista[0].apoderadoLegal != null) $scope.apoderado = lista[0].apoderadoLegal;
            for(let i = 0; i<$scope.dependenciaList.length; i++){
                if(lista[0].idProcedencia == $scope.dependenciaList[i].idDependencia){
                    $scope.procedencia_select = $scope.dependenciaList[i];
                    break;
                }
            }

            for(let i = 0; i<$scope.empleadoReceptorList.length; i++){
                if(lista[0].idEmpleadoReceptor == $scope.empleadoReceptorList[i].numEmpleado){
                    $scope.empleado_receptor_select = $scope.empleadoReceptorList[i];
                    break;
                }
            }

            for(let i = 0; i<$scope.asuntoList.length; i++){
                if(lista[0].idAsunto == $scope.asuntoList[i].idAsunto){
                    $scope.asunto_NA_select = $scope.asuntoList[i];
                    $scope.asunto_A_select = $scope.asuntoList[i];
                    break;
                }
            }

            var parametrosFecha = utilities.desformatearFecha(lista[0].fechaEntrada);
            $scope.tipo_fecha = "personalizada";
            $scope.fecha_entrada = parametrosFecha['fecha'];
            $scope.hora_entrada = parametrosFecha['hora'];
            $scope.minuto_entrada = parametrosFecha['minutos'];
            $scope.ampm = parametrosFecha['tipoHora'];
            
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        }); 
    };

    MostrarExpedientes = ()=> {
        $http({
            method : "POST",
            url : "/modificacion/expedientes/obtener/expedientes",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            $scope.antiguosExp = JSON.parse(response.data);
            if($scope.antiguosExp.length >1){
                $scope.acumulados = "Si";
                for(expediente in $scope.antiguosExp){
                    if($scope.num_expediente1 == "" || $scope.num_expediente1 == null){
                        $scope.num_expediente1 = $scope.antiguosExp[expediente].numExpediente;
                        $scope.num_folios_expediente1 = $scope.antiguosExp[expediente].folios;
                    }else{
                        $scope.agregarExpediente();
                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                        var inputExpId = "num_expediente" + numeroExpedientes;
                        document.getElementById(inputExpId).value = $scope.antiguosExp[expediente].numExpediente;
                        var inputFolioId = "num_folios_expediente" + numeroExpedientes;
                        document.getElementById(inputFolioId).value = $scope.antiguosExp[expediente].folios;
                    }
                }
            }else{
                $scope.num_expediente_NA = $scope.antiguosExp[0].numExpediente;
                $scope.num_folios_NA = $scope.antiguosExp[0].folios;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
    	if($scope.interesado.length < 46 && $scope.interesado.trim().length > 0){
            var interesadoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.interesado).trim());
    		if($scope.apoderado.length < 46){
                var apoderadoLegal = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.apoderado).trim());
                if($scope.procedencia_select != null){
                    if($scope.empleado_receptor_select != null){
                        if($scope.acumulados == "No"){
                            if($scope.num_expediente_NA.length < 21 && $scope.num_expediente_NA.trim().length > 0){
                                var numExpValidado = utilities.eliminateSpace($scope.num_expediente_NA.toUpperCase().trim());
                                if(!isNaN($scope.num_folios_NA) && $scope.num_folios_NA > 0){
                                    if($scope.asunto_NA_select != null){
                                        if($scope.tipo_fecha == "actual"){
                                            var date = new Date();
                                            var now = date.toLocaleString('es-GB');
                                            now = utilities.formatearFechaActual(now);
                                            if($scope.urlParams.mod == 1){
                                                $http({
                                                    method : "POST",
                                                    url : "/modificacion/expedientes/actualizar/fichaEntrada/noAcumulado",
                                                    headers: {'Content-Type': 'application/json'},
                                                    data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                        folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : now,
                                                        apoderado : apoderadoLegal, expedientesAntiguos: $scope.antiguosExp, idFicha : $scope.urlParams.idFicha
                                                    }
                                                }).then(function mySuccess(response) {
                                                    $window.location.href = "/modificacion#titulo_modificacion";
                                                }, function myError(response) {
                                                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                    document.getElementById('myModal').style.display = "flex";
                                                });

                                            }else{
                                                $http({
                                                    method : "POST",
                                                    url : "/formularios/expedientes/registrar/noAcumulado",
                                                    headers: {'Content-Type': 'application/json'},
                                                    data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                        folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : now,
                                                        apoderado : apoderadoLegal
                                                    }
                                                }).then(function mySuccess(response) {
                                                    limpieza.limpiarRegistrarExpForm($scope);
                                                }, function myError(response) {
                                                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                    document.getElementById('myModal').style.display = "flex";
                                                });
                                            }

                                        }else if($scope.tipo_fecha == "personalizada"){
                                            if($scope.fecha_entrada != null) {
                                                if(!isNaN($scope.hora_entrada) && $scope.hora_entrada >= 1 && $scope.hora_entrada <= 12){
                                                    if(!isNaN($scope.minuto_entrada) && $scope.minuto_entrada >= 0 && $scope.minuto_entrada <= 59){
                                                        var fechaPersonalizada = utilities.formatearFechaPersonalizada($scope.fecha_entrada, $scope.hora_entrada, $scope.minuto_entrada, $scope.ampm);
                                                        if($scope.urlParams.mod == 1){
                                                            $http({
                                                                method : "POST",
                                                                url : "/modificacion/expedientes/actualizar/fichaEntrada/noAcumulado",
                                                                headers: {'Content-Type': 'application/json'},
                                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                                    folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : fechaPersonalizada,
                                                                    apoderado : apoderadoLegal, expedientesAntiguos: $scope.antiguosExp, idFicha : $scope.urlParams.idFicha
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                $window.location.href = "/modificacion#titulo_modificacion";
                                                            }, function myError(response) {
                                                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                document.getElementById('myModal').style.display = "flex";
                                                            });  
                                                        }else{
                                                            $http({
                                                                method : "POST",
                                                                url : "/formularios/expedientes/registrar/noAcumulado",
                                                                headers: {'Content-Type': 'application/json'},
                                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, numExpediente : numExpValidado,
                                                                    folios : $scope.num_folios_NA, idAsunto : $scope.asunto_NA_select.idAsunto, fecha : fechaPersonalizada,
                                                                    apoderado : apoderadoLegal
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                limpieza.limpiarRegistrarExpForm($scope);
                                                            }, function myError(response) {
                                                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                document.getElementById('myModal').style.display = "flex";
                                                            });  
                                                        }
                                                    }else {
                                                        $scope.modalMessage = "Por favor seleccione una cantidad de minutos valida entre 0 a 59";
                                                        document.getElementById('myModal').style.display = "flex";
                                                    }
                                                }else {
                                                    $scope.modalMessage = "Por favor seleccione una hora valida entre 1 a 12";
                                                    document.getElementById('myModal').style.display = "flex";
                                                }
                                            }else {
                                                $scope.modalMessage = "Por favor seleccione la fecha de entrada del expediente";
                                                document.getElementById('myModal').style.display = "flex";
                                            }
                                        }
                                    }else{
                                        $scope.modalMessage = "Por favor seleccione el asunto del expediente";
                                        document.getElementById('myModal').style.display = "flex";

                                    }
                                }else{
                                    $scope.modalMessage = "Por favor seleccione un numero de folios de expediente valido y mayor a cero";
                                    document.getElementById('myModal').style.display = "flex";
                                }
                            }else {
                                $scope.modalMessage = "El campo Número de expediente es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
                                document.getElementById('myModal').style.display = "flex";
                            }
                        }else if($scope.acumulados == "Si"){
                            if($scope.asunto_A_select != null){
                                var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                var expedientes = [];
                                for(i = 1; i <= numeroExpedientes; i++) {
                                    var inputExpId = "num_expediente" + i;
                                    var inputExp = document.getElementById(inputExpId);
                                    var inputFolioId = "num_folios_expediente" + i;
                                    var inputFolio = document.getElementById(inputFolioId);
                                    if(inputExp.value.length < 21 && inputExp.value.trim().length > 0) {
                                        if(!isNaN(inputFolio.value) && inputFolio.value > 0){
                                            var numExpValidado = utilities.eliminateSpace(inputExp.value.toUpperCase().trim());
                                            expedientes[i-1] = {numExpediente : numExpValidado, folios : inputFolio.value};
                                            if(i == numeroExpedientes){
                                                if($scope.tipo_fecha == "actual"){
                                                    now = utilities.formatearFechaActual(now);
                                                    if(j == numeroExpedientes){
                                                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                        var apoderadoLegal = $scope.apoderado.trim();
                                                        if($scope.urlParams.mod == 1){
                                                            $http({
                                                                method : "POST",
                                                                url : "/modificacion/expedientes/actualizar/fichaEntrada/acumulado",
                                                                headers: {'Content-Type': 'application/json'},
                                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, expedientes : expedientes,
                                                                    idAsunto : $scope.asunto_A_select.idAsunto, fecha : now, 
                                                                    cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal,
                                                                    expedientesAntiguos: $scope.antiguosExp, idFicha : $scope.urlParams.idFicha
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                $window.location.href = "/modificacion#titulo_modificacion";
                                                            }, function myError(response) {
                                                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                document.getElementById('myModal').style.display = "flex";
                                                            }); 
                                                        }else{
                                                            $http({
                                                                method : "POST",
                                                                url : "/formularios/expedientes/registrar/acumulado",
                                                                headers: {'Content-Type': 'application/json'},
                                                                data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, expedientes : expedientes,
                                                                    idAsunto : $scope.asunto_A_select.idAsunto, fecha : now, 
                                                                    cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                limpieza.limpiarRegistrarExpForm($scope);
                                                            }, function myError(response) {
                                                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                document.getElementById('myModal').style.display = "flex";
                                                            }); 
                                                        }
                                                    }    
                                                }else if($scope.tipo_fecha == "personalizada"){
                                                    if($scope.fecha_entrada != null) {
                                                        if(!isNaN($scope.hora_entrada) && $scope.hora_entrada >= 1 && $scope.hora_entrada <= 12){
                                                            if(!isNaN($scope.minuto_entrada) && $scope.minuto_entrada >= 0 && $scope.minuto_entrada <= 59){
                                                                var fechaPersonalizada = utilities.formatearFechaPersonalizada($scope.fecha_entrada, $scope.hora_entrada, $scope.minuto_entrada, $scope.ampm);
                                                                if($scope.urlParams.mod == 1){
                                                                    $http({
                                                                        method : "POST",
                                                                        url : "/modificacion/expedientes/actualizar/fichaEntrada/acumulado",
                                                                        headers: {'Content-Type': 'application/json'},
                                                                        data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, expedientes : expedientes,
                                                                            idAsunto : $scope.asunto_A_select.idAsunto, fecha : fechaPersonalizada, 
                                                                            cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal,
                                                                            expedientesAntiguos: $scope.antiguosExp, idFicha : $scope.urlParams.idFicha
                                                                        }
                                                                    }).then(function mySuccess(response) {
                                                                        $window.location.href = "/modificacion#titulo_modificacion";
                                                                    }, function myError(response) {
                                                                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                        document.getElementById('myModal').style.display = "flex";
                                                                    }); 
                                                                }else{
                                                                    $http({
                                                                        method : "POST",
                                                                        url : "/formularios/expedientes/registrar/acumulado",
                                                                        headers: {'Content-Type': 'application/json'},
                                                                        data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, expedientes : expedientes,
                                                                            idAsunto : $scope.asunto_A_select.idAsunto, fecha : fechaPersonalizada, 
                                                                            cantidadExpedientes : numeroExpedientes, apoderado : apoderadoLegal
                                                                        }
                                                                    }).then(function mySuccess(response) {
                                                                        limpieza.limpiarRegistrarExpForm($scope);
                                                                    }, function myError(response) {
                                                                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                        document.getElementById('myModal').style.display = "flex";
                                                                    }); 
                                                                }        
                                                            }else {
                                                                $scope.modalMessage = "Por favor seleccione una cantidad de minutos valida entre 0 a 59";
                                                                document.getElementById('myModal').style.display = "flex";
                                                            }
                                                        }else {
                                                            $scope.modalMessage = "Por favor seleccione una hora valida entre 1 a 12";
                                                            document.getElementById('myModal').style.display = "flex";
                                                        }
                                                    }else {
                                                        $scope.modalMessage = "Por favor seleccione la fecha de entrada del expediente";
                                                        document.getElementById('myModal').style.display = "flex";
                                                    }
                                                }
                                            }
                                        }else{
                                            $scope.modalMessage = "Por favor seleccione un numero de folios de expediente valido y mayor a cero";
                                            document.getElementById('myModal').style.display = "flex";
                                            break;
                                        }

                                    }else{
                                        $scope.modalMessage = "El campo Número de expediente es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
                                        document.getElementById('myModal').style.display = "flex";
                                        break;
                                    }
                                }
                            }else{
                                $scope.modalMessage = "Por favor seleccione el asunto de los expedientes";
                                document.getElementById('myModal').style.display = "flex";
                            }
                        }else{
                            $scope.modalMessage = "Por favor seleccione si están ingresando expedientes acumulados";
                            document.getElementById('myModal').style.display = "flex";
                        }
                    }else{
                        $scope.modalMessage = "Por favor seleccione el empleado que recibe los expedientes";
                         document.getElementById('myModal').style.display = "flex";
                    }
                }else{
                    $scope.modalMessage = "Por favor seleccione una dependencia de procedencia";
                    document.getElementById('myModal').style.display = "flex";
                }
            }else{
                $scope.modalMessage = "El campo apoderado legal es muy largo";
                document.getElementById('myModal').style.display = "flex";
            }
    	}else {
            $scope.modalMessage = "El campo Interesado es muy largo o está vacío, por favor ingrese un valor valido";
            document.getElementById('myModal').style.display = "flex";
    	}
    };

});