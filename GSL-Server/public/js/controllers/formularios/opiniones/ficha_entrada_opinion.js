app.service('limpieza', function() {
    this.limpiarRegistrarOpinionForm = (scope)=>{
        scope.interesado = "";
        scope.procedencia_select = null;
        scope.num_oficio = "";
        scope.asunto_select = null;
        scope.empleado_receptor_select = null;
        scope.fecha_entrada = null;
        scope.hora_entrada = 1;
        scope.minuto_entrada = 0;
        scope.ampm = "am";
        scope.asunto_textarea = "";
        scope.apoderado = "";
    }
});

app.controller("formCtrl", function($scope, $http, $window, utilities, limpieza) {
	$scope.tipo_fecha = "actual";
	$scope.interesado = "";
	$scope.num_oficio = "";
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.asunto_textarea = "";
    $scope.apoderado = "";
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

    /*****************************************Verificar y completar formulario de modificacion*****************************************/
    /**********************************************************************************************************************************/
    ComprobarModoModificacion = ()=> {
        if($scope.urlParams.mod == 1) {
            LlenarCampos();
        }
    };

    LlenarCampos = ()=>{
       $http({
            method : "POST",
            url : "/modificacion/opiniones/obtener/formularioEntrada",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            if(lista[0].apoderadoLegal != null) $scope.apoderado = lista[0].apoderadoLegal;
            $scope.num_oficio = lista[0].numOficio;
            $scope.asunto_textarea = lista[0].asunto; 
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

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.apoderado.length < 46){
            var apoderadoLegal = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.apoderado).trim());
        	if($scope.procedencia_select != null){
                if($scope.num_oficio.length < 31 && $scope.num_oficio.trim().length > 0){
                    var numOficioValidado = utilities.eliminateSpace($scope.num_oficio.toUpperCase().trim());
                    if($scope.asunto_textarea.length < 201 && $scope.asunto_textarea.trim().length > 0){
            			if($scope.empleado_receptor_select != null){
                            if($scope.tipo_fecha == "actual"){
                                var date = new Date();
                                var now = date.toLocaleString('es-GB');
                                now = utilities.formatearFechaActual(now);
                                if($scope.urlParams.mod == 1){
                                    $http({
                                        method : "POST",
                                        url : "/modificacion/opiniones/actualizar/fichaEntrada",
                                        headers: {'Content-Type': 'application/json'},
                                        data : {idProcedencia : $scope.procedencia_select.idDependencia, 
                                            numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : now,
                                            apoderado : apoderadoLegal, idFicha : $scope.urlParams.idFicha
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
                                        url : "/formularios/opiniones/registrar",
                                        headers: {'Content-Type': 'application/json'},
                                        data : {idProcedencia : $scope.procedencia_select.idDependencia, 
                                            numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : now,
                                            apoderado : apoderadoLegal
                                        }
                                    }).then(function mySuccess(response) {
                                        limpieza.limpiarRegistrarOpinionForm($scope);
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
                                                    url : "/modificacion/opiniones/actualizar/fichaEntrada",
                                                    headers: {'Content-Type': 'application/json'},
                                                    data : {idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : fechaPersonalizada,
                                                        apoderado : apoderadoLegal, idFicha : $scope.urlParams.idFicha
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
                                                    url : "/formularios/opiniones/registrar",
                                                    headers: {'Content-Type': 'application/json'},
                                                    data : {idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : fechaPersonalizada,
                                                        apoderado : apoderadoLegal
                                                    }
                                                }).then(function mySuccess(response) {
                                                    limpieza.limpiarRegistrarOpinionForm($scope);
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
                                    $scope.modalMessage = "Por favor seleccione la fecha de entrada del oficio";
                                    document.getElementById('myModal').style.display = "flex";
                                }
                            }
                                        
            			}else{
                            $scope.modalMessage = "Por favor seleccione el empleado que recibe los oficios";
                            document.getElementById('myModal').style.display = "flex";
            			 }
                    }else{
                        $scope.modalMessage = "El campo Asunto es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
                        document.getElementById('myModal').style.display = "flex";
                    } 
                }else {
                    $scope.modalMessage = "El campo Número de oficio es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
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
    
    };

});