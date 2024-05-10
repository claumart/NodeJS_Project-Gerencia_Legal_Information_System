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

    this.agregarTextoBoton = (lista)=> {
        for(x in lista){
            switch (lista[x].idEstado) {
                case 1:
                    lista[x].textoBoton = "Asignar";
                    break;
                case 2:
                    lista[x].textoBoton = "Descargar";
                    break;
                case 3:
                    lista[x].textoBoton = "Revisar";
                    break;
                case 4:
                    lista[x].textoBoton = "Remitir";
                    break;
                case 5:
                    lista[x].textoBoton = "Completado";
                    break;
                default:
                    $scope.modalMessage = "Error del sistema en el registro de la opinion";
                    document.getElementById('myModal').style.display = "flex";
            }
        }
        return lista;
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    $scope.contarOpinionesRecibidas = ()=> {
        limpiarPaginas();
        $scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
        $http({
            method : "POST",
            url : "/seguimiento/opiniones/contar/recibidas",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/opiniones/mostrar/recibidas",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.opinionesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });  
            }else{
                $scope.opinionesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarOpinionesRecibidas = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/recibidas",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarOpinionesAsignadas = ()=> {
        limpiarPaginas();
        $scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
        $http({
            method : "POST",
            url : "/seguimiento/opiniones/contar/asignadas",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/opiniones/mostrar/asignadas",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.opinionesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.opinionesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarOpinionesAsignadas = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/asignadas",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarOpinionesDescargadas = ()=> {
        limpiarPaginas();
        $scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
        $http({
            method : "POST",
            url : "/seguimiento/opiniones/contar/descargadas",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/opiniones/mostrar/descargadas",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.opinionesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.opinionesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarOpinionesDescargadas = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/descargadas",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarOpinionesRevisadas = ()=> {
        limpiarPaginas();
        $scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
        $http({
            method : "POST",
            url : "/seguimiento/opiniones/contar/revisadas",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/opiniones/mostrar/revisadas",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.opinionesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });  
            }else{
                $scope.opinionesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarOpinionesRevisadas = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/revisadas",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.contarOpinionesRemitidas = ()=> {
        limpiarPaginas();
        $http({
            method : "POST",
            url : "/seguimiento/opiniones/contar/remitidas",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/opiniones/mostrar/remitidas",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.opinionesList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.opinionesList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarOpinionesRemitidas = ()=> {
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/remitidas",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.opinionesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarOpinion = ()=> {
        limpiarPaginas();
        var numOficioValidado = utilities.eliminateSpace($scope.num_oficio.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : "/seguimiento/opiniones/mostrar/oficioParticular",
            headers: {'Content-Type': 'application/json'},
            data : {numOficio : numOficioValidado}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
            lista = utilities.agregarTextoBoton(lista);
        	$scope.oficioEspecificoList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.darSeguimientoOficioEspecifico = (idFicha, idEstado)=>{
        switch (idEstado) {
            case 1:
                var newUrl = "/opiniones/asignar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case 2:
                var newUrl = "/opiniones/descargar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case 3:
                var newUrl = "/opiniones/revisar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case 4:
                var newUrl = "/opiniones/remitir_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;  
        }
    };

    $scope.darSeguimientoOpinion = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "/opiniones/asignar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
                var newUrl = "/opiniones/descargar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "/opiniones/revisar_opinion#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "/opiniones/remitir_opinion#titulo_formulario?idFicha=" + idFicha;
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
        $scope.opinionesList = null;
        $scope.oficioEspecificoList = null;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    };

    seleccionarAccion = ()=> {
        switch ($scope.accion) {
            case "asignar":
                $scope.mostrarExpedientesRecibidos();
                break;
            case "descargar":
                $scope.mostrarOpinionesAsignadas();
                break;
            case "revisar":
                $scope.mostrarOpinionesDescargadas();
                break;
            case "remitir":
                $scope.mostrarOpinionesRevisadas();
                break;  
        }
    };

});

