app.service("utilities", function() {
	this.formatearFecha = (lista)=> {
		for(x in lista){
			var d = new Date(lista[x].fechaEntrada);
    		var n = d.toLocaleString();
    		lista[x].fechaEntrada = n;
		}
		return lista;
	};

    this.eliminateSpace = (str)=> {
        return str.replace(/\s+/g, "");
    };
});

app.controller("seguimientoCtrl", function($scope, $http, $window, utilities) {
	$scope.privilegios = [];
    $scope.accion = "";
    $scope.textoBoton = "";
    $scope.pagina1 = 1;
    $scope.pagina2 = 2;
    $scope.totalRegistros = 0;
    $scope.tamanioBusqueda = 50;
    $scope.numeroPagina = 1;
    $scope.totalPaginas = 0;
    $scope.busqueda = false;

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
        method : "POST",
        url : "/usuario/obtenerPrivilegios",
        headers: {'Content-Type': 'application/json'}
    }).then(function mySuccess(response) {
        $scope.privilegios = JSON.parse(response.data);
    }, function myError(response) {
        console.log(response.statusText);
    });

    $scope.contarExpedientesRecibidos = ()=> {
        limpiarPaginas();
        $scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/recibidos",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/recibidos",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/recibidos",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarExpedientesAsignados1 = ()=> {
        limpiarPaginas();
        $scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/asignados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/asignados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesAsignados1 = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/asignados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.contarExpedientesDescargados = ()=> {
        limpiarPaginas();
        $scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/descargados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/descargados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/descargados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarExpedientesRevisados = ()=> {
        limpiarPaginas();
        $scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/revisados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/revisados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/revisados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.contarExpedientesRemitidos = ()=> {
        limpiarPaginas();
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/remitidos",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/remitidos",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/remitidos",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarExpedientesAsignados2 = ()=> {
        limpiarPaginas();
        $scope.accion = "conPrevio";
        $scope.textoBoton = "Remitir Con Previo";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/asignados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/asignados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesAsignados2 = ()=> {
		$scope.accion = "conPrevio";
        $scope.textoBoton = "Remitir Con Previo";
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/asignados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarExpedientesConPrevio = ()=> {
        limpiarPaginas();
        $scope.accion = "reingresar";
        $scope.textoBoton = "Reingresar";
        $http({
            method : "POST",
            url : "/seguimiento/expedientes/contar/conprevio",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/expedientes/mostrar/conprevio",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.expedientesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.expedientesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarExpedientesConPrevio = ()=> {
		$scope.accion = "reingresar";
        $scope.textoBoton = "Reingresar";                                                                                                                                                        
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/conprevio",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarExpediente = ()=> {
        limpiarPaginas();
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : "/seguimiento/expedientes/mostrar/expedienteParticular",
            headers: {'Content-Type': 'application/json'},
            data : {numExpediente : numExpValidado}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
            if(lista.length > 0){
                switch (lista[0].idEstado) {
                    case 1:
                        $scope.accion = "asignar";
                        $scope.textoBoton = "Asignar";
                        break;
                    case 2:
                        $scope.accion = "descargar";
                        $scope.textoBoton = "Descargar";
                        break;
                    case 3:
                        $scope.accion = "revisar";
                        $scope.textoBoton = "Revisar";
                        break;
                    case 4:
                        $scope.accion = "remitir";
                        $scope.textoBoton = "Remitir";
                        break;
                    case 5:
                        $scope.accion = "compleatdo";
                        $scope.textoBoton = "Completado";
                        break;
                    case 6:
                        $scope.accion = "reingresar";
                        $scope.textoBoton = "Reingresar";
                        break;
                    default:
                        $scope.modalMessage = "Error del sistema en el registro del expediente";
                        document.getElementById('myModal').style.display = "flex";
                }
            }
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.darSeguimientoExpediente = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "/expedientes/asignar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "/expedientes/descargar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "/expedientes/revisar_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "/expedientes/remitir_expediente#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "conPrevio":
                var newUrl = "/expedientes/remitir_con_previo#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "reingresar":
                var newUrl = "/expedientes/reingresar_con_previo#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            
        }
    };

    /*********************************************************************************************/
    /*****************************************Pagination******************************************/
    /*********************************************************************************************/

    $scope.volverPagina = async ()=>{
        if($scope.numeroPagina>2){
            $scope.pagina2 = --$scope.numeroPagina;
            document.getElementById('pagina1').setAttribute('class', '');
            if($scope.totalPaginas>1){
                document.getElementById('pagina2').setAttribute('class', 'active');
            }
            if($scope.totalPaginas>2){
                document.getElementById('ultimaPagina').setAttribute('class', '');
            }
            await seleccionarAccion();
        }else if($scope.numeroPagina==2){
            await $scope.irPagina1();
        }
    };

    $scope.irPagina1 = async ()=>{
        $scope.numeroPagina=1;
        $scope.pagina2 = 2;
        document.getElementById('pagina1').setAttribute('class', 'active');
        if($scope.totalPaginas>1){
            document.getElementById('pagina2').setAttribute('class', '');
        }
        if($scope.totalPaginas>2){
            document.getElementById('ultimaPagina').setAttribute('class', '');
        }
        await seleccionarAccion();
    };

    $scope.irPagina2 = async ()=>{
        if($scope.numeroPagina==1){
            $scope.pagina2 = ++$scope.numeroPagina;
            document.getElementById('pagina1').setAttribute('class', '');
            if($scope.totalPaginas>1){
                document.getElementById('pagina2').setAttribute('class', 'active');
            }
            if($scope.totalPaginas>2){
                document.getElementById('ultimaPagina').setAttribute('class', '');
            }
        }else if($scope.numeroPagina==$scope.totalPaginas && $scope.totalPaginas>2){
            $scope.pagina2 = --$scope.numeroPagina;
            document.getElementById('pagina1').setAttribute('class', '');
            if($scope.totalPaginas>1){
                document.getElementById('pagina2').setAttribute('class', 'active');
            }
            if($scope.totalPaginas>2){
                document.getElementById('ultimaPagina').setAttribute('class', '');
            }
        }
        await seleccionarAccion();
    };

    $scope.irUltimaPagina = async ()=>{
        $scope.numeroPagina=$scope.totalPaginas;
        $scope.pagina2 = $scope.totalPaginas - 1;
        document.getElementById('pagina1').setAttribute('class', '');
        document.getElementById('pagina2').setAttribute('class', '');
        document.getElementById('ultimaPagina').setAttribute('class', 'active');
        await seleccionarAccion();
    };

    $scope.adelantarPagina = async ()=>{
        if($scope.numeroPagina<$scope.totalPaginas - 1){
            $scope.pagina2 = ++$scope.numeroPagina;
            document.getElementById('pagina1').setAttribute('class', '');
            if($scope.totalPaginas>1){
                document.getElementById('pagina2').setAttribute('class', 'active');
            }
            if($scope.totalPaginas>2){
                document.getElementById('ultimaPagina').setAttribute('class', '');
            }
            await seleccionarAccion();
        }else if($scope.numeroPagina==$scope.totalPaginas - 1 && $scope.totalPaginas==2){
            $scope.numeroPagina=$scope.totalPaginas;
            $scope.pagina2 = $scope.totalPaginas;
            $scope.busqueda = false;
            document.getElementById('pagina1').setAttribute('class', '');
            document.getElementById('pagina2').setAttribute('class', 'active');
            await seleccionarAccion();
        }else if($scope.numeroPagina==$scope.totalPaginas - 1 && $scope.totalPaginas>2){
            await $scope.irUltimaPagina();
        }
    };

    limpiarPaginas = async ()=>{
        await document.getElementById('pagina2').setAttribute('class', 'ng-hide');
        await document.getElementById('ultimaPagina').setAttribute('class', 'ng-hide');
        $scope.pagina2 = 2;
        $scope.totalRegistros = 0;
        $scope.tamanioBusqueda = 50;
        $scope.numeroPagina = 1;
        $scope.totalPaginas = 0;
        await document.getElementById('pagina1').setAttribute('class', 'active');
        $scope.expedientesList = null;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    };

    seleccionarAccion = ()=> {
        switch ($scope.accion) {
            case "asignar":
                $scope.mostrarExpedientesRecibidos();
                break;
            case "descargar":
                $scope.mostrarExpedientesAsignados1();
                break;
            case "revisar":
                $scope.mostrarExpedientesDescargados();
                break;
            case "remitir":
                $scope.mostrarExpedientesRevisados();
                break;
            case "conPrevio":
                $scope.mostrarExpedientesAsignados2();
                break;
            case "reingresar":
                $scope.mostrarExpedientesConPrevio();
                break;   
        }
    };

});

