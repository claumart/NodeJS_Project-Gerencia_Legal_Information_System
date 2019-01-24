app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numPatronatos = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
            method : "POST",
            url : "/populate/formularios/nombrePatronatos",
            headers: {'Content-Type': 'application/json'},
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
        	url : "/populate/select/abogadoAsignado",
            headers: {'Content-Type': 'application/json'}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.abogadoAsignadoList = lista;
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
            url : "/modificacion/patronatos/obtener/formularioAsignacion",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            for(let i = 0; i<$scope.abogadoAsignadoList.length; i++){
                if(lista[0].idAbogadoAsignado == $scope.abogadoAsignadoList[i].numEmpleado){
                    $scope.abogado_asignado_select = $scope.abogadoAsignadoList[i];
                    break;
                }
            }
            $scope.fecha_asignacion = new Date(lista[0].fechaAsignacion);   
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=> {
        if($scope.abogado_asignado_select != null){
            if($scope.fecha_asignacion != null) {
                var fechaValidada = utilities.validarFecha($scope.fecha_asignacion);
                if($scope.urlParams.mod == 1){
                    $http({
                        method : "POST",
                        url : "/modificacion/patronatos/actualizar/formularioAsignacion",
                        headers: {'Content-Type': 'application/json'},
                        data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                            idFicha : $scope.urlParams.idFicha
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
                        url : "/formularios/patronatos/asignar",
                        headers: {'Content-Type': 'application/json'},
                        data : {numAbogadoAsignado : $scope.abogado_asignado_select.numEmpleado, fecha : fechaValidada, 
                            idFicha : $scope.urlParams.idFicha
                        }
                    }).then(function mySuccess(response) {
                        $window.location.href = "/seguimiento_patronatos#titulo_seguimiento";
                    }, function myError(response) {
                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                        document.getElementById('myModal').style.display = "flex";
                    });
                }
            }else{
                $scope.modalMessage = "Por favor seleccione la fecha de asignación del expediente de patronato";
                document.getElementById('myModal').style.display = "flex";
            }  
        }else{
            $scope.modalMessage = "Por favor seleccione el abogado al cual se le asignará el expediente de patronato";
            document.getElementById('myModal').style.display = "flex";
        }  
    };


});