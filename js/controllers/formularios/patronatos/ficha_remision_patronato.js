app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.numPatronatos = "";
    $scope.nombre_recibio = "";


    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreExpedientes",
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
        if($scope.dependencia_a_remitir_select != null){
            if($scope.nombre_recibio.length < 46 && $scope.nombre_recibio.trim().length > 0) {
                var recibioValidado = $scope.nombre_recibio.trim();
                if($scope.fecha_remision != null) {
                    var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                    $http({
                        method : "POST",
                        url : $scope.serverUrl + "/formularios/patronatos/remitir",
                        data : {dependenciaRemision : $scope.dependencia_a_remitir_select.idDependencia, recibidoPor : recibioValidado, 
                            fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                        }
                    }).then(function mySuccess(response) {
                        $window.location.href = "../../seguimiento_patronatos.html#titulo_seguimiento";
                    }, function myError(response) {
                            console.log(response.statusText);
                    });
                }else{
                    window.alert("Por favor seleccione la fecha de remisión del expediente de patronato");
                }  
            }else{
                window.alert("El campo Recibido Por es muy largo o está vacío, por favor ingrese un valor valido");
            }
        }else{
            window.alert("Por favor seleccione la dependecnia de remisión");
        }  
    };


});