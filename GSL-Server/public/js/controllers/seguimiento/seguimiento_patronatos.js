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

    $scope.contarPatronatosRecibidos = ()=> {
        limpiarPaginas();
        $scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
        $http({
            method : "POST",
            url : "/seguimiento/patronatos/contar/recibidos",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/patronatos/mostrar/recibidos",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.patronatosList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.patronatosList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarPatronatosRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/recibidos",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarPatronatosAsignados = ()=> {
        limpiarPaginas();
        $scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
        $http({
            method : "POST",
            url : "/seguimiento/patronatos/contar/asignados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/patronatos/mostrar/asignados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.patronatosList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });   
            }else{
                $scope.patronatosList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarPatronatosAsignados = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/asignados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};


    $scope.contarPatronatosDescargados = ()=> {
        limpiarPaginas();
        $scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
        $http({
            method : "POST",
            url : "/seguimiento/patronatos/contar/descargados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/patronatos/mostrar/descargados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.patronatosList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }else{
                $scope.patronatosList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };    

	$scope.mostrarPatronatosDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/descargados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarPatronatosRevisados = ()=> {
        limpiarPaginas();
        $scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
        $http({
            method : "POST",
            url : "/seguimiento/patronatos/contar/revisados",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/patronatos/mostrar/revisados",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.patronatosList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                }); 
            }else{
                $scope.patronatosList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarPatronatosRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/revisados",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

    $scope.contarPatronatosRemitidos = ()=> {
        limpiarPaginas();
        $http({
            method : "POST",
            url : "/seguimiento/patronatos/contar/remitidos",
            headers: {'Content-Type': 'application/json'}
        }).then(async function mySuccess(response) {
            var lista = await JSON.parse(response.data);
            $scope.totalRegistros = lista[0].numeroRegistros;
            $scope.totalPaginas = Math.ceil($scope.totalRegistros/$scope.tamanioBusqueda);
            if($scope.totalRegistros>0){
                $http({
                    method : "POST",
                    url : "/seguimiento/patronatos/mostrar/remitidos",
                    headers: {'Content-Type': 'application/json'},
                    data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
                }).then(function mySuccess(response) {
                    var lista = JSON.parse(response.data);
                    $scope.patronatosList = utilities.formatearFecha(lista);
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });  
            }else{
                $scope.patronatosList = null;
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });
    };

	$scope.mostrarPatronatosRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/remitidos",
            headers: {'Content-Type': 'application/json'},
            data : {offSet : ($scope.numeroPagina - 1) * $scope.tamanioBusqueda, rango: $scope.tamanioBusqueda}
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};

	$scope.mostrarPatronato = ()=> {
        var numPatronatoValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : "/seguimiento/patronatos/mostrar/patronatoParticular",
            headers: {'Content-Type': 'application/json'},
            data : {numExpediente : numPatronatoValidado}
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
                    default:
                        $scope.modalMessage = "Error del sistema en el registro del patronato";
                        document.getElementById('myModal').style.display = "flex";
                }
            }
        	$scope.patronatosList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});
	};

    $scope.darSeguimientoPatronato = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "/patronatos/asignar_patronato#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "/patronatos/descargar_patronato#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "/patronatos/revisar_patronato#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "/patronatos/remitir_patronato#titulo_formulario?idFicha=" + idFicha;
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
        $scope.patronatosList = null;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    };

    seleccionarAccion = ()=> {
        switch ($scope.accion) {
            case "asignar":
                $scope.mostrarPatronatosRecibidos();
                break;
            case "descargar":
                $scope.mostrarPatronatosAsignados();
                break;
            case "revisar":
                $scope.mostrarPatronatosDescargados();
                break;
            case "remitir":
                $scope.mostrarPatronatosRevisados();
                break;   
        }
    };

});

