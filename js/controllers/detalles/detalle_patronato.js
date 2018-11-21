app.service("detailUtilities", function() {
	this.formatearFecha = (lista)=> {
		for(x in lista){
            if(lista[x].fechaEntrada != null && lista[x].fechaEntrada != ""){
                var d = new Date(lista[x].fechaEntrada);
                var n = d.toLocaleString();
                lista[x].fechaEntrada = n;
            }
            if(lista[x].fechaAsignacion != null && lista[x].fechaAsignacion != ""){
                var d = new Date(lista[x].fechaAsignacion);
                var n = d.toLocaleDateString();
                lista[x].fechaAsignacion = n;
            }
            if(lista[x].fechaDescargo != null && lista[x].fechaDescargo != ""){
                var d = new Date(lista[x].fechaDescargo);
                var n = d.toLocaleDateString();
                lista[x].fechaDescargo = n;  
            }
            if(lista[x].fechaRevision != null && lista[x].fechaRevision != ""){
                var d = new Date(lista[x].fechaRevision);
                var n = d.toLocaleDateString();
                lista[x].fechaRevision = n;
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

app.controller("detailCtrl", function($scope, $http, $window, utilities, urlUtility, detailUtilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.serverUrl = urlUtility.getServerUrl();
	$scope.accion = "";
    $scope.textoBoton = "";
    $scope.slideIndex = 0;
    $scope.registroPrevios = 0;
    $scope.numeroImagenes = 0;
    $scope.imagenes;

    $scope.construirGaleria = ()=>{
        if($scope.imagenes.length != null && $scope.imagenes.length > 0){
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
        }
    };

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

    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/patronato/obtenerfichaCompleta",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var lista = JSON.parse(response.data);
        var detallePatronatoList = detailUtilities.formatearFecha(lista);
        $scope.nombreEstadoPatronato = detallePatronatoList[0].nombreEstadoExpediente;
        $scope.numExpediente = detallePatronatoList[0].numExpediente;
        $scope.nombreComunidad = detallePatronatoList[0].comunidad;
        $scope.nombreProcedencia = detallePatronatoList[0].nombreProcedencia;
        $scope.interesado = detallePatronatoList[0].interesado;
        $scope.apoderadoLegal = detallePatronatoList[0].apoderadoLegal;
        $scope.nombreAsunto = detallePatronatoList[0].nombreAsunto;
        $scope.nombreEmpleadoReceptor = detallePatronatoList[0].nombreEmpleadoReceptor;
        $scope.fechaEntrada = detallePatronatoList[0].fechaEntrada;
        $scope.nombreAbogadoAsignado = detallePatronatoList[0].nombreAbogadoAsignado;
        $scope.fechaAsignacion = detallePatronatoList[0].fechaAsignacion;
        $scope.fechaDescargo = detallePatronatoList[0].fechaDescargo;
        $scope.fechaRevision = detallePatronatoList[0].fechaRevision;
        $scope.nombreDependenciaRemision = detallePatronatoList[0].nombreDependenciaRemision;
        $scope.recibidoPor = detallePatronatoList[0].recibidoPor;
        $scope.fechaRemision = detallePatronatoList[0].fechaRemision;
        $scope.numDictamen = detallePatronatoList[0].numDictamen;
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/patronato/obtenerImagenesDictamen",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        $scope.imagenes = JSON.parse(response.data);
        $scope.numeroImagenes = $scope.imagenes.length;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });


});


