app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numOficios = "";
    $scope.serverUrl = urlUtility.getServerUrl();

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreOpiniones",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++){
                if(i == 0){
                    $scope.numOficios += lista[i].numOficio;  
                }else{
                    $scope.numOficios += ', ' + lista[i].numOficio;
                }
            }
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
            url : $scope.serverUrl + "/modificacion/opiniones/obtener/formularioAsignacion",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            for(let i = 0; i<$scope.abogadoAsignadoList.length; i++){
                if(lista[0].idAbogadoAsignado == $scope.abogadoAsignadoList[i].numEmpleado){
                    $scope.abogado_asignado_select = $scope.abogadoAsignadoList[i];
                    break;
                }
            }

            $scope.fecha_asignacion = new Date(lista[0].fechaAsignacion);
            
        }, function myError(response) {
            console.log(response.statusText);
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.abogado_asignado_select != null){
            if($scope.fecha_asignacion != null) {
                var fechaValidada = utilities.validarFecha($scope.fecha_asignacion);
                if($scope.urlParams.mod == 1){
                    $http({
                        method : "POST",
                        url : $scope.serverUrl + "/modificacion/opiniones/actualizar/formularioAsignacion",
                        data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                            idFicha : $scope.urlParams.idFicha
                        }
                    }).then(function mySuccess(response) {
                        $window.location.href = "../../modificacion/modificacion.html#titulo_modificacion";
                    }, function myError(response) {
                            console.log(response.statusText);
                    });
                }else{
                    $http({
                        method : "POST",
                        url : $scope.serverUrl + "/formularios/opiniones/asignar",
                        data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                            idFicha : $scope.urlParams.idFicha
                        }
                    }).then(function mySuccess(response) {
                        $window.location.href = "../../seguimiento/seguimiento_opiniones.html#titulo_seguimiento";
                    }, function myError(response) {
                            console.log(response.statusText);
                    });
                }
            }else{
                window.alert("Por favor seleccione la fecha de asignación de la opinión");
            }  
        }else{
            window.alert("Por favor seleccione el abogado al cual se le asignará la opinión");
        }  
    };


});