app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numExpedientes = "";
    $scope.nombre_recibio = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
            method : "POST",
            url :  "/populate/formularios/nombreExpedientes",
            headers: {'Content-Type': 'application/json'},
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
        url :  "/populate/select/dependencia",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        var lista = JSON.parse(response.data);
        $scope.dependenciaList = lista;
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
            method : "POST",
            url :  "/populate/select/empleadoReceptor",
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
            url :  "/modificacion/expedientes/obtener/formularioReingresoPrevio",
            headers: {'Content-Type': 'application/json'},
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
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
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
                            url :  "/modificacion/expedientes/actualizar/formularioReingresoPrevio",
                            headers: {'Content-Type': 'application/json'},
                            data : {dependenciaReingreso : $scope.dependencia_reingreso_select.idDependencia,
                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado,
                                fecha : fechaValidada, idPrevio : $scope.urlParams.idPrevio
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
                            url :  "/formularios/expedientes/reingresarConPrevio",
                            headers: {'Content-Type': 'application/json'},
                            data : {dependenciaReingreso : $scope.dependencia_reingreso_select.idDependencia,
                                numEmpleadoReceptor : $scope.empleado_receptor_select.numEmpleado,
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "/seguimiento_expedientes#titulo_seguimiento";
                        }, function myError(response) {
                            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                            document.getElementById('myModal').style.display = "flex";
                        });
                    }
                }else{
                    $scope.modalMessage = "Por favor seleccione la fecha de reingreso del expediente";
                    document.getElementById('myModal').style.display = "flex";
                }  
            }else{
                $scope.modalMessage = "Por favor seleccione el empleado que recibe los expedientes";
                document.getElementById('myModal').style.display = "flex";
            }
        }else{
            $scope.modalMessage = "Por favor seleccione la dependecnia de reingreso";
            document.getElementById('myModal').style.display = "flex";
        }  
    };


});