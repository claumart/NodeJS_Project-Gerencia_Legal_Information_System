app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.mostrarDictamen = false;
    $scope.mostrarPaginas = false;
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numExpedientes = "";
    $scope.numPaginas = 1;
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.num_dictamen = "";


    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreExpedientes",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++) {
                if(i == 0){
                    $scope.numExpedientes += lista[i].numExpediente;  
                }else{
                    $scope.numExpedientes += ', ' + lista[i].numExpediente;
                }
            }
        }, function myError(response) {
            console.log(response.statusText);
    });


    $scope.agregarPagina = ()=> {
        var paginasBox = document.getElementById('paginas_dictamen_box');
        var numeroPaginas = parseInt($scope.numPaginas, 10);
        var idPagina = 'pagina' + ++numeroPaginas;
        var divFila = document.createElement('div');
        var divLabelCol = document.createElement('div');
        var divInputCol = document.createElement('idiv');
        var paginaLabel = document.createElement('label');
        var paginaInput = document.createElement('input');
        divFila.setAttribute('class','grid-x grid-padding-x');
        divFila.setAttribute('id', idPagina);
        divLabelCol.setAttribute('class', 'medium-3 small-12 cell');
        paginaLabel.innerHTML = "Página # " + numeroPaginas;
        divInputCol.setAttribute('class', 'medium-9 small-12 cell');
        paginaInput.setAttribute('type', 'file');
        paginaInput.setAttribute('accept', 'image/*');
        paginaInput.setAttribute('class', 'files');
        paginaInput.setAttribute('file-model', 'imageFiles[]');
        paginaInput.setAttribute('id', 'image_' + idPagina);
        paginaInput.setAttribute('name', 'imageFiles[]');
        paginaInput.setAttribute('ng-model', 'image_' + idPagina);
        divLabelCol.appendChild(paginaLabel);
        divInputCol.appendChild(paginaInput);
        divFila.appendChild(divLabelCol);
        divFila.appendChild(divInputCol);
        paginasBox.appendChild(divFila);
        $scope.numPaginas = numeroPaginas;
    };


    $scope.eliminarUltimaPagina = ()=> {
        var numeroPaginas = parseInt($scope.numPaginas, 10);
        if(numeroPaginas > 1){
            var idPaginaAEliminar = 'pagina' + numeroPaginas;
            var paginasBox = document.getElementById('paginas_dictamen_box');
            paginasBox.removeChild(document.getElementById(idPaginaAEliminar));
            $scope.numPaginas = --numeroPaginas;
        }
    };


    $scope.validarFormulario = ()=> {
        $scope.mostrarDictamen = false;
        $scope.mostrarPaginas = false;
        var dictamenExistente;
        if($scope.fecha_revision != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_revision);
            if($scope.num_dictamen.length < 26 && $scope.num_dictamen.trim().length > 0){
                var numDictamenValidado = utilities.eliminateSpace($scope.num_dictamen.toUpperCase().trim());
                $http({
                    method : "POST",
                    url : $scope.serverUrl + "/extraInfo/formularios/existeDictamen",
                    data : {numDictamen : numDictamenValidado}
                }).then(function mySuccess(response) {
                    if(!response.data) {
                        var fd = new FormData();
                        const inputs = document.getElementsByClassName('files');
                        const inputFiles = Array.from(inputs);
                        for(i = 0;  i < inputFiles.length; i++) {
                            if(inputFiles[i].files[0] != null){
                                fd.append('imageFiles', inputFiles[i].files[0]);
                                if(i == inputFiles.length - 1){
                                    fd.append('fecha', fechaValidada);
                                    fd.append('numDictamen', numDictamenValidado);
                                    fd.append('idFicha', $scope.urlParams.idFicha);
                                    $http({
                                        method : "POST",
                                        url : $scope.serverUrl + "/formularios/expedientes/revisar",
                                        data : fd,
                                        transformRequest: angular.identity,
                                        headers: {'Content-Type': undefined}
                                    }).then(function mySuccess(response) {
                                        $window.location.href = "../../seguimiento_expedientes.html#titulo_seguimiento";
                                    }, function myError(response) {
                                        console.log(response.statusText);
                                    });      
                                }
                            }else{
                                $scope.mostrarPaginas = true;
                                break;
                            }
                        }
                    }else{
                       $scope.mostrarDictamen = true; 
                    }
                }, function myError(response) {
                    console.log(response.statusText);
                });

            }else {
                window.alert("El campo Número de dictamen es muy largo o está vacío, por favor ingrese un valor valido y sin espacios");
            }
        }else {
            window.alert("Por favor seleccione la fecha de revisión del expediente");
        }       
    };

});