app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.mostrarDictamen = false;
    $scope.mostrarPaginas = false;
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numExpedientes = "";
    $scope.numPaginas = 1;
    $scope.serverUrl = urlUtility.getServerUrl();


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
        $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/existeDictamen",
            data : {numDictamen : $scope.num_dictamen}
        }).then(function mySuccess(response) {
            
        }, function myError(response) {
            console.log(response.statusText);
        });


        var fd = new FormData();
        const inputs = document.getElementsByClassName('files');
        const inputFiles = Array.from(inputs);
        console.log(inputFiles);
        console.log(inputFiles.length);
        //console.log(inputs);
        for(i = 0;  i < inputFiles.length; i++) {
            if(inputFiles[i].files[0] != null){
                fd.append('imageFiles[]', inputFiles[i].files[0]);
                if(i == inputFiles.length - 1){
                    $http({
                        method : "POST",
                        url : "../../pruebaImagenes.php",
                        data : fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function mySuccess(response) {
                        console.log(response.data);
                    }, function myError(response) {
                        console.log(response.statusText);
                    });      
                }
            }else{
                $scope.mostrarPaginas = true;
                break;
            }
        }
    };



});

