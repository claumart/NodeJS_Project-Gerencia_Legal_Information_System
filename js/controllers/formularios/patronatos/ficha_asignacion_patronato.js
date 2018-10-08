app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numPatronatos = "";
    $scope.serverUrl = urlUtility.getServerUrl();

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
        	url : $scope.serverUrl + "/populate/select/abogadoAsignado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.abogadoAsignadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


    $scope.validarFormulario = ()=> {
        if($scope.abogado_asignado_select != null){
            if($scope.fecha_asignacion != null) {
                var fechaValidada = utilities.validarFecha($scope.fecha_asignacion);
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/formularios/patronatos/asignar",
                    data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                        idFicha : $scope.urlParams.idFicha
                    }
                }).then(function mySuccess(response) {
                    $window.location.href = "../../seguimiento_patronatos.html#titulo_seguimiento";
                }, function myError(response) {
                        console.log(response.statusText);
                });
            }else{
                window.alert("Por favor seleccione la fecha de asignación del expediente de patronato");
            }  
        }else{
            window.alert("Por favor seleccione el abogado al cual se le asignará el expediente de patronato");
        }  
    };


});