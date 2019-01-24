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
            url :  "/modificacion/expedientes/obtener/formularioRemision",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            for(let i = 0; i<$scope.dependenciaList.length; i++){
                if(lista[0].idDependenciaRemision == $scope.dependenciaList[i].idDependencia){
                    $scope.dependencia_a_remitir_select = $scope.dependenciaList[i];
                    break;
                }
            }
            $scope.nombre_recibio = lista[0].recibidoPor;
            $scope.fecha_remision = new Date(lista[0].fechaRemision);
            
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.dependencia_a_remitir_select != null){
            if($scope.nombre_recibio.length < 46 && $scope.nombre_recibio.trim().length > 0) {
                var recibioValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nombre_recibio).trim());
                if($scope.fecha_remision != null) {
                    var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                    if($scope.urlParams.mod == 1){
                        $http({
                            method : "POST",
                            url :  "/modificacion/expedientes/actualizar/formularioRemision",
                            headers: {'Content-Type': 'application/json'},
                            data : {dependenciaRemision : $scope.dependencia_a_remitir_select.idDependencia, recibidoPor : recibioValidado, 
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
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
                            url :  "/formularios/expedientes/remitir",
                            headers: {'Content-Type': 'application/json'},
                            data : {dependenciaRemision : $scope.dependencia_a_remitir_select.idDependencia, recibidoPor : recibioValidado, 
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
                    $scope.modalMessage = "Por favor seleccione la fecha de remisión del expediente";
                    document.getElementById('myModal').style.display = "flex";
                }  
            }else{
                $scope.modalMessage = "El campo Recibido Por es muy largo o está vacío, por favor ingrese un valor valido";
                document.getElementById('myModal').style.display = "flex";
            }
        }else{
            $scope.modalMessage = "Por favor seleccione la dependencia de remisión";
            document.getElementById('myModal').style.display = "flex";
        }  
    };


});