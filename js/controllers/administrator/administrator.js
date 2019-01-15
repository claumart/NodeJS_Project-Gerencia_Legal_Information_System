/***********************Hecho por Shirley Claudette Martínez***********************/
app.service("utilities", function() {
	this.eliminateSpace = (str)=> {
    	return str.replace(/\s+/g, "");
    };

    this.eliminateMultipleSpaces = (str)=> {
      return str.replace(/\s{2,}/g, " ");
    };

	this.firstWordLetterToUpperCase = (str)=> {
		var arr = str.split(" ");
	  	var finalString = "";
	  	for(let i = 0; i<arr.length;i++){
	  		if(i==0){
	    		finalString += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	    	}else{
	    		finalString += " " + arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	    	}
	  	}
	  	return finalString;
	};
});

app.controller("administratorCtrl", function($scope, $http, utilities, urlUtility) {
	$scope.serverUrl = urlUtility.getServerUrl();
	$scope.tipo_ficha_select = "exp";
	$scope.parametro_admin = "fichas";
	$scope.buscar_ficha_input = "";
	$scope.nueva_dependencia_input = "";
	$scope.dependencia_input = "";
	$scope.nuevo_asunto_input = "";
	$scope.asunto_input = "";
	$scope.nuevo_empleado_input = "";
	$scope.empleado_input = "";
	$scope.activo1 = "";
	$scope.activo2 = "";
	$scope.nuevo_cargo_input = "";
	$scope.cargo_input = "";

	PopularDependencias = ()=>{
		$http({
	    	method : "POST",
	    	url : $scope.serverUrl + "/populate/select/dependencia"
	    }).then(function mySuccess(response) {
			var lista = JSON.parse(response.data);
	        $scope.dependenciaList = lista;
	    }, function myError(response) {
	    	console.log(response.statusText);
	    });
	};

	PopularAsuntos = ()=>{
	    $http({
	        method : "POST",
	       	url : $scope.serverUrl + "/populate/select/asunto"
	    }).then(function mySuccess(response) {
	    	var lista = JSON.parse(response.data);
	        $scope.asuntoList = lista;
	    }, function myError(response) {
	        console.log(response.statusText);
	    });
	};

	PopularEmpleados = ()=>{
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/empleado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.empleadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

	PopularCargosEmpleado = ()=>{
    	$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/cargoEmpleado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.cargoEmpleadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

	PopularCargosEmpleadoSinAbogado = ()=>{
    	$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/cargoEmpleado/sinAbogado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.cargoEmpleadoSinAbogadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

	PopularComunidades = ()=>{
    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/comunidad"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.comunidadList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });
	};
        
    PopularMunicipios = ()=>{
     	$http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/municipio"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.municipioList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    	});
	};

	PopularTiposComunidad = ()=>{
    	$http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/tipoComunidad"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.tipoComunidadList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    	});
    };

    PopularDependencias();
    PopularAsuntos();
    PopularEmpleados();
    PopularCargosEmpleado();
    PopularCargosEmpleadoSinAbogado();
    PopularComunidades();
    PopularMunicipios();
    PopularTiposComunidad();

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $scope.closeFeedbackModal = ()=> {
        document.getElementById('myFeedbackModal').style.display = "none";
    };

    $scope.AbrirModalEliminarFicha = (idFicha)=> {
    	$scope.modalMessage = "¿Está seguro que desea eliminar la ficha seleccionada?. " +
    	"Si se elimina la ficha seleccionada tambien se eliminará el dictamen relacionado a ella";
    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarFicha('+ idFicha +')');
    	document.getElementById('myModal').style.display = "flex";
    };

    $scope.AbrirModalEliminarDependencia = ()=> {
    	if($scope.dependencia_select != null){
    		$scope.modalMessage = "¿Está seguro que desea eliminar la dependencia seleccionada?. " + 
	    	"Si la dependencia está siendo utilizada para algún registro, esta no se eliminará";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarDependencia()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione una dependencia para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalModificarDependencia = ()=> {
    	if($scope.dependencia_select != null){
	    	$scope.modalMessage = "¿Está seguro que desea realizar los cambios a la dependencia seleccionada?";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().ModificarDependencia()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione una dependencia para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalEliminarAsunto = ()=> {
    	if($scope.asunto_select != null){
    		$scope.modalMessage = "¿Está seguro que desea eliminar el asunto seleccionado?. " + 
	    	"Si el asunto está siendo utilizado para algún registro, este no se eliminará";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarAsunto()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un asunto para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalModificarAsunto = ()=> {
    	if($scope.asunto_select != null){
	    	$scope.modalMessage = "¿Está seguro que desea realizar los cambios al asunto seleccionado?";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().ModificarAsunto()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un asunto para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalEliminarEmpleado = ()=> {
    	if($scope.empleado_select != null){
	    	$scope.modalMessage = "¿Está seguro que desea eliminar el empleado seleccionado?. " + 
	    	"Si el empleado está siendo utilizado para algún registro, este no se eliminará";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarEmpleado()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un empleado para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalModificarEmpleado = ()=> {
    	if($scope.empleado_select != null){
	    	$scope.modalMessage = "¿Está seguro que desea realizar los cambios al empleado seleccionado?";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().ModificarEmpleado()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un empleado para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalEliminarCargoEmpleado = ()=> {
    	if($scope.cargo_empleado_select != null){
    		$scope.modalMessage = "¿Está seguro que desea eliminar el cargo de empleado seleccionado?. " + 
	    	"Si el cargo está siendo utilizado para algún registro, este no se eliminará";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarCargoEmpleado()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un cargo para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalModificarCargoEmpleado = ()=> {
    	if($scope.cargo_empleado_select != null){
    		$scope.modalMessage = "¿Está seguro que desea realizar los cambios al cargo de empleado seleccionado?";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().ModificarCargoEmpleado()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione un cargo para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalEliminarComunidad = ()=> {
    	if($scope.comunidad_select != null){
    		$scope.modalMessage = "¿Está seguro que desea eliminar la ficha seleccionada?. " + 
	    	"Si la comunidad está siendo utilizada para algún registro, esta no se eliminará";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().EliminarComunidad()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione una comunidad para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.AbrirModalModificarComunidad = ()=> {
    	if($scope.comunidad_select != null){
    		$scope.modalMessage = "¿Está seguro que desea realizar los cambios a la comunidad seleccionada?";
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().ModificarComunidad()');
	    	document.getElementById('myModal').style.display = "flex";
    	}else{
    		$scope.modalFeedback = "Seleccione una comunidad para poder realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.LimpiarTablasDeFichas = ()=>{
		$scope.resultadosExpList = null;
		$scope.resultadosOpnList = null;
		$scope.resultadosPttList = null;
	}

    $scope.ValidarBusqueda = ()=> {
    	switch($scope.tipo_ficha_select) {
			case  "exp":
				BuscarExp();
				break;
			case  "opn":
				BuscarOpn();
				break;
			case  "ptt":
				BuscarPtt();
				break;
		}
    };

    BuscarExp = ()=> {
    	if($scope.buscar_ficha_input.length < 21 && $scope.buscar_ficha_input.trim().length > 0){
            var numExpValidado = utilities.eliminateSpace($scope.buscar_ficha_input.toUpperCase().trim());
        	$http({
		        method : "POST",
		        url : $scope.serverUrl + "/administrar/buscar/ficha/expediente",
		        data : {numExpediente : numExpValidado}
		    }).then(function mySuccess(response) {
		        var lista = JSON.parse(response.data);
		        $scope.resultadosExpList = lista;
		   	}, function myError(response) {
		        $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
    			document.getElementById('myFeedbackModal').style.display = "flex";
			});
        }else{
        	$scope.modalFeedback = "Por favor, escriba un número de expediente para realizar la busqueda";
    		document.getElementById('myFeedbackModal').style.display = "flex";
        }
    };

    BuscarOpn = ()=>{
    	if($scope.buscar_ficha_input.length < 21 && $scope.buscar_ficha_input.trim().length > 0){
            var numOficioValidado = utilities.eliminateSpace($scope.buscar_ficha_input.toUpperCase().trim());
        	$http({
		        method : "POST",
		        url : $scope.serverUrl + "/administrar/buscar/ficha/opinion",
		        data : {numOficio : numOficioValidado}
		    }).then(function mySuccess(response) {
		        var lista = JSON.parse(response.data);
		        $scope.resultadosOpnList = lista;
		   	}, function myError(response) {
		        $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
    			document.getElementById('myFeedbackModal').style.display = "flex";
			});
        }else{
        	$scope.modalFeedback = "Por favor, escriba un número de oficio para realizar la busqueda";
    		document.getElementById('myFeedbackModal').style.display = "flex";
        }
    };

    BuscarPtt = ()=> {
    	if($scope.buscar_ficha_input.length < 21 && $scope.buscar_ficha_input.trim().length > 0){
            var numExpValidado = utilities.eliminateSpace($scope.buscar_ficha_input.toUpperCase().trim());
        	$http({
		        method : "POST",
		        url : $scope.serverUrl + "/administrar/buscar/ficha/patronato",
		        data : {numExpediente : numExpValidado}
		    }).then(function mySuccess(response) {
		        var lista = JSON.parse(response.data);
		        $scope.resultadosPttList = lista;
		   	}, function myError(response) {
		        console.log(response.statusText);
		        $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
    			document.getElementById('myFeedbackModal').style.display = "flex";
			});
        }else{
        	$scope.modalFeedback = "Por favor, escriba un número de expediente para realizar la busqueda";
    		document.getElementById('myFeedbackModal').style.display = "flex";
        }
    };

    $scope.EliminarFicha = (idFicha)=> {
    	switch($scope.tipo_ficha_select) {
			case  "exp":
				EliminarExp(idFicha);
				break;
			case  "opn":
				EliminarOpn(idFicha);
				break;
			case  "ptt":
				EliminarPtt(idFicha);
				break;
		}
    };

    EliminarExp = (idFicha)=> {
    	document.getElementById('myModal').style.display = "none";
    	$http({
		    method : "POST",
		    url : $scope.serverUrl + "/administrar/eliminar/ficha/expediente",
		    data : {idFicha : idFicha}
		}).then(function mySuccess(response) {
			$scope.buscar_ficha_input = "";
		    $scope.resultadosExpList = null;
		}, function myError(response) {
		    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
    		document.getElementById('myFeedbackModal').style.display = "flex";
		});
    };

    EliminarOpn = (idFicha)=>{
    	document.getElementById('myModal').style.display = "none";
    	$http({
		    method : "POST",
		    url : $scope.serverUrl + "/administrar/eliminar/ficha/opinion",
		    data : {idFicha : idFicha}
		}).then(function mySuccess(response) {
		    $scope.buscar_ficha_input = "";
		    $scope.resultadosOpnList = null;
		}, function myError(response) {
		    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
    		document.getElementById('myFeedbackModal').style.display = "flex";
		});
    };

    EliminarPtt = (idFicha)=> {
    	document.getElementById('myModal').style.display = "none";
    	$http({
		    method : "POST",
		    url : $scope.serverUrl + "/administrar/eliminar/ficha/patronato",
		    data : {idFicha : idFicha}
		}).then(function mySuccess(response) {
		    $scope.buscar_ficha_input = "";
		    $scope.resultadosPttList = null;
		}, function myError(response) {
		    console.log(response.statusText);
		    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
    		document.getElementById('myFeedbackModal').style.display = "flex";
		});
    };

    $scope.LlenarDatosDependencia = ()=>{
    	if($scope.dependencia_select != null){
    		$scope.dependencia_input = $scope.dependencia_select.nombreDependencia;
    	}
    };

    $scope.RegistrarDependencia = ()=>{
    	if($scope.nueva_dependencia_input.length < 71 && $scope.nueva_dependencia_input.trim().length > 0){
    		var dependenciaValidada = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nueva_dependencia_input).trim());
    		$http({
			    method : "POST",
			    url : $scope.serverUrl + "/administrar/registrar/dependencia",
			    data : {nombreDependencia : dependenciaValidada}
			}).then(function mySuccess(response) {
			    $scope.nueva_dependencia_input = "";
			    PopularDependencias();
			}, function myError(response) {
			    console.log(response.statusText);
			    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
	    		document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "El campo Nombre de la Dependencia es muy largo o está vacío";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.EliminarDependencia = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.dependencia_select != null){
    		$http({
				method : "POST",
				url : $scope.serverUrl + "/administrar/eliminar/dependencia",
				data : {idDependencia : $scope.dependencia_select.idDependencia}
			}).then(function mySuccess(response) {
				$scope.dependencia_input = "";
				$scope.dependencia_select = null;
				$scope.modalFeedback = response.data.message;
    			document.getElementById('myFeedbackModal').style.display = "flex";
				PopularDependencias();
			}, function myError(response) {
				console.log(response.statusText);
				$scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    	document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "Seleccione una dependencia para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.ModificarDependencia = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.dependencia_select != null){
    		if($scope.dependencia_input.length < 71 && $scope.dependencia_input.trim().length > 0){
    			var dependenciaValidada = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.dependencia_input).trim());
    			$http({
				    method : "POST",
				    url : $scope.serverUrl + "/administrar/modificar/dependencia",
				    data : {nombreDependencia : dependenciaValidada, 
				    	idDependencia : $scope.dependencia_select.idDependencia}
				}).then(function mySuccess(response) {
				    $scope.dependencia_input = "";
				    $scope.dependencia_select = null;
				    PopularDependencias();
				}, function myError(response) {
				    console.log(response.statusText);
				    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    		document.getElementById('myFeedbackModal').style.display = "flex";
				});
    		}else{
    			$scope.modalFeedback = "El campo Nombre de la Dependencia es muy largo o está vacío";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "Seleccione una dependencia para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.LlenarDatosAsunto = ()=>{
    	if($scope.asunto_select != null){
    		$scope.asunto_input = $scope.asunto_select.nombreAsunto;
    	}
    };

    $scope.RegistrarAsunto = ()=>{
    	if($scope.nuevo_asunto_input.length < 46 && $scope.nuevo_asunto_input.trim().length > 0){
    		var asuntoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nuevo_asunto_input).trim());
    		$http({
			    method : "POST",
			    url : $scope.serverUrl + "/administrar/registrar/asunto",
			    data : {nombreAsunto : asuntoValidado}
			}).then(function mySuccess(response) {
			    $scope.nuevo_asunto_input = "";
			    PopularAsuntos();
			}, function myError(response) {
			    console.log(response.statusText);
			    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
	    		document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "El campo Nombre del Asunto es muy largo o está vacío";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.EliminarAsunto = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.asunto_select != null){
    		$http({
				method : "POST",
				url : $scope.serverUrl + "/administrar/eliminar/asunto",
				data : {idAsunto : $scope.asunto_select.idAsunto}
			}).then(function mySuccess(response) {
				$scope.asunto_input = "";
				$scope.asunto_select = null;
				$scope.modalFeedback = response.data.message;
    			document.getElementById('myFeedbackModal').style.display = "flex";
				PopularAsuntos();
			}, function myError(response) {
				console.log(response.statusText);
				$scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    	document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "Seleccione un asunto para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.ModificarAsunto = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.asunto_select != null){
    		if($scope.asunto_input.length < 46 && $scope.asunto_input.trim().length > 0){
    			var asuntoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.asunto_input).trim());
    			$http({
				    method : "POST",
				    url : $scope.serverUrl + "/administrar/modificar/asunto",
				    data : {nombreAsunto : asuntoValidado, 
				    	idAsunto : $scope.asunto_select.idAsunto}
				}).then(function mySuccess(response) {
				    $scope.asunto_input = "";
				    $scope.asunto_select = null;
				    PopularAsuntos();
				}, function myError(response) {
				    console.log(response.statusText);
				    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    		document.getElementById('myFeedbackModal').style.display = "flex";
				});
    		}else{
    			$scope.modalFeedback = "El campo Nombre del Asunto es muy largo o está vacío";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "Seleccione un asunto para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.LlenarDatosEmpleado = ()=>{
    	if($scope.empleado_select != null){
    		$scope.empleado_input = $scope.empleado_select.nombreEmpleado;
    		for(let i = 0; i<$scope.cargoEmpleadoList.length; i++){
                if($scope.empleado_select.idCargo == $scope.cargoEmpleadoList[i].idCargoEmpleado){
                    $scope.actual_cargo_empleado_select = $scope.cargoEmpleadoList[i];
                    break;
                }
            }
            $scope.activo2 = $scope.empleado_select.activo.toString();
    	}
    };

    $scope.RegistrarEmpleado = ()=>{
    	if($scope.nuevo_empleado_input.length < 61 && $scope.nuevo_empleado_input.trim().length > 0){
    		var empleadoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nuevo_empleado_input).trim());
    		if($scope.nuevo_cargo_empleado_select != null){
    			if($scope.activo1 != "" && $scope.activo1 != null){
    				$http({
					    method : "POST",
					    url : $scope.serverUrl + "/administrar/registrar/empleado",
					    data : {nombreEmpleado : empleadoValidado, 
					    	idCargo : $scope.nuevo_cargo_empleado_select.idCargoEmpleado, 
					    	activo : parseInt($scope.activo1, 10)}
					}).then(function mySuccess(response) {
					    $scope.nuevo_empleado_input = "";
					    $scope.nuevo_cargo_empleado_select = null;
					    $scope.activo1 = "";
					    PopularEmpleados();
					}, function myError(response) {
					    console.log(response.statusText);
					    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
			    		document.getElementById('myFeedbackModal').style.display = "flex";
					});
    			}else{
    				$scope.modalFeedback = "Por favor seleccione el estado de actividad del empleado";
    				document.getElementById('myFeedbackModal').style.display = "flex";
    			}
    		}else{
    			$scope.modalFeedback = "Por favor seleccione un puesto de empleado";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "El campo Nombre del Empleado es muy largo o está vacío";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.EliminarEmpleado = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.empleado_select != null){
    		$http({
				method : "POST",
				url : $scope.serverUrl + "/administrar/eliminar/empleado",
				data : {numEmpleado : $scope.empleado_select.numEmpleado}
			}).then(function mySuccess(response) {
				$scope.empleado_input = "";
				$scope.actual_cargo_empleado_select = null;
				$scope.activo2 = "";
				$scope.empleado_select = null;
				$scope.modalFeedback = response.data.message;
    			document.getElementById('myFeedbackModal').style.display = "flex";
				PopularEmpleados();
			}, function myError(response) {
				console.log(response.statusText);
				$scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    	document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "Seleccione un empleado para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.ModificarEmpleado = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.empleado_select != null){
    		if($scope.empleado_input.length < 61 && $scope.empleado_input.trim().length > 0){
    			var empleadoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.empleado_input).trim());
    			if($scope.actual_cargo_empleado_select != null){
    				if($scope.activo2 != "" && $scope.activo2 != null){
		    			$http({
						    method : "POST",
						    url : $scope.serverUrl + "/administrar/modificar/empleado",
						    data : {nombreEmpleado : empleadoValidado, 
					    	idCargo : $scope.actual_cargo_empleado_select.idCargoEmpleado, 
					    	activo : parseInt($scope.activo2, 10), numEmpleado : $scope.empleado_select.numEmpleado}
						}).then(function mySuccess(response) {
						    $scope.empleado_input = "";
							$scope.actual_cargo_empleado_select = null;
							$scope.activo2 = "";
							$scope.empleado_select = null;
						    PopularEmpleados();
						}, function myError(response) {
						    console.log(response.statusText);
						    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
				    		document.getElementById('myFeedbackModal').style.display = "flex";
						});
					}else{
	    				$scope.modalFeedback = "Por favor seleccione el estado de actividad del empleado";
	    				document.getElementById('myFeedbackModal').style.display = "flex";
	    			}
	    		}else{
	    			$scope.modalFeedback = "Por favor seleccione un puesto de empleado";
	    			document.getElementById('myFeedbackModal').style.display = "flex";
	    		}
    		}else{
    			$scope.modalFeedback = "El campo Nombre del Empleado es muy largo o está vacío";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "Seleccione un empleado para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.LlenarDatosCargoEmpleado = ()=>{
    	if($scope.cargo_empleado_select != null){
    		$scope.cargo_input = $scope.cargo_empleado_select.nombreCargoEmpleado;
    	}
    };

    $scope.RegistrarCargoEmpleado = ()=>{
    	if($scope.nuevo_cargo_input.length < 46 && $scope.nuevo_cargo_input.trim().length > 0){
    		var cargoEmpleadoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nuevo_cargo_input).trim());
    		$http({
			    method : "POST",
			    url : $scope.serverUrl + "/administrar/registrar/cargoEmpleado",
			    data : {nombreCargoEmpleado : cargoEmpleadoValidado}
			}).then(function mySuccess(response) {
			    $scope.nuevo_cargo_input = "";
			    PopularCargosEmpleadoSinAbogado();
			}, function myError(response) {
			    console.log(response.statusText);
			    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
	    		document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "El campo Nombre del Puesto es muy largo o está vacío";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.EliminarCargoEmpleado = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.cargo_empleado_select != null){
    		$http({
				method : "POST",
				url : $scope.serverUrl + "/administrar/eliminar/cargoEmpleado",
				data : {idCargoEmpleado : $scope.cargo_empleado_select.idCargoEmpleado}
			}).then(function mySuccess(response) {
				$scope.cargo_input = "";
				$scope.cargo_empleado_select = null;
				$scope.modalFeedback = response.data.message;
    			document.getElementById('myFeedbackModal').style.display = "flex";
				PopularCargosEmpleadoSinAbogado();
			}, function myError(response) {
				console.log(response.statusText);
				$scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    	document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "Seleccione un cargo de empleado para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.ModificarCargoEmpleado = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.cargo_empleado_select != null){
    		if($scope.cargo_input.length < 46 && $scope.cargo_input.trim().length > 0){
    			var cargoEmpleadoValidado = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.cargo_input).trim());
    			$http({
				    method : "POST",
				    url : $scope.serverUrl + "/administrar/modificar/cargoEmpleado",
				    data : {nombreCargoEmpleado : cargoEmpleadoValidado, 
				    	idCargoEmpleado : $scope.cargo_empleado_select.idCargoEmpleado}
				}).then(function mySuccess(response) {
				    $scope.cargo_input = "";
				    $scope.cargo_empleado_select = null;
				    PopularCargosEmpleadoSinAbogado();
				}, function myError(response) {
				    console.log(response.statusText);
				    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    		document.getElementById('myFeedbackModal').style.display = "flex";
				});
    		}else{
    			$scope.modalFeedback = "El campo Nombre del Puesto es muy largo o está vacío";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "Seleccione un cargo de empleado para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.LlenarDatosComunidad = ()=>{
    	if($scope.comunidad_select != null){
    		$scope.nombre_comunidad_input = $scope.comunidad_select.nombreComunidad;
    		for(let i = 0; i<$scope.municipioList.length; i++){
                if($scope.comunidad_select.idMunicipio == $scope.municipioList[i].idMunicipio){
                    $scope.municipio_select = $scope.municipioList[i];
                    break;
                }
            }
            for(let i = 0; i<$scope.tipoComunidadList.length; i++){
                if($scope.comunidad_select.idTipoComunidad == $scope.tipoComunidadList[i].idTipoComunidad){
                    $scope.tipo_comunidad_select = $scope.tipoComunidadList[i];
                    break;
                }
            }
    	}
    };

    $scope.EliminarComunidad = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.comunidad_select != null){
    		$http({
				method : "POST",
				url : $scope.serverUrl + "/administrar/eliminar/comunidad",
				data : {idComunidad : $scope.comunidad_select.idComunidad}
			}).then(function mySuccess(response) {
				$scope.nombre_comunidad_input = "";
				$scope.municipio_select = null;
				$scope.tipo_comunidad_select = null;
				$scope.comunidad_select = null;
				$scope.modalFeedback = response.data.message;
    			document.getElementById('myFeedbackModal').style.display = "flex";
				PopularComunidades();
			}, function myError(response) {
				console.log(response.statusText);
				$scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
		    	document.getElementById('myFeedbackModal').style.display = "flex";
			});
    	}else{
    		$scope.modalFeedback = "Seleccione una comunidad para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

    $scope.ModificarComunidad = ()=>{
    	document.getElementById('myModal').style.display = "none";
    	if($scope.comunidad_select != null){
    		if($scope.nombre_comunidad_input.length < 46 && $scope.nombre_comunidad_input.trim().length > 0){
    			var comunidadValidada = utilities.firstWordLetterToUpperCase(utilities.eliminateMultipleSpaces($scope.nombre_comunidad_input).trim());
    			if($scope.municipio_select != null){
    				if($scope.tipo_comunidad_select != null){
		    			$http({
						    method : "POST",
						    url : $scope.serverUrl + "/administrar/modificar/comunidad",
						    data : {nombreComunidad : comunidadValidada, 
					    	idMunicipio : $scope.municipio_select.idMunicipio, 
					    	idTipoComunidad : $scope.tipo_comunidad_select.idTipoComunidad, idComunidad : $scope.comunidad_select.idComunidad}
						}).then(function mySuccess(response) {
						    $scope.nombre_comunidad_input = "";
							$scope.municipio_select = null;
							$scope.tipo_comunidad_select = null;
							$scope.comunidad_select = null;
							PopularComunidades();
						}, function myError(response) {
						    console.log(response.statusText);
						    $scope.modalFeedback = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
				    		document.getElementById('myFeedbackModal').style.display = "flex";
						});
					}else{
	    				$scope.modalFeedback = "Por favor seleccione un tipo de comunidad";
	    				document.getElementById('myFeedbackModal').style.display = "flex";
	    			}
	    		}else{
	    			$scope.modalFeedback = "Por favor seleccione un municipio";
	    			document.getElementById('myFeedbackModal').style.display = "flex";
	    		}
    		}else{
    			$scope.modalFeedback = "El campo Nombre de la Comunidad es muy largo o está vacío";
    			document.getElementById('myFeedbackModal').style.display = "flex";
    		}
    	}else{
    		$scope.modalFeedback = "Seleccione una comunidad para realizar una acción";
    		document.getElementById('myFeedbackModal').style.display = "flex";
    	}
    };

});
