app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numExpedientes = "";

    $http({
            method : "POST",
            url : "http://localhost:3000/populate/formularios/nombreExpedientes",
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

    $scope.validarFormulario = ()=> {
        if($scope.fecha_descargo != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_descargo);
            $http({
                method : "POST",
                url : "http://localhost:3000/formularios/expedientes/descargar",
                data : { fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                }
            }).then(function mySuccess(response) {
                $window.location.href = "../../seguimiento_expedientes.html#titulo_seguimiento";
            }, function myError(response) {
                console.log(response.statusText);
            });
        }else{
            window.alert("Por favor seleccione la fecha de descargo del expediente");
        }  
    };


});