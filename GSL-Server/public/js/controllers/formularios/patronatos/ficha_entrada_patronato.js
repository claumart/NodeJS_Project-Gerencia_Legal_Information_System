/***********************Hecho por Shirley Claudette Martínez***********************/

app.service('limpieza', function() {
    this.limpiarRegistrarPatronatoForm = (scope)=>{
        scope.interesado = "";
        scope.apoderado = "";
        scope.procedencia_select = null;
        scope.empleado_receptor_select = null;
        scope.extrainfo_textarea = "";
        scope.asunto_patronato_select = null;
        scope.municipio1_select = null;
        scope.tipo_comunidad1_select = null;
        scope.comunidad1 = "";
        scope.anio_proceso_ins = 2000;
        scope.periodo_validez_ins = 0;
        scope.folios_ins = 0;
        scope.municipio2_select = null;
        scope.tipo_comunidad2_select = null;
        scope.comunidad2 = "";
        scope.anio_proceso_imp = 2000;
        scope.periodo_validez_imp = 0;
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

app.controller("formCtrl", function($scope, $http, $window, utilities, limpieza) {
    $scope.interesado = "";
    $scope.apoderado = "";
    $scope.procedencia_select = null;
    $scope.empleado_receptor_select = null;
    $scope.extrainfo_textarea = "";
    $scope.asunto_patronato_select = null;
    $scope.municipio1_select = null;
    $scope.tipo_comunidad1_select = null;
    $scope.comunidad1 = "";
    $scope.anio_proceso_ins = 2000;
    $scope.periodo_validez_ins = 0;
    $scope.folios_ins = 0;
    $scope.municipio2_select = null;
    $scope.tipo_comunidad2_select = null;
    $scope.comunidad2 = "";
    $scope.anio_proceso_imp = 2000;
    $scope.periodo_validez_imp = 0;
    $scope.folios_imp = 0;
    $scope.num_expediente1 = "";
    $scope.num_folios_expediente1 = 0;
	$scope.tipo_fecha = "actual";
    $scope.numAcumulados = 1;
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
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
            url : "/populate/select/asuntoPatronato",
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.asuntoPatronatoList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : "/populate/select/municipio",
            headers: {'Content-Type': 'application/json'}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.municipioList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : "/populate/select/tipoComunidad",
            headers: {'Content-Type': 'application/json'}
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
                    url : "/extraInfo/formularios/comunidades",
                    headers: {'Content-Type': 'application/json'},
                    data : { matchComunidad : $scope.comunidad1, idMunicipio : $scope.municipio1_select.idMunicipio,
                        idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad
                    }
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.comunidadesList = lista;
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.comunidad1 = "";
                $scope.modalMessage = "Por favor seleccione un tipo de comunidad";
                document.getElementById('myModal').style.display = "flex"; 
            }
        }else{
            $scope.comunidad1 = "";
            $scope.modalMessage = "Por favor seleccione un municipio";
            document.getElementById('myModal').style.display = "flex";
        }
    };

    $scope.actualizarComunidadesList2 = ()=> {
        if($scope.municipio2_select != null) {
            if($scope.tipo_comunidad2_select != null) {
                $http({
                    method : "POST",
                    url : "/extraInfo/formularios/comunidades",
                    headers: {'Content-Type': 'application/json'},
                    data : { matchComunidad : $scope.comunidad2, idMunicipio : $scope.municipio2_select.idMunicipio,
                        idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad
                    }
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.comunidadesList = lista;
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.comunidad2 = "";
                $scope.modalMessage = "Por favor seleccione un tipo de comunidad";
                document.getElementById('myModal').style.display = "flex"; 
            }
        }else{
            $scope.comunidad2 = "";
            $scope.modalMessage = "Por favor seleccione un municipio";
            document.getElementById('myModal').style.display = "flex";
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

    /*****************************************Verificar y completar formulario de modificacion*****************************************/
    /**********************************************************************************************************************************/
    ComprobarModoModificacion = async()=> {
        if($scope.urlParams.mod == 1) {
            await LlenarCampos();
            await DerivarNumExpediente();
        }
    };

    LlenarCampos = ()=>{
       $http({
            method : "POST",
            url : "/modificacion/patronatos/obtener/formularioEntrada",
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
            $scope.extrainfo_textarea = lista[0].informacionAdicional;
            for(let i = 0; i<$scope.asuntoPatronatoList.length; i++){
                if(lista[0].idAsuntoPatronato == $scope.asuntoPatronatoList[i].idAsuntoPatronato){
                    $scope.asunto_patronato_select = $scope.asuntoPatronatoList[i];
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

    DerivarNumExpediente = ()=>{
        $http({
            method : "POST",
            url : "/modificacion/patronatos/obtener/expedientes",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            $scope.antiguosExp = JSON.parse(response.data);
            for(let i=0; i<$scope.antiguosExp.length; i++){
                if($scope.antiguosExp[i].numExpedientePatronato.search("GPM") == 0){
                    $scope.expInscripcionAntiguo = $scope.antiguosExp[i];
                    break;
                }
            }
            var expInscripcionParametros = $scope.expInscripcionAntiguo.numExpedientePatronato.split('-');
            var idComunidad = expInscripcionParametros[3];
            $http({
                method : "POST",
                url : "/modificacion/patronatos/obtener/nombreComunidad",
                headers: {'Content-Type': 'application/json'},
                data : {idComunidad : idComunidad}
            }).then(function mySuccess(response) {
                if($scope.asunto_patronato_select.idAsuntoPatronato == 1){
                    for(let i = 0; i<$scope.municipioList.length; i++){
                        if(expInscripcionParametros[1] == $scope.municipioList[i].codigoMunicipio){
                            $scope.municipio1_select = $scope.municipioList[i];
                            break;
                        }
                    }
                    for(let i = 0; i<$scope.tipoComunidadList.length; i++){
                        if(expInscripcionParametros[2] == $scope.tipoComunidadList[i].idTipoComunidad){
                            $scope.tipo_comunidad1_select = $scope.tipoComunidadList[i];
                            break;
                        }
                    }
                    $scope.comunidad1 = JSON.parse(response.data)[0].nombreComunidad;
                    $scope.anio_proceso_ins = parseInt(expInscripcionParametros[4], 10);
                    $scope.periodo_validez_ins = parseInt($scope.expInscripcionAntiguo.periodoDeValidez, 10);
                    $scope.folios_ins = parseInt($scope.expInscripcionAntiguo.folios, 10);
                }else if($scope.asunto_patronato_select.idAsuntoPatronato == 2){
                    for(let i = 0; i<$scope.municipioList.length; i++){
                        if(expInscripcionParametros[1] == $scope.municipioList[i].codigoMunicipio){
                            $scope.municipio2_select = $scope.municipioList[i];
                            break;
                        }
                    }
                    for(let i = 0; i<$scope.tipoComunidadList.length; i++){
                        if(expInscripcionParametros[2] == $scope.tipoComunidadList[i].idTipoComunidad){
                            $scope.tipo_comunidad2_select = $scope.tipoComunidadList[i];
                            break;
                        }
                    }
                    $scope.comunidad2 = JSON.parse(response.data)[0].nombreComunidad;
                    $scope.anio_proceso_imp = parseInt(expInscripcionParametros[4], 10);
                    $scope.periodo_validez_imp = parseInt($scope.expInscripcionAntiguo.periodoDeValidez, 10);
                    $scope.folios_imp = parseInt($scope.expInscripcionAntiguo.folios, 10);
                    MostrarExpedientes();
                }
            }, function myError(response) {
                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                document.getElementById('myModal').style.display = "flex";
            });

        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };


    MostrarExpedientes = ()=> {
        for(expediente in $scope.antiguosExp){
            if($scope.antiguosExp[expediente].numExpedientePatronato.search("GPM") == -1){
                if($scope.num_expediente1 == "" || $scope.num_expediente1 == null){
                    $scope.num_expediente1 = $scope.antiguosExp[expediente].numExpedientePatronato;
                    $scope.num_folios_expediente1 = $scope.antiguosExp[expediente].folios;
                }else{
                    $scope.agregarExpediente();
                    var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                    var inputExpId = "num_expediente" + numeroExpedientes;
                    document.getElementById(inputExpId).value = $scope.antiguosExp[expediente].numExpedientePatronato;
                    var inputFolioId = "num_folios_expediente" + numeroExpedientes;
                    document.getElementById(inputFolioId).value = $scope.antiguosExp[expediente].folios;
                }      
            }
        }
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
                        if($scope.extrainfo_textarea.length < 201){
                            if($scope.asunto_patronato_select != null && $scope.asunto_patronato_select.idAsuntoPatronato == 1){
                                if($scope.comunidad1.length < 46 && $scope.comunidad1.trim().length > 0){
                                    var comunidadValidada = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.comunidad1).trim());
                                    if(!isNaN($scope.anio_proceso_ins) && $scope.anio_proceso_ins > 0){
                                        if(!isNaN($scope.periodo_validez_ins) && $scope.periodo_validez_ins > 0){
                                            if(!isNaN($scope.folios_ins) && $scope.folios_ins > 0){
                                                if($scope.tipo_fecha == "actual"){
                                                    var date = new Date();
                                                    var now = date.toLocaleString('es-GB');
                                                    now = utilities.formatearFechaActual(now);
                                                    if($scope.urlParams.mod == 1){
                                                        $http({
                                                            method : "POST",
                                                            url : "/modificacion/patronatos/actualizar/fichaEntrada/noAcumulado",
                                                            headers: {'Content-Type': 'application/json'},
                                                            data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado,
                                                                extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio1_select.idMunicipio,
                                                                codigoMunicipio : $scope.municipio1_select.codigoMunicipio,
                                                                idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                                comunidad : comunidadValidada, foliosIns : $scope.folios_ins, 
                                                                anioProceso : $scope.anio_proceso_ins, periodoValidez : $scope.periodo_validez_ins,
                                                                idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now,
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
                                                            url : "/formularios/patronatos/registrar/noAcumulado",
                                                            headers: {'Content-Type': 'application/json'},
                                                            data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio1_select.idMunicipio,
                                                                codigoMunicipio : $scope.municipio1_select.codigoMunicipio,
                                                                idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                                comunidad : comunidadValidada, foliosIns : $scope.folios_ins, 
                                                                anioProceso : $scope.anio_proceso_ins, periodoValidez : $scope.periodo_validez_ins,
                                                                idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now   
                                                            }
                                                        }).then(function mySuccess(response) {
                                                            limpieza.limpiarRegistrarPatronatoForm($scope);
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
                                                                var apoderadoLegal = $scope.apoderado.trim();
                                                                if($scope.urlParams.mod == 1){
                                                                    $http({
                                                                        method : "POST",
                                                                        url : "/modificacion/patronatos/actualizar/fichaEntrada/noAcumulado",
                                                                        headers: {'Content-Type': 'application/json'},
                                                                        data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                            idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                            extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio1_select.idMunicipio,
                                                                            codigoMunicipio : $scope.municipio1_select.codigoMunicipio, 
                                                                            idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                                            comunidad : comunidadValidada, foliosIns : $scope.folios_ins, 
                                                                            anioProceso : $scope.anio_proceso_ins, periodoValidez : $scope.periodo_validez_ins,
                                                                            idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada,
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
                                                                        url : "/formularios/patronatos/registrar/noAcumulado",
                                                                        headers: {'Content-Type': 'application/json'},
                                                                        data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                            idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                            extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio1_select.idMunicipio,
                                                                            codigoMunicipio : $scope.municipio1_select.codigoMunicipio, 
                                                                            idTipoComunidad : $scope.tipo_comunidad1_select.idTipoComunidad,
                                                                            comunidad : comunidadValidada, foliosIns : $scope.folios_ins, 
                                                                            anioProceso : $scope.anio_proceso_ins, periodoValidez : $scope.periodo_validez_ins,
                                                                            idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada
                                                                        }
                                                                    }).then(function mySuccess(response) {
                                                                        limpieza.limpiarRegistrarPatronatoForm($scope);
                                                                    }, function myError(response) {
                                                                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                                                        document.getElementById('myModal').style.display = "flex";
                                                                    }); 
                                                                }
                                                            }else {
                                                                $scope.modalMessage = "Por favor seleccione un rango de minutos valido entre 0 a 59";
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
                                                $scope.modalMessage = "Por favor seleccione un numero de folios de expediente valido y mayor a cero";
                                                document.getElementById('myModal').style.display = "flex";
                                            }
                                        }else{
                                            $scope.modalMessage = "Por favor seleccione un periodo de validez del patronato valido y mayor a cero";
                                            document.getElementById('myModal').style.display = "flex";
                                        }
                                    }else{
                                        $scope.modalMessage = "Por favor seleccione un año valido y mayor a cero";
                                        document.getElementById('myModal').style.display = "flex";
                                    }
                                }else {
                                    $scope.modalMessage = "El campo nombre de la comunidad es muy largo o está vacio";
                                    document.getElementById('myModal').style.display = "flex";
                                }
                            }else if($scope.asunto_patronato_select != null && $scope.asunto_patronato_select.idAsuntoPatronato == 2){
                                if($scope.comunidad2.length < 46 && $scope.comunidad2.trim().length > 0){
                                    var comunidadValidada = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.comunidad2).trim());
                                    if(!isNaN($scope.anio_proceso_imp) && $scope.anio_proceso_imp > 0){
                                        if(!isNaN($scope.periodo_validez_imp) && $scope.periodo_validez_imp > 0){
                                            if(!isNaN($scope.folios_imp) && $scope.folios_imp > 0){
                                                var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                var expedientesPatronato = [];
                                                for(i = 1; i <= numeroExpedientes; i++) {
                                                    var inputExpId = "num_expediente" + i;
                                                    var inputExp = document.getElementById(inputExpId);
                                                    var inputFolioId = "num_folios_expediente" + i;
                                                    var inputFolio = document.getElementById(inputFolioId);
                                                    if(inputExp.value.length < 31 && inputExp.value.trim().length > 0) {
                                                        var numExpValidado = utilities.eliminateSpace(inputExp.value.toUpperCase().trim());
                                                        if(!isNaN(inputFolio.value) && inputFolio.value > 0){
                                                            expedientesPatronato[i-1] = {numExpediente : numExpValidado, folios : inputFolio.value};
                                                            if(i == numeroExpedientes){
                                                                if($scope.tipo_fecha == "actual"){
                                                                    var date = new Date();
                                                                    var now = date.toLocaleString('es-GB');
                                                                    now = utilities.formatearFechaActual(now);
                                                                    if($scope.urlParams.mod == 1){
                                                                        $http({
                                                                            method : "POST",
                                                                            url : "/modificacion/patronatos/actualizar/fichaEntrada/acumulado",
                                                                            headers: {'Content-Type': 'application/json'},
                                                                            data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                                idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                                extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                                codigoMunicipio : $scope.municipio2_select.codigoMunicipio,
                                                                                idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                                comunidad : comunidadValidada, foliosIns : $scope.folios_imp, 
                                                                                anioProceso : $scope.anio_proceso_imp, periodoValidez : $scope.periodo_validez_imp,
                                                                                idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now,
                                                                                expedientes : expedientesPatronato, cantidadExpedientes : numeroExpedientes,
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
                                                                            url : "/formularios/patronatos/registrar/acumulado",
                                                                            headers: {'Content-Type': 'application/json'},
                                                                            data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                                idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                                extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                                codigoMunicipio : $scope.municipio2_select.codigoMunicipio,
                                                                                idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                                comunidad : comunidadValidada, foliosIns : $scope.folios_imp, 
                                                                                anioProceso : $scope.anio_proceso_imp, periodoValidez : $scope.periodo_validez_imp,
                                                                                idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : now,
                                                                                expedientes : expedientesPatronato, cantidadExpedientes : numeroExpedientes
                                                                            }
                                                                        }).then(function mySuccess(response) {
                                                                            limpieza.limpiarRegistrarPatronatoForm($scope);
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
                                                                                var numeroExpedientes = parseInt($scope.numAcumulados, 10);
                                                                                if($scope.urlParams.mod == 1){
                                                                                    $http({
                                                                                        method : "POST",
                                                                                        url : "/modificacion/patronatos/actualizar/fichaEntrada/acumulado",
                                                                                        headers: {'Content-Type': 'application/json'},
                                                                                        data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                                            idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                                            extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                                            codigoMunicipio : $scope.municipio2_select.codigoMunicipio, 
                                                                                            idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                                            comunidad : comunidadValidada, foliosIns : $scope.folios_imp, 
                                                                                            anioProceso : $scope.anio_proceso_imp, periodoValidez : $scope.periodo_validez_imp,
                                                                                            idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada,
                                                                                            expedientes : expedientesPatronato, cantidadExpedientes : numeroExpedientes,
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
                                                                                        url : "/formularios/patronatos/registrar/acumulado",
                                                                                        headers: {'Content-Type': 'application/json'},
                                                                                        data : {interesado : interesadoValidado, apoderado : apoderadoLegal, 
                                                                                            idProcedencia : $scope.procedencia_select.idDependencia, 
                                                                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, 
                                                                                            extrainfo : $scope.extrainfo_textarea, idMunicipio : $scope.municipio2_select.idMunicipio,
                                                                                            codigoMunicipio : $scope.municipio2_select.codigoMunicipio, 
                                                                                            idTipoComunidad : $scope.tipo_comunidad2_select.idTipoComunidad,
                                                                                            comunidad : comunidadValidada, foliosIns : $scope.folios_imp, 
                                                                                            anioProceso : $scope.anio_proceso_imp, periodoValidez : $scope.periodo_validez_imp,
                                                                                            idAsunto : $scope.asunto_patronato_select.idAsuntoPatronato, fecha : fechaPersonalizada,
                                                                                            expedientes : expedientesPatronato, cantidadExpedientes : numeroExpedientes
                                                                                        }
                                                                                    }).then(function mySuccess(response) {
                                                                                        limpieza.limpiarRegistrarPatronatoForm($scope);
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
                                                $scope.modalMessage = "Por favor seleccione un numero de folios de expediente valido y mayor a cero";
                                                document.getElementById('myModal').style.display = "flex";
                                            }
                                        }else{
                                            $scope.modalMessage = "Por favor seleccione un periodo de validez del patronato valido y mayor a cero";
                                            document.getElementById('myModal').style.display = "flex";
                                        }
                                    }else{
                                        $scope.modalMessage = "Por favor seleccione un año valido y mayor a cero";
                                        document.getElementById('myModal').style.display = "flex";
                                    }
                                }else{
                                    $scope.modalMessage = "El campo nombre de la comunidad es muy largo o está vacio";
                                    document.getElementById('myModal').style.display = "flex";
                                }
                            }else{
                                $scope.modalMessage = "Por favor seleccione un asunto";
                                document.getElementById('myModal').style.display = "flex";
                            }
                        }else{
                            $scope.modalMessage = "El campo Informacion Adicional es muy largo";
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