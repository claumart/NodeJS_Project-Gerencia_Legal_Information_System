app.service('limpieza', function() {
    this.limpiarRegistrarPatronatoForm = (scope)=>{
        scope.interesado = "";
        scope.apoderado = "";
        scope.procedencia_select = null;
        scope.empleado_receptor_select = null;
        scope.asunto_patronato_select = null;
        scope.municipio1_select = null;
        scope.tipo_comunidad1_select = null;
        scope.comunidad1 = "";
        scope.anio_proceso_ins = 2000;
        scope.folios_ins = 0;
        scope.municipio2_select = null;
        scope.tipo_comunidad2_select = null;
        scope.comunidad2 = "";
        scope.anio_proceso_imp = 2000;
        scope.folios_imp = 0;
        scope.num_expediente1 = "";
        scope.num_folios_expediente1 = 0;
        var impugnacionBox = document.getElementById('impugnacion_box');
        for(i = 2; i <=scope.numAcumulados; i++){
            var idExpedienteAEliminar = "expediente" + i;
            impugnacionBox.removeChild(document.getElementById(idExpedienteAEliminar));
        }
        scope.tipo_fecha = "actual";
        scope.numAcumulados = 1;
        scope.hora_entrada = 1;
        scope.minuto_entrada = 0;
        scope.ampm = "am";
    }
});

