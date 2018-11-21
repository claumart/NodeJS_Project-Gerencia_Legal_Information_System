app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numPatronatos = "";
    $scope.serverUrl = urlUtility.getServerUrl();

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombrePatronatos",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++){
                if(i == 0){
                    $scope.numPatronatos += lista[i].numPatronato;  
                }else{
                    $scope.numPatronatos += ', ' + lista[i].numPatronato;
                }
            }
        }, function myError(response) {
            console.log(response.statusText);
    });

    $scope.validarFormulario = ()=> {
        if($scope.fecha_descargo != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_descargo);
            $http({
                method : "POST",
                url : $scope.serverUrl + "/formularios/patronatos/descargar",
                data : { fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                }
            }).then(function mySuccess(response) {
                $window.location.href = "../../seguimiento/seguimiento_patronatos.html#titulo_seguimiento";
            }, function myError(response) {
                console.log(response.statusText);
            });
        }else{
            window.alert("Por favor seleccione la fecha de descargo del expediente");
        }  
    };


});