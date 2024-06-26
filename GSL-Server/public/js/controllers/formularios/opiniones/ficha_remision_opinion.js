app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numOficios = "";
    $scope.nombre_recibio = "";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
            method : "POST",
            url : "/populate/formularios/nombreOpiniones",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++){
                if(i == 0){
                    $scope.numOficios += lista[i].numOficio;  
                }else{
                    $scope.numOficios += ', ' + lista[i].numOficio;
                }
            }
        }, function myError(response) {
            console.log(response.statusText);
    });

	$http({
        method : "POST",
        url : "/populate/select/dependencia",
        headers: {'Content-Type': 'application/json'}
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
            url : "/modificacion/opiniones/obtener/formularioRemision",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
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
        //if($scope.dependencia_a_remitir_select != null){
            if($scope.nombre_recibio.length < 46 && $scope.nombre_recibio.trim().length > 0) {
                var recibioValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nombre_recibio).trim());
                if($scope.fecha_remision != null) {
                    var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                    if($scope.urlParams.mod == 1){
                        $http({
                            method : "POST",
                            url : "/modificacion/opiniones/actualizar/formularioRemision",
                            headers: {'Content-Type': 'application/json'},
                            data : {recibidoPor : recibioValidado, 
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
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
                            url : "/formularios/opiniones/remitir",
                            headers: {'Content-Type': 'application/json'},
                            data : {recibidoPor : recibioValidado, 
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "/seguimiento_opiniones#titulo_seguimiento";
                        }, function myError(response) {
                            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                            document.getElementById('myModal').style.display = "flex";
                        });
                    }
                }else{
                    $scope.modalMessage = "Por favor seleccione la fecha de remisión del oficio";
                    document.getElementById('myModal').style.display = "flex";
                }  
            }else{
                $scope.modalMessage = "El campo Recibido Por es muy largo o está vacío, por favor ingrese un valor valido";
                document.getElementById('myModal').style.display = "flex";
            }
        /*}else{
            $scope.modalMessage = "Por favor seleccione la dependecnia de remisión";
            document.getElementById('myModal').style.display = "flex";
        }*/  
    };


});