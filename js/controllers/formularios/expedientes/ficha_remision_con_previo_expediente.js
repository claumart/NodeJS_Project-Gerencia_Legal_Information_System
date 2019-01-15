app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.numExpedientes = "";
    $scope.nombre_recibio = "";
    $scope.motivo_textarea = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

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
            url : $scope.serverUrl + "/modificacion/expedientes/obtener/formularioRemisionPrevio",
            data : {idPrevio : $scope.urlParams.idPrevio}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            for(let i = 0; i<$scope.dependenciaList.length; i++){
                if(lista[0].idDependenciaRemision == $scope.dependenciaList[i].idDependencia){
                    $scope.dependencia_a_remitir_select = $scope.dependenciaList[i];
                    break;
                }
            }
            if(lista[0].motivoRemision != null) $scope.motivo_textarea = lista[0].motivoRemision;
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
            if($scope.motivo_textarea.length < 80){
                var motivoValidado = $scope.motivo_textarea.trim();
                if($scope.nombre_recibio.length < 46 && $scope.nombre_recibio.trim().length > 0) {
                    var recibioValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nombre_recibio).trim());
                    if($scope.fecha_remision != null) {
                        var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                        if($scope.urlParams.mod == 1){
                            $http({
                                method : "POST",
                                url : $scope.serverUrl + "/modificacion/expedientes/actualizar/formularioRemisionPrevio",
                                data : {dependenciaRemisionPrevio : $scope.dependencia_a_remitir_select.idDependencia, motivo : motivoValidado,
                                    recibidoPor : recibioValidado, fecha : fechaValidada, idPrevio : $scope.urlParams.idPrevio
                                }
                            }).then(function mySuccess(response) {
                                $window.location.href = "../../modificacion/modificacion.html#titulo_modificacion";
                            }, function myError(response) {
                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                document.getElementById('myModal').style.display = "flex";
                            });
                        }else{
                            $http({
                                method : "POST",
                                url : $scope.serverUrl + "/formularios/expedientes/remitirConPrevio",
                                data : {dependenciaRemisionPrevio : $scope.dependencia_a_remitir_select.idDependencia, motivo : motivoValidado,
                                    recibidoPor : recibioValidado, fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                                }
                            }).then(function mySuccess(response) {
                                $window.location.href = "../../seguimiento/seguimiento_expedientes.html#titulo_seguimiento";
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
                $scope.modalMessage = "El campo motivo es demasiado largo";
                document.getElementById('myModal').style.display = "flex";

            }
        }else{
            $scope.modalMessage = "Por favor seleccione la dependecnia de remisión";
            document.getElementById('myModal').style.display = "flex";
        }  
    };


});