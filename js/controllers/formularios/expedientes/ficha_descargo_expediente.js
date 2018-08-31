app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);

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
        if($scope.fecha_asignacion != null) {
            var date = new Date($scope.fecha_descargo);
            var dateTime = date.toLocaleString('es-GB');
            dateTime = utilities.formatearFechaActual(dateTime);
            var onlyDate = dateTime.split(' ')[0];
            $http({
                method : "POST",
                url : "http://localhost:3000/formularios/expedientes/descargar",
                data : { fecha : onlyDate, idFicha : $scope.urlParams.idFicha
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