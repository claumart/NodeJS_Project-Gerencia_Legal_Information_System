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

	$http({
        	method : "POST",
        	url : "http://localhost:3000/populate/select/abogadoAsignado"
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
                    url : "http://localhost:3000/formularios/expedientes/asignar",
                    data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                        idFicha : $scope.urlParams.idFicha
                    }
                }).then(function mySuccess(response) {
                    $window.location.href = "../../seguimiento_expedientes.html#titulo_seguimiento";
                }, function myError(response) {
                        console.log(response.statusText);
                });
            }else{
                window.alert("Por favor seleccione la fecha de asignación del expediente");
            }  
        }else{
            window.alert("Por favor seleccione el abogado al cual se le asignará el expediente");
        }  
    };


});