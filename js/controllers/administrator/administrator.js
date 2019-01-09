/***********************Hecho por Shirley Claudette Martínez***********************/
app.service("utilities", function() {
	this.eliminateSpace = (str)=> {
    	return str.replace(/\s+/g, "");
    };
});

app.controller("administratorCtrl", function($scope, $http, utilities, urlUtility) {
	$scope.serverUrl = urlUtility.getServerUrl();
	$scope.tipo_ficha_select = "exp";
	$scope.parametro_admin = "fichas";
	$scope.buscar_ficha_input = "";

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
        	url : $scope.serverUrl + "/populate/select/asunto"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.asuntoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


	$http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/empleado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.empleadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


    $http({
        	method : "POST",
        	url : $scope.serverUrl + "/populate/select/cargoEmpleado"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.cargoEmpleadoList = lista;
    	}, function myError(response) {
        	console.log(response.statusText);
    });


    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/comunidad"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.comunidadList = lista;
        }, function myError(response) {
            console.log(response.statusText);
    });

        
     $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/select/municipio"
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            $scope.municipioList = lista;
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
    	if($scope.procedencia_select != null){
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
    	if($scope.procedencia_select != null){
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
	    	document.getElementById('aceptButton').setAttribute('onclick', 'angular.element(this).scope().Eliminarasunto()');
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
		        $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
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
		        $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
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
		    $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
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
		    $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
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
		    $scope.modalFeedback = response.statusText + ": La acción no se pudo completar debido a un fallo en el sistema";
    		document.getElementById('myFeedbackModal').style.display = "flex";
		});
    };

});
