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


    $scope.validarFormulario = ()=> {
        if($scope.dependencia_reingreso_select != null){
            if($scope.fecha_reingreso != null) {
                var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/formularios/expedientes/remitirConPrevio",
                    data : {dependenciaReingreso : $scope.dependencia_reingreso_select.idDependencia,
                        fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                    }
                }).then(function mySuccess(response) {
                    $window.location.href = "../../seguimiento_expedientes.html#titulo_seguimiento";
                }, function myError(response) {
                    console.log(response.statusText);
                });
            }else{
                window.alert("Por favor seleccione la fecha de reingreso del expediente");
            }  
        }else{
            window.alert("Por favor seleccione la dependecnia de reingreso");
        }  
    };


});