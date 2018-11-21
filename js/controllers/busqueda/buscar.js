app.service("utilities", function() {
	this.formatearFecha = (lista)=> {
		for(x in lista){
			var d = new Date(lista[x].fechaEntrada);
    		var n = d.toLocaleString();
    		lista[x].fechaEntrada = n;
		}
		return lista;
	};

    this.formatearFechaActual = (fecha)=> {
    	return fecha.replace(/\//g, "-");
    };

    this.validarFecha = (fecha)=> {
        var date = new Date(fecha);
        var dateTime = date.toLocaleString('es-GB');
        dateTime = this.formatearFechaActual(dateTime);
        var onlyDate = dateTime.split(' ')[0];
    	return onlyDate;
    };
});

app.controller("searchCtrl", function($scope, $http, $window, utilities, urlUtility) {
	$scope.tipo_fecha1 = "fecha_especifica";
	$scope.tipo_fecha2 = "fecha_especifica";
	$scope.buscar_input = "";
	$scope.serverUrl = urlUtility.getServerUrl();
	$scope.procedencia_select = "";
	$scope.empleado_receptor_select = "";
	$scope.asunto_select = "";
	$scope.asunto_patronato_select = "";
	$scope.tipo_comunidad_select = "";
	$scope.abogado_asignado_select = "";
	$scope.dependencia_remision_select = "";
	$scope.estado_expediente_select = "";
	$scope.tipo_busqueda_select = "exp";
	$scope.nombreParametroId = "Expedientes";
	$scope.usar_fechas = false;
	
	$http({
    	method : "POST",
    	url : $scope.serverUrl + "/populate/select/dependencia"
    }).then(function mySuccess(response) {
		var lista = JSON.parse(response.data);
        $scope.dependenciaList = lista;
    }, function myError(response) {
    	console.log(response.statusText);
    });


	$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/empleadoReceptor"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.empleadoReceptorList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/asunto"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.asuntoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/asuntoPatronato"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.asuntoPatronatoList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/tipoComunidad"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.tipoComunidadList = lista;
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


    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/estadoExpediente"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.estadoExpedienteList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


	$scope.copyProcedenciaValue = ()=>{
		if($scope.parametro_busqueda=="procedencia"){
			$scope.buscar_input = $scope.procedencia_select.nombreDependencia;
		}
	};
	$scope.copyEmpleadoReceptorValue = ()=>{
		if($scope.parametro_busqueda=="empleadoReceptor"){
			$scope.buscar_input = $scope.empleado_receptor_select.nombreEmpleado;
		}

	};
	$scope.copyAsuntoValue = ()=>{
		if($scope.parametro_busqueda=="asunto" && $scope.tipo_busqueda_select=="exp"){
			$scope.buscar_input = $scope.asunto_select.nombreAsunto;
		}else if($scope.parametro_busqueda=="asunto" && $scope.tipo_busqueda_select=="ptt") {
			$scope.buscar_input = $scope.asunto_patronato_select.nombreAsuntoPatronato;
		}
	};

	$scope.copyTipoComunidadValue = ()=>{
		if($scope.parametro_busqueda=="tipoComunidad"){
			$scope.buscar_input = $scope.tipo_comunidad_select.nombreTipoComunidad;
		}
	};

	$scope.copyAbogadoAsignadoValue = ()=>{
		if($scope.parametro_busqueda=="abogadoAsignado"){
			$scope.buscar_input = $scope.abogado_asignado_select.nombreAbogado;
		}
	};
	$scope.copyDependicaRemisionValue = ()=>{
		if($scope.parametro_busqueda=="dependenciaRemision"){
			$scope.buscar_input = $scope.dependencia_remision_select.nombreDependencia;
		}
	};
	$scope.copyEstadoExpedienteValue = ()=>{
		if($scope.parametro_busqueda=="estadoExpediente"){
			$scope.buscar_input = $scope.estado_expediente_select.nombreEstado;
		}
	};

	$scope.limpiarParametrosDeBusqueda = ()=>{
		$scope.parametro_busqueda = "";
		$scope.resultadosExpList = null;
		$scope.resultadosOpnList = null;
		$scope.resultadosPttList = null;
	}


	$scope.ValidarBusqueda = ()=> {
		switch($scope.tipo_busqueda_select) {
			case  "exp":
				ValidarRegistroExp();
				break;
			case  "opn":
				ValidarRegistroOpn();
				break;
			case  "ptt":
				ValidarRegistroPtt();
				break;
		}
	};

	ValidarRegistroExp = ()=> {
		switch($scope.parametro_busqueda) {
			case  "numExpediente":
				if($scope.buscar_input.length != ""){
					BuscarExpPorParametrosTipo1("numExpediente", $scope.buscar_input);
				}
				break;
			case  "interesado":
				if($scope.buscar_input.length != ""){
					BuscarExpPorParametrosTipo1("interesado", $scope.buscar_input);
				}
				break;
			case  "apoderadoLegal":
				if($scope.buscar_input.length != ""){
					BuscarExpPorParametrosTipo1("apoderadoLegal", $scope.buscar_input);
				}
				break;
			case  "procedencia":
				if($scope.procedencia_select != null){
					BuscarExpPorParametrosTipo1("procedencia", $scope.procedencia_select.idDependencia);
				}
				break;
			case  "empleadoReceptor":
				if($scope.empleado_receptor_select != null){
					BuscarExpPorParametrosTipo1("empleadoReceptor", $scope.empleado_receptor_select.numEmpleado);
				}
				break;
			case  "asunto":
				if($scope.asunto_select != null){
					BuscarExpPorParametrosTipo1("asunto", $scope.asunto_select.idAsunto);
				}
				break;
			case  "abogadoAsignado":
				if($scope.abogado_asignado_select != null){
					BuscarExpPorParametrosTipo1("abogadoAsignado", $scope.abogado_asignado_select.numEmpleado);
				}
				break;
			case  "dependenciaRemision":
				if($scope.dependencia_remision_select != null){
					BuscarExpPorParametrosTipo1("dependenciaRemision", $scope.dependencia_remision_select.idDependencia);
				}
				break;
			case  "estadoExpediente":
				if($scope.estado_expediente_select != null){
					BuscarExpPorParametrosTipo1("estadoExpediente", $scope.estado_expediente_select.idEstadoExpediente );
				}
				break;
			case  "fechaEntrada":
				BuscarExpPorParametrosTipo2("fechaEntrada");
				break;
			case  "fechaAsignacion":
				BuscarExpPorParametrosTipo2("fechaAsignacion");
				break;
			case  "fechaDescargo":
				BuscarExpPorParametrosTipo2("fechaDescargo");
				break;
			case  "fechaRemision":
				BuscarExpPorParametrosTipo2("fechaRemision");
				break;
			default:
				window.alert("Por favor seleccione un parametro de busqueda");
		}

	};

	BuscarExpPorParametrosTipo1 = (nombreParametro, valor)=>{
		if($scope.usar_fechas) {
			if($scope.tipo_fecha1 == "fecha_especifica") {
				if($scope.fecha_dia1 != null) {
					var fechaValidada = utilities.validarFecha($scope.fecha_dia1);
					$http({
			        	method : "POST",
			        	url : $scope.serverUrl + "/buscar/expedientes/parametros1/conFecha",
			        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
			        		fecha : fechaValidada
                		}
			    	}).then(function mySuccess(response) {
			    		var lista = JSON.parse(response.data);
			        	$scope.resultadosExpList = utilities.formatearFecha(lista);
			    	}, function myError(response) {
			        	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha para realizar la busqueda");
				}

			}else if($scope.tipo_fecha1 == "fecha_rango") {
				if($scope.fecha_inicio1 != null) {
					var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio1);
					if($scope.fecha_fin1 != null) {
						var fechaFinValidada = utilities.validarFecha($scope.fecha_fin1);
						$http({
				        	method : "POST",
				        	url : $scope.serverUrl + "/buscar/expedientes/parametros1/conFecha",
				        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
				        		fechaInicio : fechaInicioValidada, fechaFin : fechaFinValidada
                			}
				    	}).then(function mySuccess(response) {
				    		var lista = JSON.parse(response.data);
				        	$scope.resultadosExpList = utilities.formatearFecha(lista);
				    	}, function myError(response) {
				        	console.log(response.statusText);
				    	});
					}else{
						window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
					}

				}else{
					window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
				}
			}
		}else {
			$http({
			    method : "POST",
			   	url : $scope.serverUrl + "/buscar/expedientes/parametros1/sinFecha",
			   	data : {parametroBusqueda : nombreParametro, valorParametro : valor
                }
			}).then(function mySuccess(response) {
			    var lista = JSON.parse(response.data);
			    $scope.resultadosExpList = utilities.formatearFecha(lista);
			}, function myError(response) {
			    console.log(response.statusText);
			});
		}
	};

	BuscarExpPorParametrosTipo2 = (nombreParametro)=>{
		if($scope.tipo_fecha2 == "fecha_especifica") {
			if($scope.fecha_dia2 != null) {
				var fechaValidada = utilities.validarFecha($scope.fecha_dia2);
				$http({
			        method : "POST",
			        url : $scope.serverUrl + "/buscar/expedientes/parametros2/conFecha",
			        data : {parametroBusqueda : nombreParametro, fecha : fechaValidada
                	}
			    }).then(function mySuccess(response) {
			    	var lista = JSON.parse(response.data);
			       	$scope.resultadosExpList = utilities.formatearFecha(lista);
			    }, function myError(response) {
			       	console.log(response.statusText);
			   	});
			}else{
				window.alert("Por favor seleccione la fecha para realizar la busqueda");
			}
		}else if($scope.tipo_fecha2 == "fecha_rango") {
			if($scope.fecha_inicio2 != null) {
				var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio2);
				if($scope.fecha_fin2 != null) {
					var fechaFinValidada = utilities.validarFecha($scope.fecha_fin2);
					$http({
				        method : "POST",
				       	url : $scope.serverUrl + "/buscar/expedientes/parametros2/conFecha",
				       	data : {parametroBusqueda : nombreParametro, fechaInicio : fechaInicioValidada, 
				        	fechaFin : fechaFinValidada
                		}
				    }).then(function mySuccess(response) {
				   		var lista = JSON.parse(response.data);
				       	$scope.resultadosExpList = utilities.formatearFecha(lista);
				   	}, function myError(response) {
				       	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
				}

			}else{
				window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
			}
		}
	};

	ValidarRegistroOpn = ()=> {
		switch($scope.parametro_busqueda) {
			case  "numExpediente":
				if($scope.buscar_input.length != ""){
					BuscarOpnPorParametrosTipo1("numExpediente", $scope.buscar_input);
				}
				break;
			case  "apoderadoLegal":
				if($scope.buscar_input.length != ""){
					BuscarOpnPorParametrosTipo1("apoderadoLegal", $scope.buscar_input);
				}
				break;
			case  "procedencia":
				if($scope.procedencia_select != null){
					BuscarOpnPorParametrosTipo1("procedencia", $scope.procedencia_select.idDependencia);
				}
				break;
			case  "empleadoReceptor":
				if($scope.empleado_receptor_select != null){
					BuscarOpnPorParametrosTipo1("empleadoReceptor", $scope.empleado_receptor_select.numEmpleado);
				}
				break;
			case  "asunto":
				if($scope.asunto_select != null){
					BuscarOpnPorParametrosTipo1("asunto", $scope.buscar_input);
				}
				break;
			case  "abogadoAsignado":
				if($scope.abogado_asignado_select != null){
					BuscarOpnPorParametrosTipo1("abogadoAsignado", $scope.abogado_asignado_select.numEmpleado);
				}
				break;
			case  "estadoExpediente":
				if($scope.estado_expediente_select != null){
					BuscarOpnPorParametrosTipo1("estadoExpediente", $scope.estado_expediente_select.idEstadoExpediente );
				}
				break;
			case  "fechaEntrada":
				BuscarOpnPorParametrosTipo2("fechaEntrada");
				break;
			case  "fechaAsignacion":
				BuscarOpnPorParametrosTipo2("fechaAsignacion");
				break;
			case  "fechaDescargo":
				BuscarOpnPorParametrosTipo2("fechaDescargo");
				break;
			case  "fechaRemision":
				BuscarOpnPorParametrosTipo2("fechaRemision");
				break;
			default:
				window.alert("Por favor seleccione un parametro de busqueda");
		}

	};

	BuscarOpnPorParametrosTipo1 = (nombreParametro, valor)=>{
		if($scope.usar_fechas) {
			if($scope.tipo_fecha1 == "fecha_especifica") {
				if($scope.fecha_dia1 != null) {
					var fechaValidada = utilities.validarFecha($scope.fecha_dia1);
					$http({
			        	method : "POST",
			        	url : $scope.serverUrl + "/buscar/opiniones/parametros1/conFecha",
			        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
			        		fecha : fechaValidada
                		}
			    	}).then(function mySuccess(response) {
			    		var lista = JSON.parse(response.data);
			        	$scope.resultadosOpnList = utilities.formatearFecha(lista);
			    	}, function myError(response) {
			        	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha para realizar la busqueda");
				}

			}else if($scope.tipo_fecha1 == "fecha_rango") {
				if($scope.fecha_inicio1 != null) {
					var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio1);
					if($scope.fecha_fin1 != null) {
						var fechaFinValidada = utilities.validarFecha($scope.fecha_fin1);
						$http({
				        	method : "POST",
				        	url : $scope.serverUrl + "/buscar/opiniones/parametros1/conFecha",
				        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
				        		fechaInicio : fechaInicioValidada, fechaFin : fechaFinValidada
                			}
				    	}).then(function mySuccess(response) {
				    		var lista = JSON.parse(response.data);
				        	$scope.resultadosOpnList = utilities.formatearFecha(lista);
				    	}, function myError(response) {
				        	console.log(response.statusText);
				    	});
					}else{
						window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
					}

				}else{
					window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
				}
			}
		}else {
			$http({
			    method : "POST",
			   	url : $scope.serverUrl + "/buscar/opiniones/parametros1/sinFecha",
			   	data : {parametroBusqueda : nombreParametro, valorParametro : valor
                }
			}).then(function mySuccess(response) {
			    var lista = JSON.parse(response.data);
			    $scope.resultadosOpnList = utilities.formatearFecha(lista);
			}, function myError(response) {
			    console.log(response.statusText);
			});
		}
	};

	BuscarOpnPorParametrosTipo2 = (nombreParametro)=>{
		if($scope.tipo_fecha2 == "fecha_especifica") {
			if($scope.fecha_dia2 != null) {
				var fechaValidada = utilities.validarFecha($scope.fecha_dia2);
				$http({
			        method : "POST",
			        url : $scope.serverUrl + "/buscar/expedientes/parametros2/conFecha",
			        data : {parametroBusqueda : nombreParametro, fecha : fechaValidada
                	}
			    }).then(function mySuccess(response) {
			    	var lista = JSON.parse(response.data);
			       	$scope.resultadosOpnList = utilities.formatearFecha(lista);
			    }, function myError(response) {
			       	console.log(response.statusText);
			   	});
			}else{
				window.alert("Por favor seleccione la fecha para realizar la busqueda");
			}
		}else if($scope.tipo_fecha2 == "fecha_rango") {
			if($scope.fecha_inicio2 != null) {
				var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio2);
				if($scope.fecha_fin2 != null) {
					var fechaFinValidada = utilities.validarFecha($scope.fecha_fin2);
					$http({
				        method : "POST",
				       	url : $scope.serverUrl + "/buscar/expedientes/parametros2/conFecha",
				       	data : {parametroBusqueda : nombreParametro, fechaInicio : fechaInicioValidada, 
				        	fechaFin : fechaFinValidada
                		}
				    }).then(function mySuccess(response) {
				   		var lista = JSON.parse(response.data);
				       	$scope.resultadosOpnList = utilities.formatearFecha(lista);
				   	}, function myError(response) {
				       	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
				}

			}else{
				window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
			}
		}
	};


	ValidarRegistroPtt = ()=> {
		switch($scope.parametro_busqueda) {
			case  "numExpediente":
				if($scope.buscar_input.length != ""){
					BuscarPttPorParametrosTipo1("numExpediente", $scope.buscar_input);
				}
				break;
			case  "comunidad":
				if($scope.buscar_input.length != ""){
					BuscarPttPorParametrosTipo1("comunidad", $scope.buscar_input);
				}
				break;
			case  "interesado":
				if($scope.buscar_input.length != ""){
					BuscarPttPorParametrosTipo1("interesado", $scope.buscar_input);
				}
				break;
			case  "apoderadoLegal":
				if($scope.buscar_input.length != ""){
					BuscarPttPorParametrosTipo1("apoderadoLegal", $scope.buscar_input);
				}
				break;
			case  "procedencia":
				if($scope.procedencia_select != null){
					BuscarPttPorParametrosTipo1("procedencia", $scope.procedencia_select.idDependencia);
				}
				break;
			case  "empleadoReceptor":
				if($scope.empleado_receptor_select != null){
					BuscarPttPorParametrosTipo1("empleadoReceptor", $scope.empleado_receptor_select.numEmpleado);
				}
				break;
			case  "asunto":
				if($scope.asunto_patronato_select != null){
					BuscarPttPorParametrosTipo1("asunto", $scope.asunto_patronato_select.idAsuntoPatronato);
				}
				break;
			case  "tipoComunidad":
				if($scope.tipo_comunidad_select != null){
					BuscarPttPorParametrosTipo1("tipoComunidad", $scope.tipo_comunidad_select.idTipoComunidad);
				}
				break;
			case  "abogadoAsignado":
				if($scope.abogado_asignado_select != null){
					BuscarPttPorParametrosTipo1("abogadoAsignado", $scope.abogado_asignado_select.numEmpleado);
				}
				break;
			case  "dependenciaRemision":
				if($scope.dependencia_remision_select != null){
					BuscarPttPorParametrosTipo1("dependenciaRemision", $scope.dependencia_remision_select.idDependencia);
				}
				break;
			case  "estadoExpediente":
				if($scope.estado_expediente_select != null){
					BuscarPttPorParametrosTipo1("estadoExpediente", $scope.estado_expediente_select.idEstadoExpediente );
				}
				break;
			case  "fechaEntrada":
				BuscarPttPorParametrosTipo2("fechaEntrada");
				break;
			case  "fechaAsignacion":
				BuscarPttPorParametrosTipo2("fechaAsignacion");
				break;
			case  "fechaDescargo":
				BuscarPttPorParametrosTipo2("fechaDescargo");
				break;
			case  "fechaRemision":
				BuscarPttPorParametrosTipo2("fechaRemision");
				break;
			default:
				window.alert("Por favor seleccione un parametro de busqueda");
		}

	};

	BuscarPttPorParametrosTipo1 = (nombreParametro, valor)=>{
		if($scope.usar_fechas) {
			if($scope.tipo_fecha1 == "fecha_especifica") {
				if($scope.fecha_dia1 != null) {
					var fechaValidada = utilities.validarFecha($scope.fecha_dia1);
					$http({
			        	method : "POST",
			        	url : $scope.serverUrl + "/buscar/patronatos/parametros1/conFecha",
			        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
			        		fecha : fechaValidada
                		}
			    	}).then(function mySuccess(response) {
			    		var lista = JSON.parse(response.data);
			        	$scope.resultadosPttList = utilities.formatearFecha(lista);
			    	}, function myError(response) {
			        	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha para realizar la busqueda");
				}

			}else if($scope.tipo_fecha1 == "fecha_rango") {
				if($scope.fecha_inicio1 != null) {
					var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio1);
					if($scope.fecha_fin1 != null) {
						var fechaFinValidada = utilities.validarFecha($scope.fecha_fin1);
						$http({
				        	method : "POST",
				        	url : $scope.serverUrl + "/buscar/patronatos/parametros1/conFecha",
				        	data : {parametroBusqueda : nombreParametro, valorParametro : valor, 
				        		fechaInicio : fechaInicioValidada, fechaFin : fechaFinValidada
                			}
				    	}).then(function mySuccess(response) {
				    		var lista = JSON.parse(response.data);
				        	$scope.resultadosPttList = utilities.formatearFecha(lista);
				    	}, function myError(response) {
				        	console.log(response.statusText);
				    	});
					}else{
						window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
					}

				}else{
					window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
				}
			}
		}else {
			$http({
			    method : "POST",
			   	url : $scope.serverUrl + "/buscar/patronatos/parametros1/sinFecha",
			   	data : {parametroBusqueda : nombreParametro, valorParametro : valor
                }
			}).then(function mySuccess(response) {
			    var lista = JSON.parse(response.data);
			    $scope.resultadosPttList = utilities.formatearFecha(lista);
			}, function myError(response) {
			    console.log(response.statusText);
			});
		}
	};

	BuscarPttPorParametrosTipo2 = (nombreParametro)=>{
		if($scope.tipo_fecha2 == "fecha_especifica") {
			if($scope.fecha_dia2 != null) {
				var fechaValidada = utilities.validarFecha($scope.fecha_dia2);
				$http({
			        method : "POST",
			        url : $scope.serverUrl + "/buscar/patronatos/parametros2/conFecha",
			        data : {parametroBusqueda : nombreParametro, fecha : fechaValidada

                	}
			    }).then(function mySuccess(response) {
			    	var lista = JSON.parse(response.data);
			       	$scope.resultadosPttList = utilities.formatearFecha(lista);
			    }, function myError(response) {
			       	console.log(response.statusText);
			   	});
			}else{
				window.alert("Por favor seleccione la fecha para realizar la busqueda");
			}
		}else if($scope.tipo_fecha2 == "fecha_rango") {
			if($scope.fecha_inicio2 != null) {
				var fechaInicioValidada = utilities.validarFecha($scope.fecha_inicio2);
				if($scope.fecha_fin2 != null) {
					var fechaFinValidada = utilities.validarFecha($scope.fecha_fin2);
					$http({
				        method : "POST",
				       	url : $scope.serverUrl + "/buscar/patronatos/parametros2/conFecha",
				       	data : {parametroBusqueda : nombreParametro, fechaInicio : fechaInicioValidada, 
				        	fechaFin : fechaFinValidada
                		}
				    }).then(function mySuccess(response) {
				   		var lista = JSON.parse(response.data);
				       	$scope.resultadosPttList = utilities.formatearFecha(lista);
				   	}, function myError(response) {
				       	console.log(response.statusText);
			    	});
				}else{
					window.alert("Por favor seleccione la fecha de finalización para realizar la busqueda");
				}

			}else{
				window.alert("Por favor seleccione la fecha de inicio para realizar la busqueda");
			}
		}
	};


	$scope.verDetalles = (idFicha)=> {
		switch($scope.tipo_busqueda_select) {
			case  "exp":
				var newUrl = "detalles/detalle_expediente.html?idFicha=" + idFicha;
				$window.open(newUrl, "_blank");
				break;
			case  "opn":
				var newUrl = "detalles/detalle_opinion.html?idFicha=" + idFicha;
				$window.open(newUrl, "_blank");
				break;
			case  "ptt":
				var newUrl = "detalles/detalle_patronato.html?idFicha=" + idFicha;
				$window.open(newUrl, "_blank");
				break;
		}
	};

});
