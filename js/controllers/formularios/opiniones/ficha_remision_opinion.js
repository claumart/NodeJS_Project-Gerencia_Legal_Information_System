app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.numOficios = "";
    $scope.nombre_recibio = "";

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreOpiniones",
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
        url : $scope.serverUrl + "/populate/select/dependencia"
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
            url : $scope.serverUrl + "/modificacion/opiniones/obtener/formularioRemision",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            $scope.nombre_recibio = lista[0].recibidoPor;
            $scope.fecha_remision = new Date(lista[0].fechaRemision);
            
        }, function myError(response) {
            console.log(response.statusText);
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/


    $scope.validarFormulario = ()=> {
        //if($scope.dependencia_a_remitir_select != null){
            if($scope.nombre_recibio.length < 46 && $scope.nombre_recibio.trim().length > 0) {
                var recibioValidado = $scope.nombre_recibio.trim();
                if($scope.fecha_remision != null) {
                    var fechaValidada = utilities.validarFecha($scope.fecha_remision);
                    if($scope.urlParams.mod == 1){
                        $http({
                            method : "POST",
                            url : $scope.serverUrl + "/modificacion/opiniones/actualizar/formularioRemision",
                            data : {recibidoPor : recibioValidado, 
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "../../modificacion/modificacion.html#titulo_modificacion";
                        }, function myError(response) {
                                console.log(response.statusText);
                        });
                    }else{
                        $http({
                            method : "POST",
                            url : $scope.serverUrl + "/formularios/opiniones/remitir",
                            data : {recibidoPor : recibioValidado, 
                                fecha : fechaValidada, idFicha : $scope.urlParams.idFicha
                            }
                        }).then(function mySuccess(response) {
                            $window.location.href = "../../seguimiento/seguimiento_opiniones.html#titulo_seguimiento";
                        }, function myError(response) {
                                console.log(response.statusText);
                        });
                    }
                }else{
                    window.alert("Por favor seleccione la fecha de remisión del expediente");
                }  
            }else{
                window.alert("El campo Recibido Por es muy largo o está vacío, por favor ingrese un valor valido");
            }
        //}else{
        //    window.alert("Por favor seleccione la dependecnia de remisión");
        //}  
    };


});