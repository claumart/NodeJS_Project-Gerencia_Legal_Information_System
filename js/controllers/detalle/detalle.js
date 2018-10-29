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

app.controller("detailCtrl", function($scope, $http, $window, utilities, urlUtility) {
	$scope.accion = "";
    $scope.textoBoton = "";
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.slideIndex = 0;
    $scope.imagenes = [{idDictamen : 3, numeroPagina : 1, urlPagina : '/2/dic2-pag1.jpg'},
    {idDictamen : 3, numeroPagina : 2, urlPagina : '/2/dic2-pag2.jpg'},
    {idDictamen : 3, numeroPagina : 3, urlPagina : '/2/dic2-pag3.png'},
    {idDictamen : 3, numeroPagina : 2, urlPagina : '/2/img4.jpg'}];
    $scope.construirGaleria = ()=>{
        var imagesContainer = document.getElementById('imagesPreview');
        for(let i = 0; i<= $scope.imagenes.length; i++){
            if(i < 3){
                var imageBox = document.createElement('div');
                imageBox.setAttribute('class', 'column');
                var img = document.createElement('img');
                img.setAttribute('src', $scope.serverUrl + $scope.imagenes[i].urlPagina);
                img.setAttribute('class', 'hover-shadow');
                img.setAttribute('onclick', 'angular.element(this).scope().openModal('+ i +')');
                imageBox.appendChild(img);
                imagesContainer.appendChild(imageBox);
            }else{
                var moreImages =  $scope.imagenes.length - i;
                if(moreImages > 0){
                    var textoBox = document.createElement('div');
                    var divBox = document.createElement('div');
                    textoBox.setAttribute('class', 'column');
                    divBox.setAttribute('id', 'text_image_number');
                    divBox.setAttribute('onclick', 'angular.element(this).scope().openModal('+ i +')');
                    var texto = document.createElement('h4');
                    texto.innerHTML = '+ ' + moreImages;
                    divBox.appendChild(texto);
                    textoBox.appendChild(divBox);
                    imagesContainer.appendChild(textoBox);
                }
                break;
            }
        }
    };

    $scope.construirGaleria();

    // Open the Modal
    $scope.openModal = (n)=> {
        document.getElementById('myModal').style.display = "block";
        $scope.currentSlide(n);
    }

    // Close the Modal
    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    }

    // Next/previous controls
    $scope.minusSlides = ()=> {
        if($scope.slideIndex ==0) {
            $scope.showSlides($scope.slideIndex = $scope.imagenes.length -1);
        }else{
            $scope.showSlides($scope.slideIndex -= 1);
        }
    }

    $scope.plusSlides = ()=> {
        if($scope.slideIndex == $scope.imagenes.length -1) {
            $scope.showSlides($scope.slideIndex = 0);
        }else{
            $scope.showSlides($scope.slideIndex += 1);
        }
    }

    // Thumbnail image controls
    $scope.currentSlide = (n)=> {
        $scope.showSlides($scope.slideIndex = n);
    }

    $scope.showSlides = (n)=> {
        var container = document.getElementById('myContent');
        container.removeChild(document.getElementById('actualSlide'));
        var mySlideContainer = document.createElement('div');
        var imageText = document.createElement('div');
        var img = document.createElement('img');
        var imageNumber = n +1;
        mySlideContainer.setAttribute('id', 'actualSlide');
        mySlideContainer.setAttribute('class', 'mySlides');
        imageText.setAttribute('class', 'numbertext');
        imageText. innerHTML = imageNumber + '/' + $scope.imagenes.length;
        img.setAttribute('src', $scope.serverUrl + $scope.imagenes[n].urlPagina);
        //img.setAttribute('style', 'width:100%');
        mySlideContainer.appendChild(imageText);
        mySlideContainer.appendChild(img);
        container.appendChild(mySlideContainer);

    }

	$scope.mostrarExpedientesRecibidos = ()=> {
		$scope.accion = "asignar";
        $scope.textoBoton = "Asignar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/recibidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesAsignados1 = ()=> {
		$scope.accion = "descargar";
        $scope.textoBoton = "Descargar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/asignados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesDescargados = ()=> {
		$scope.accion = "revisar";
        $scope.textoBoton = "Revisar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/descargados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesRevisados = ()=> {
		$scope.accion = "remitir";
        $scope.textoBoton = "Remitir";
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/revisados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesRemitidos = ()=> {
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/remitidos"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesAsignados2 = ()=> {
		$scope.accion = "conPrevio";
        $scope.textoBoton = "Remitir Con Previo";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/asignados"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpedientesConPrevio = ()=> {
		$scope.accion = "reingresar";
        $scope.textoBoton = "Reingresar";

		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/conprevio"
    	}).then(function mySuccess(response) {
    		var lista = JSON.parse(response.data);
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});

	};

	$scope.mostrarExpediente = ()=> {
        var numExpValidado = utilities.eliminateSpace($scope.num_expediente.toUpperCase().trim());
		$http({
        	method : "POST",
        	url : $scope.serverUrl + "/seguimiento/expedientes/mostrar/expedienteParticular",
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
                    case 5:
                        $scope.accion = "compleatdo";
                        $scope.textoBoton = "Completado";
                        break;
                    case 6:
                        $scope.accion = "reingresar";
                        $scope.textoBoton = "Reingresar";
                        break;
                    default:
                        window.alert("Error del sistema en el registro del expediente");
                }
            }
        	$scope.expedientesList = utilities.formatearFecha(lista);
    	}, function myError(response) {
        	console.log(response.statusText);
    	});
	};

    $scope.darSeguimientoExpediente = (idFicha)=>{
        switch ($scope.accion) {
            case "asignar":
                var newUrl = "formularios/expedientes/ficha_de_asignacion_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "descargar":
               var newUrl = "formularios/expedientes/ficha_de_descargo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "revisar":
                var newUrl = "formularios/expedientes/ficha_de_revision_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "remitir":
                var newUrl = "formularios/expedientes/ficha_de_remision_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "conPrevio":
                var newUrl = "formularios/expedientes/ficha_de_remision_con_previo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            case "reingresar":
                var newUrl = "formularios/expedientes/ficha_de_reingreso_con_previo_expedientes.html#titulo_formulario?idFicha=" + idFicha;
                $window.location.href = newUrl;
                break;
            
        }
    };

});


