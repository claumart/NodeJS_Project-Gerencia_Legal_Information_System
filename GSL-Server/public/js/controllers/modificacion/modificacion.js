/***********************Hecho por Shirley Claudette Martínez***********************/
app.service("utilities", function() {
	this.formatearFecha = (lista)=> {
		for(x in lista){
			if(lista[x].fechaEntrada != null && lista[x].fechaEntrada != ""){
                var d = new Date(lista[x].fechaEntrada);
                var n = d.toLocaleString();
                lista[x].fechaEntrada = n;
            }
            if(lista[x].fechaRemision != null && lista[x].fechaRemision != ""){
                var d = new Date(lista[x].fechaRemision);
                var n = d.toLocaleDateString();
                lista[x].fechaRemision = n;
            }
		}
		return lista;
	};

    this.eliminateSpace = (str)=> {
        return str.replace(/\s+/g, "");
    };
});

app.controller("modCtrl", function($scope, $http, $window, utilities) {
    $scope.privilegios = [];
	$scope.accion = "";
    $scope.textoBoton = "";
    $scope.tipo_busqueda_select = "exp";
    $scope.fichaEntradaList = [];
    $scope.fichaAsignacionList = [];
    $scope.fichaDescargoList = [];
    $scope.fichaRevisionList = [];
    $scope.fichaRemisionList = [];
    $scope.fichaRemisionPrevioList = [];
    $scope.fichaReingresoPrevioList = [];
    $scope.fichaEntradaPttList = [];
    $scope.fichaAsignacionPttList = [];
    $scope.fichaDescargoPttList = [];
    $scope.fichaRevisionPttList = [];
    $scope.fichaRemisionPttList = [];

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

    $scope.ValidarBusqueda = ()=> {
        switch($scope.tipo_busqueda_select) {
            case "exp":
                BuscarExpedientesForm();
            break;
            case "opn":
                BuscarOpinionesForm();
            break;
            case "ptt":
                BuscarPatronatosForm();
            break;
        }
    }

	BuscarExpedientesForm = ()=> {
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : "/modificacion/expedientes/mostrar/fichas",
            headers: {'Content-Type': 'application/json'},
            data : {numExpediente : numExpValidado}
    	}).then(function mySuccess(response) {
            $scope.fichaEntradaList = [];
            $scope.fichaAsignacionList = [];
            $scope.fichaDescargoList = [];
            $scope.fichaRevisionList = [];
            $scope.fichaRemisionList = [];
            $scope.fichaRemisionPrevioList = [];
            $scope.fichaReingresoPrevioList = [];
            var lista = JSON.parse(response.data);
            lista = utilities.formatearFecha(lista);
            for(ficha in lista) {
                switch (lista[ficha].idEstado) {
                    case 1:
                        $scope.fichaEntradaList.push(lista[ficha]);
                    break;
                    case 2:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                    break;
                    case 3:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                    break;
                    case 4:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                        $scope.fichaRevisionList.push(lista[ficha]);
                    break;
                    case 5:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                        $scope.fichaRevisionList.push(lista[ficha]);
                        $scope.fichaRemisionList.push(lista[ficha]);
                    break;
                }

                $http({
                    method : "POST",
                    url : "/modificacion/expedientes/mostrar/fichasDePrevision",
                    headers: {'Content-Type': 'application/json'},
                    data : {idFicha : lista[ficha].idficha}
                }).then(function mySuccess(response) {
                    var listaPrevio = JSON.parse(response.data);
                    listaPrevio = utilities.formatearFecha(listaPrevio);
                    for(previo in listaPrevio) {
                        if(listaPrevio[previo].fechaRetorno != null){
                            $scope.fichaRemisionPrevioList.push(listaPrevio[previo]);
                            $scope.fichaReingresoPrevioList.push(listaPrevio[previo]);
                        }else{
                            $scope.fichaRemisionPrevioList.push(listaPrevio[previo]);
                        }
                    }
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });
            }
            
        	//$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	$scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
    	});

	};


    BuscarOpinionesForm = ()=> {
        var numOficioValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
        $http({
            method : "POST",
            url : "/modificacion/opiniones/mostrar/fichas",
            headers: {'Content-Type': 'application/json'},
            data : {numOficio : numOficioValidado}
        }).then(function mySuccess(response) {
            $scope.fichaEntradaList = [];
            $scope.fichaAsignacionList = [];
            $scope.fichaDescargoList = [];
            $scope.fichaRevisionList = [];
            $scope.fichaRemisionList = [];
            var lista = JSON.parse(response.data);
            lista = utilities.formatearFecha(lista);
            for(ficha in lista) {
                switch (lista[ficha].idEstado) {
                    case 1:
                        $scope.fichaEntradaList.push(lista[ficha]);
                    break;
                    case 2:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                    break;
                    case 3:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                    break;
                    case 4:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                        $scope.fichaRevisionList.push(lista[ficha]);
                    break;
                    case 5:
                        $scope.fichaEntradaList.push(lista[ficha]);
                        $scope.fichaAsignacionList.push(lista[ficha]);
                        $scope.fichaDescargoList.push(lista[ficha]);
                        $scope.fichaRevisionList.push(lista[ficha]);
                        $scope.fichaRemisionList.push(lista[ficha]);
                    break;
                }
            }
            
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });

    };


    BuscarPatronatosForm = ()=> {
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
        $http({
            method : "POST",
            url : "/modificacion/patronatos/mostrar/fichas",
            headers: {'Content-Type': 'application/json'},
            data : {numExpediente : numExpValidado}
        }).then(function mySuccess(response) {
            $scope.fichaEntradaPttList = [];
            $scope.fichaAsignacionPttList = [];
            $scope.fichaDescargoPttList = [];
            $scope.fichaRevisionPttList = [];
            $scope.fichaRemisionPttList = [];
            var lista = JSON.parse(response.data);
            lista = utilities.formatearFecha(lista);
            for(ficha in lista) {
                switch (lista[ficha].idEstado) {
                    case 1:
                        $scope.fichaEntradaPttList.push(lista[ficha]);
                    break;
                    case 2:
                        $scope.fichaEntradaPttList.push(lista[ficha]);
                        $scope.fichaAsignacionPttList.push(lista[ficha]);
                    break;
                    case 3:
                        $scope.fichaEntradaPttList.push(lista[ficha]);
                        $scope.fichaAsignacionPttList.push(lista[ficha]);
                        $scope.fichaDescargoPttList.push(lista[ficha]);
                    break;
                    case 4:
                        $scope.fichaEntradaPttList.push(lista[ficha]);
                        $scope.fichaAsignacionPttList.push(lista[ficha]);
                        $scope.fichaDescargoPttList.push(lista[ficha]);
                        $scope.fichaRevisionPttList.push(lista[ficha]);
                    break;
                    case 5:
                        $scope.fichaEntradaPttList.push(lista[ficha]);
                        $scope.fichaAsignacionPttList.push(lista[ficha]);
                        $scope.fichaDescargoPttList.push(lista[ficha]);
                        $scope.fichaRevisionPttList.push(lista[ficha]);
                        $scope.fichaRemisionPttList.push(lista[ficha]);
                    break;
                }
            }
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        });

    };

    $scope.limpiarTablas = ()=> {
        $scope.fichaEntradaList = [];
        $scope.fichaAsignacionList = [];
        $scope.fichaDescargoList = [];
        $scope.fichaRevisionList = [];
        $scope.fichaRemisionList = [];
        $scope.fichaRemisionPrevioList = [];
        $scope.fichaReingresoPrevioList = [];
        $scope.fichaEntradaPttList = [];
        $scope.fichaAsignacionPttList = [];
        $scope.fichaDescargoPttList = [];
        $scope.fichaRevisionPttList = [];
        $scope.fichaRemisionPttList = [];
    };

    $scope.ModificarFormulario = (idFicha, tipoFormulario)=> {
        switch($scope.tipo_busqueda_select) {
            case "exp":
                RedireccionarFormExp(idFicha, tipoFormulario);
            break;
            case "opn":
                RedireccionarFormOpn(idFicha, tipoFormulario);
            break;
            case "ptt":
                RedireccionarFormPtt(idFicha, tipoFormulario);
            break;
        }

    };
 
    RedireccionarFormExp = (idFicha, tipoFormulario)=>{
        switch (tipoFormulario) {
            case "entrada":
                var newUrl = "/expedientes/nueva_ficha_expedientes#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "asignacion":
                var newUrl = "/expedientes/asignar_expediente#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "descargo":
               var newUrl = "/expedientes/descargar_expediente#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "revision":
                var newUrl = "/expedientes/revisar_expediente#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "remision":
                var newUrl = "/expedientes/remitir_expediente#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;    
        }
    };

    RedireccionarFormOpn = (idFicha, tipoFormulario)=>{
        switch (tipoFormulario) {
            case "entrada":
                var newUrl = "/opiniones/nueva_ficha_opiniones#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "asignacion":
                var newUrl = "/opiniones/asignar_opinion#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "descargo":
                var newUrl = "/opiniones/descargar_opinion#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "revision":
                var newUrl = "/opiniones/revisar_opinion#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "remision":
                var newUrl = "/opiniones/remitir_opinion#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;    
        }
    };

    RedireccionarFormPtt = (idFicha, tipoFormulario)=>{
        switch (tipoFormulario) {
            case "entrada":
                var newUrl = "/patronatos/nueva_ficha_patronatos#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "asignacion":
                var newUrl = "/patronatos/asignar_patronato#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "descargo":
               var newUrl = "/patronatos/descargar_patronato#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "revision":
                var newUrl = "/patronatos/revisar_patronato#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;
            case "remision":
                var newUrl = "/patronatos/remitir_patronato#titulo_formulario?mod=1&" +"idFicha=" + idFicha;
                $window.location.href = newUrl;
            break;    
        }
    };

    $scope.ModificarFormularioPrevio = (idFicha, idPrevio, tipoFormulario)=> {
        switch(tipoFormulario) {
            case "remision":
                var newUrl = "/expedientes/remitir_con_previo#titulo_formulario?mod=1&" +
                "idFicha=" + idFicha + "&idPrevio=" + idPrevio;
                $window.location.href = newUrl;
            break;
            case "reingreso":
                var newUrl = "/expedientes/reingresar_con_previo#titulo_formulario?mod=1&" +
                "idFicha=" + idFicha  + "&idPrevio=" + idPrevio;
                $window.location.href = newUrl;
            break;
        }

    };

});

