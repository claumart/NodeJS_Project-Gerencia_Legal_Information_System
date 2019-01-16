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
    $scope.slideAAIndex = 0;
    $scope.registroPrevios = 0;
    //$scope.numeroImagenes = 0;
    //$scope.numeroAA = 0;
    //$scope.imagenes;
    //$scope.archivosAdjuntos;
    $scope.numPdf = 0;
    $scope.numWord = 0;
    $scope.numAdjunto = 0;

    $scope.construirGaleria = ()=>{
        if($scope.imagenes != null && $scope.imagenes.length > 0){
            var imagesContainer = document.getElementById('imagesPreview');
            for(let i = 0; i<= $scope.imagenes.length; i++){
                if(i < 3){
                    var imageBox = document.createElement('div');
                    imageBox.setAttribute('class', 'column');
                    var img = document.createElement('img');
                    var url = $scope.serverUrl + $scope.imagenes[i].urlPagina;
                    img.setAttribute('src', url);
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
                        divBox.setAttribute('class', 'text_image_number');
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

    $scope.construirGaleriaDeArchivosAdjuntos = ()=>{
        if($scope.archivosAdjuntos != null && $scope.archivosAdjuntos.length > 0){
            var imagesContainer = document.getElementById('archivosAdjuntosPreview');
            for(let i = 0; i<= $scope.archivosAdjuntos.length; i++){
                if(i < 3){
                    var imageBox = document.createElement('div');
                    imageBox.setAttribute('class', 'column');
                    var img = document.createElement('img');
                    var url = $scope.serverUrl + $scope.archivosAdjuntos[i].urlPagina;
                    img.setAttribute('src', url);
                    img.setAttribute('class', 'hover-shadow');
                    img.setAttribute('onclick', 'angular.element(this).scope().openAAModal('+ i +')');
                    imageBox.appendChild(img);
                    imagesContainer.appendChild(imageBox);
                }else{
                    var moreImages =  $scope.archivosAdjuntos.length - i;
                    if(moreImages > 0){
                        var textoBox = document.createElement('div');
                        var divBox = document.createElement('div');
                        textoBox.setAttribute('class', 'column');
                        divBox.setAttribute('class', 'text_image_number');
                        divBox.setAttribute('onclick', 'angular.element(this).scope().openAAModal('+ i +')');
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

    /*// Open the Modal
    $scope.openAAModal = (n)=> {
        document.getElementById('myAAModal').style.display = "block";
        $scope.currentAASlide(n);
    }

    // Close the Modal
    $scope.closeAAModal = ()=> {
        document.getElementById('myAAModal').style.display = "none";
    }

    // Next/previous controls
    $scope.minusAASlides = ()=> {
        if($scope.slideAAIndex ==0) {
            $scope.showAASlides($scope.slideAAIndex = $scope.archivosAdjuntos.length -1);
        }else{
            $scope.showAASlides($scope.slideAAIndex -= 1);
        }
    }

    $scope.plusAASlides = ()=> {
        if($scope.slideAAIndex == $scope.archivosAdjuntos.length -1) {
            $scope.showAASlides($scope.slideAAIndex = 0);
        }else{
            $scope.showAASlides($scope.slideAAIndex += 1);
        }
    }

    // Thumbnail image controls
    $scope.currentAASlide = (n)=> {
        $scope.showAASlides($scope.slideAAIndex = n);
    }

    $scope.showAASlides = (n)=> {
        var container = document.getElementById('myAAContent');
        container.removeChild(document.getElementById('actualAASlide'));
        var mySlideContainer = document.createElement('div');
        var imageText = document.createElement('div');
        var img = document.createElement('img');
        var imageNumber = n +1;
        mySlideContainer.setAttribute('id', 'actualAASlide');
        mySlideContainer.setAttribute('class', 'mySlides');
        imageText.setAttribute('class', 'numbertext');
        imageText. innerHTML = imageNumber + '/' + $scope.archivosAdjuntos.length;
        img.setAttribute('src', $scope.serverUrl + $scope.archivosAdjuntos[n].urlPagina);
        //img.setAttribute('style', 'width:100%');
        mySlideContainer.appendChild(imageText);
        mySlideContainer.appendChild(img);
        container.appendChild(mySlideContainer);

    }*/

    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/opinion/obtenerfichaCompleta",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var lista = JSON.parse(response.data);
        var detalleOpinionList = detailUtilities.formatearFecha(lista);
        $scope.nombreEstadoOpinion = detalleOpinionList[0].nombreEstadoOpinion;
        $scope.numOficio = detalleOpinionList[0].numOficio;
        $scope.nombreProcedencia = detalleOpinionList[0].nombreProcedencia;
        $scope.apoderadoLegal = detalleOpinionList[0].apoderadoLegal;
        $scope.descripcionAsunto = detalleOpinionList[0].asunto;
        $scope.nombreEmpleadoReceptor = detalleOpinionList[0].nombreEmpleadoReceptor;
        $scope.fechaEntrada = detalleOpinionList[0].fechaEntrada;
        $scope.nombreAbogadoAsignado = detalleOpinionList[0].nombreAbogadoAsignado;
        $scope.fechaAsignacion = detalleOpinionList[0].fechaAsignacion;
        $scope.fechaDescargo = detalleOpinionList[0].fechaDescargo;
        $scope.fechaRevision = detalleOpinionList[0].fechaRevision;
        $scope.recibidoPor = detalleOpinionList[0].recibidoPor;
        $scope.fechaRemision = detalleOpinionList[0].fechaRemision;
        $scope.numDictamen = detalleOpinionList[0].numDictamen;
    }, function myError(response) {
        console.log(response.statusText);
    });


    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/opinion/obtenerPdf",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var pdf = JSON.parse(response.data);
        $scope.numPdf = pdf.length;
        if($scope.numPdf>0) $scope.urlPdf = $scope.serverUrl + pdf[0].urlPdf;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/opinion/obtenerWord",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var word = JSON.parse(response.data);
        $scope.numWord = word.length;
        if($scope.numWord>0) $scope.urlWord = $scope.serverUrl + word[0].urlWord;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : $scope.serverUrl + "/detalle/opinion/obtenerArchivosAdjuntos",
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var adjunto = JSON.parse(response.data);
        $scope.numAdjunto = adjunto.length;
        if($scope.numAdjunto>0) $scope.urlAdjunto = $scope.serverUrl + adjunto[0].urlArchivoAdjunto;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

});



