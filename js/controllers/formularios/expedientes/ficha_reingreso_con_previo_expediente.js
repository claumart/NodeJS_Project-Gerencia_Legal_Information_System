app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.numExpedientes = "";
    $scope.nombre_recibio = "";

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreExpedientes",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++){
                if(i == 0){
                    $scope.numExpedientes += lista[i].numExpediente;  
                }else{
                    $scope.numExpedientes += ', ' + lista[i].numExpediente;
                }
            }
        }, function myError(response) {
            console.log(response.statusText);
    });

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
            url : $scope.serverUrl + "/modificacion/expedientes/obtener/formularioReingresoPrevio",
            data : {idPrevio : $scope.urlParams.idPrevio}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            for(let i = 0; i<$scope.dependenciaList.length; i++){
                if(lista[0].idDependenciaRetorno == $scope.dependenciaList[i].idDependencia){
                    $scope.dependencia_reingreso_select = $scope.dependenciaList[i];
                    break;
                }
            }
            for(let i = 0; i<$scope.empleadoReceptorList.length; i++){
                if(lista[0].idEmpleadoReceptor == $scope.empleadoReceptorList[i].numEmpleado){
                    $scope.empleado_receptor_select = $scope.empleadoReceptorList[i];
                    break;
                }
            }

            $scope.fecha_reingreso = new Date(lista[0].fechaRetorno);
            
        }, function myError(response) {
            console.log(response.statusText);
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.dependencia_reingreso_select != null){
            if($scope.empleado_receptor_select != null){
                if($scope.fecha_reingreso != null) {
                    var fechaValidada = utilities.validarFecha($scope.fecha_reingreso);
                    if($scope.urlParams.mod == 1){
                        $http({
                            method : "POST",
                            url : $scope.serverUrl + "/modificacion/expedientes/actualizar/formularioReingresoPrevio",
                            data : {dependenciaReingreso : $scope.dependencia_reingreso_select.idDependencia,
                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado,
                                fecha : fechaValidada, idPrevio : $scope.urlParams.idPrevio
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "../../modificacion/modificacion.html#titulo_modificacion";
                        }, function myError(response) {
                            console.log(response.statusText);
                        });
                    }else{
                        $http({
                            method : "POST",
                            url : $scope.serverUrl + "/formularios/expedientes/reingresarConPrevio",
                            data : {dependenciaReingreso : $scope.dependencia_reingreso_select.idDependencia,
                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado,
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "../../seguimiento/seguimiento_expedientes.html#titulo_seguimiento";
                        }, function myError(response) {
                            console.log(response.statusText);
                        });
                    }
                }else{
                    window.alert("Por favor seleccione la fecha de reingreso del expediente");
                }  
            }else{
                window.alert("Por favor seleccione el empleado que recibe los expedientes");
            }
        }else{
            window.alert("Por favor seleccione la dependecnia de reingreso");
        }  
    };


});