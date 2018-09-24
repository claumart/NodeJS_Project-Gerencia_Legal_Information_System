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

app.controller("formCtrl", function($scope, $http, utilities, limpieza, urlUtility) {
    $scope.serverUrl = urlUtility.getServerUrl();
	$scope.tipo_fecha = "actual";
	$scope.interesado = "";
	$scope.num_oficio = "";
	$scope.hora_entrada = 1;
	$scope.minuto_entrada = 0;
	$scope.ampm = "am";
    $scope.asunto_textarea = "";
    $scope.apoderado = "";


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

    $scope.validarFormulario = ()=> {
    	if($scope.interesado.length < 46 && $scope.interesado.trim().length > 0){
            var interesadoValidado = $scope.interesado.trim();
    		if($scope.procedencia_select != null){
                if($scope.num_oficio.length < 31 && $scope.num_oficio.trim().length > 0){
                    var numOficioValidado = utilities.eliminateSpace($scope.num_oficio.toUpperCase().trim());
                    console.log("El valor de asunto es " + $scope.asunto_textarea);
                    if($scope.asunto_textarea.length < 201 && $scope.asunto_textarea.trim().length > 0){
        			    if($scope.empleado_receptor_select != null){
                            if($scope.tipo_fecha == "actual"){
                                var date = new Date();
                                var now = date.toLocaleString('es-GB');
                                now = utilities.formatearFechaActual(now);
                                var apoderadoLegal = $scope.apoderado.trim();
                                $http({
                                        method : "POST",
                                        url : $scope.serverUrl + "/formularios/opiniones/registrar",
                                        data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                            numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                            numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : now,
                                            apoderado : apoderadoLegal
                                        }
                                    }).then(function mySuccess(response) {
                                        limpieza.limpiarRegistrarOpinionForm($scope);

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
                                                    url : $scope.serverUrl + "/formularios/opiniones/registrar",
                                                    data : {interesado : interesadoValidado, idProcedencia : $scope.procedencia_select.idDependencia, 
                                                        numOficio : numOficioValidado, asunto : $scope.asunto_textarea,
                                                        numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado, fecha : fechaPersonalizada,
                                                        apoderado : apoderadoLegal
                                                    }
                                                }).then(function mySuccess(response) {
                                                    limpieza.limpiarRegistrarOpinionForm($scope);
                                                    console.log(response.data);
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
        				    window.alert("Por favor seleccione el empleado que recibe los expedientes");
        			    }
                    }else{
                        window.alert("El campo Asunto es muy largo o está vacío, por favor ingrese un valor valido y sin espacios");
                    } 
                }else {
                    window.alert("El campo Número de oficio es muy largo o está vacío, por favor ingrese un valor valido y sin espacios");
                }
    	    }else{
    		    window.alert("Por favor seleccione una dependencia de procedencia");
    	    }
    	}else {
    	    window.alert("El campo Interesado es muy largo o está vacío, por favor ingrese un valor valido");
    	}
    };

});