app.controller("formCtrl", function($scope, $http, utilities, limpieza, urlUtility) {
    $scope.interesado = "";
    $scope.apoderado = "";
    $scope.procedencia_select = null;
    $scope.empleado_receptor_select = null;
    $scope.asunto_patronato_select = null;
    $scope.municipio1_select = null;
    $scope.tipo_comunidad1_select = null;
    $scope.comunidad1 = "";
    $scope.anio_proceso_ins = 2000;
    $scope.folios_ins = 0;
    $scope.municipio2_select = null;
    $scope.tipo_comunidad2_select = null;
    $scope.comunidad2 = "";
    $scope.anio_proceso_imp = 2000;
    $scope.folios_imp = 0;
    $scope.num_expediente1 = "";
    $scope.num_folios_expediente1 = 0;
	$scope.tipo_fecha = "actual";
    $scope.numAcumulados = 1;
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.serverUrl = urlUtility.getServerUrl();

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
            url : $scope.serverUrl + "/populate/select/asuntoPatronato"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.asuntoPatronatoList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/municipio"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.municipioList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/tipoComunidad"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.tipoComunidadList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $scope.actualizarComunidadesList1 = ()=> {
        if($scope.municipio1_select != null) {
            if($scope.tipo_comunidad1_select != null) {
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/extraInfo/formularios/comunidades",
                    data : { matchComunidad : $scope.comunidad1, idMunicipio : $scope.municipio1_select.idMunicipio,
                        idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad
                    }
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.comunidadesList = lista;
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }else{
               $scope.comunidad1 = "";
               window.alert("Por favor seleccione un tipo de comunidad"); 
            }
        }else{
            $scope.comunidad1 = "";
               window.alert("Por favor seleccione un municipio");
        }
    };

    $scope.actualizarComunidadesList2 = ()=> {
        if($scope.municipio2_select != null) {
            if($scope.tipo_comunidad2_select != null) {
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/extraInfo/formularios/comunidades",
                    data : { matchComunidad : $scope.comunidad2, idMunicipio : $scope.municipio2_select.idMunicipio,
                        idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad
                    }
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.comunidadesList = lista;
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }else{
               $scope.comunidad2 = "";
               window.alert("Por favor seleccione un tipo de comunidad"); 
            }
        }else{
            $scope.comunidad2 = "";
               window.alert("Por favor seleccione un municipio");
        }
    };

    $scope.agregarExpediente = ()=> {
        var acumuladosBox = document.getElementById('impugnacion_box');
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
            var acumuladosBox = document.getElementById('impugnacion_box');
            acumuladosBox.removeChild(document.getElementById(idExpedienteAEliminar));
            $scope.numAcumulados = --numeroExpedientes;
        }
    };


    $scope.validarFormulario = ()=> {
        if($scope.interesado.length < 46 && $scope.interesado.trim().length > 0){
            var interesadoValidado = $scope.interesado.trim();
            if($scope.apoderado.length < 46){
                var apoderadoLegal = $scope.apoderado.trim();
                if($scope.procedencia_select != null){
                    if($scope.empleado_receptor_select != null){
                        if($scope.asunto_patronato_select != null && $scope.asunto_patronato_select.idAsuntoPatronato == 1){
                            if($scope.comunidad1.length < 46 && $scope.comunidad1.trim().length > 0){
                                var comunidadValidada = utilities.eliminateMultipleSpaces($scope.comunidad1).trim();
                                if(!isNaN($scope.anio_proceso_ins) && $scope.anio_proceso_ins > 0){
                                    if(!isNaN($scope.folios_ins) && $scope.folios_ins > 0){
                                        if($scope.tipo_fecha == "actual"){
                                            var date = new Date();
                                            var now = date.toLocaleString('es-GB');
                                            now = utilities.formatearFechaActual(now);
                                                $http({
                                                    method : "POST",
                                                    url : $scope.serverUrl + "/formularios/patronatos/registrar/noAcumulado",
                                                    data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                        idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                        idMunicipio : $scope.municipio1_select.idMunicipio,
                                                        codigoMunicipio : $scope.municipio1_select.codigoMunicipio,
                                                        idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                        comunidad : comunidadValidada, foliosIns : $scope.folios_ins, anioProceso : $scope.anio_proceso_ins,
                                                        idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now    
                                                    }
                                                }).then(function mySuccess(response) {
                                                    limpieza.limpiarRegistrarPatronatoForm($scope);
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
                                                                url : $scope.serverUrl + "/formularios/patronatos/registrar/noAcumulado",
                                                                data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                    idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                    idMunicipio : $scope.municipio1_select.idMunicipio,
                                                                    codigoMunicipio : $scope.municipio1_select.codigoMunicipio, 
                                                                    idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                                    comunidad : comunidadValidada, foliosIns : $scope.folios_ins, anioProceso : $scope.anio_proceso_ins,
                                                                    idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                limpieza.limpiarRegistrarPatronatoForm($scope);
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
                                        window.alert("Por favor seleccione un numero de folios de expediente valido y mayor a cero");
                                    }
                                }else{
                                    window.alert("Por favor seleccione un año valido y mayor a cero");
                                }
                            }else {
                                window.alert("El campo nombre de la comunidad es muy largo o está vacio");
                            }
                        }else if($scope.asunto_patronato_select != null && $scope.asunto_patronato_select.idAsuntoPatronato == 2){
                            if($scope.comunidad2.length < 46 && $scope.comunidad2.trim().length > 0){
                                var comunidadValidada = utilities.eliminateMultipleSpaces($scope.comunidad2).trim();
                                if(!isNaN($scope.anio_proceso_imp) && $scope.anio_proceso_imp > 0){
                                    if(!isNaN($scope.folios_imp) && $scope.folios_imp > 0){
                                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                        var numExpedientes = [];
                                        var numerosFolios = [];
                                        for(i = 1; i <= numeroExpedientes; i++) {
                                            var inputExpId = "num_expediente" + i;
                                            var inputExp = document.getElementById(inputExpId);
                                            var inputFolioId = "num_folios_expediente" + i;
                                            var inputFolio = document.getElementById(inputFolioId);
                                            if(inputExp.value.length < 26 && inputExp.value.trim().length > 0) {
                                                var numExpValidado = utilities.eliminateSpace(inputExp.value.toUpperCase().trim());
                                                numExpedientes[i-1] = numExpValidado;
                                                if(!isNaN(inputFolio.value) && inputFolio.value > 0){
                                                    numerosFolios[i-1] = inputFolio.value;
                                                    if(i == numeroExpedientes){
                                                        if($scope.tipo_fecha == "actual"){
                                                            var date = new Date();
                                                            var now = date.toLocaleString('es-GB');
                                                            now = utilities.formatearFechaActual(now);
                                                            $http({
                                                                method : "POST",
                                                                url : $scope.serverUrl + "/formularios/patronatos/registrar/acumulado",
                                                                data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                    idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                    numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                    idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                    codigoMunicipio : $scope.municipio2_select.codigoMunicipio,
                                                                    idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                    comunidad : comunidadValidada, foliosIns : $scope.folios_imp, anioProceso : $scope.anio_proceso_imp,
                                                                    idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now,
                                                                    numExpedientes : numExpedientes, folios : numerosFolios, cantidadExpedientes : numeroExpedientes
                                                                }
                                                            }).then(function mySuccess(response) {
                                                                limpieza.limpiarRegistrarPatronatoForm($scope);
                                                                console.log(response.data);
                                                            }, function myError(response) {
                                                                console.log(response.statusText);
                                                            });

                                                        }else if($scope.tipo_fecha == "personalizada"){
                                                            if($scope.fecha_entrada != null) {
                                                                if(!isNaN($scope.hora_entrada) && $scope.hora_entrada >= 1 && $scope.hora_entrada <= 12){
                                                                    if(!isNaN($scope.minuto_entrada) && $scope.minuto_entrada >= 0 && $scope.minuto_entrada <= 59){
                                                                        var fechaPersonalizada = utilities.formatearFechaPersonalizada($scope.fecha_entrada, $scope.hora_entrada, $scope.minuto_entrada, $scope.ampm);
                                                                        var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                                        $http({
                                                                            method : "POST",
                                                                            url : $scope.serverUrl + "/formularios/patronatos/registrar/acumulado",
                                                                            data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                                idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                                idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                                codigoMunicipio : $scope.municipio2_select.codigoMunicipio, 
                                                                                idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                                comunidad : comunidadValidada, foliosIns : $scope.folios_imp, anioProceso : $scope.anio_proceso_imp,
                                                                                idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada,
                                                                                numExpedientes : numExpedientes, folios : numerosFolios, cantidadExpedientes : numeroExpedientes
                                                                            }
                                                                        }).then(function mySuccess(response) {
                                                                            limpieza.limpiarRegistrarPatronatoForm($scope);
                                                                            console.log(response.data);
                                                                        }, function myError(response) {
                                                                            console.log(response.statusText);
                                                                        });
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
                                        window.alert("Por favor seleccione un numero de folios de expediente valido y mayor a cero");
                                    }
                                }else{
                                    window.alert("Por favor seleccione un año valido y mayor a cero");
                                }
                            }else{
                                window.alert("El campo nombre de la comunidad es muy largo o está vacio");
                            }
                        }else{
                            window.alert("Por favor seleccione un asunto");
                        }
                    }else{
                        window.alert("Por favor seleccione el empleado que recibe los expedientes");
                    }
                }else{
                    window.alert("Por favor seleccione una dependencia de procedencia");
                }
            }else{
                window.alert("El campo apoderado legal es muy largo");
            }
        }else {
            window.alert("El campo Interesado es muy largo o está vacío, por favor ingrese un valor valido");
        }
    };

});