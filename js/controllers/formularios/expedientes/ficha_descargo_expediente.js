app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numExpedientes = "";
    $scope.serverUrl = urlUtility.getServerUrl();

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
            url : $scope.serverUrl + "/modificacion/expedientes/obtener/formularioDescargo",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            $scope.fecha_descargo = new Date(lista[0].fechaDescargo);
            
        }, function myError(response) {
            console.log(response.statusText);
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.fecha_descargo != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_descargo);
            if($scope.urlParams.mod == 1){
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/modificacion/expedientes/actualizar/formularioDescargo",
                    data : { fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                    }
                }).then(function mySuccess(response) {
                    $window.location.href = "../../modificacion/modificacion.html#titulo_modificacion";
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }else{
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/formularios/expedientes/descargar",
                    data : { fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                    }
                }).then(function mySuccess(response) {
                    $window.location.href = "../../seguimiento/seguimiento_expedientes.html#titulo_seguimiento";
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }
        }else{
            window.alert("Por favor seleccione la fecha de descargo del expediente");
        }  
    };


});