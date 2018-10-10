app.controller("formCtrl", function($scope, $http, $window, utilities, urlUtility) {
    $scope.mostrarDictamen = false;
    $scope.mostrarPaginas = false;
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numOficios = "";
    $scope.numPaginas = 1;
    $scope.numPaginasAdjuntas = 0;
    $scope.serverUrl = urlUtility.getServerUrl();
    $scope.num_dictamen = "";


    $http({
            method : "POST",
            url : $scope.serverUrl + "/populate/formularios/nombreOpiniones",
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(function mySuccess(response) {
            var lista = JSON.parse(response.data);
            for(i = 0; i< lista.length; i++){
                if(i == 0){
                    $scope.numOficios += lista[i].numOficio;  
                }else{
                    $scope.numOficios += ', ' + lista[i].numOficio;
                }
            }
        }, function myError(response) {
            console.log(response.statusText);
    });


    $scope.agregarPagina = ()=> {
        var paginasBox = document.getElementById('paginas_dictamen_box');
        var numeroPaginas = parseInt($scope.numPaginas, 10);
        var idPagina = 'dic_pagina' + ++numeroPaginas;
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
        paginaInput.setAttribute('class', 'dic_files');
        paginaInput.setAttribute('id', 'image_' + idPagina);
        paginaInput.setAttribute('name', 'dicImageFiles[]');
        paginaInput.setAttribute('ng-model', 'image_' + idPagina);
        divLabelCol.appendChild(paginaLabel);
        divInputCol.appendChild(paginaInput);
        divFila.appendChild(divLabelCol);
        divFila.appendChild(divInputCol);
        paginasBox.appendChild(divFila);
        $scope.numPaginas = numeroPaginas;
    };

    $scope.agregarPaginaAdjunta = ()=> {
        var paginasBox = document.getElementById('archivo_adjunto_box');
        var numeroPaginas = parseInt($scope.numPaginasAdjuntas, 10);
        var idPagina = 'aa_pagina' + ++numeroPaginas;
        var divFila = document.createElement('div');
        var divLabelCol = document.createElement('div');
        var divInputCol = document.createElement('idiv');
        var paginaLabel = document.createElement('label');
        var paginaInput = document.createElement('input');
        divFila.setAttribute('class','grid-x grid-padding-x');
        divFila.setAttribute('id', idPagina);
        divLabelCol.setAttribute('class', 'medium-3 small-12 cell');
        paginaLabel.innerHTML = "Página Adujnta # " + numeroPaginas; 
        divInputCol.setAttribute('class', 'medium-9 small-12 cell');
        paginaInput.setAttribute('type', 'file');
        paginaInput.setAttribute('accept', 'image/*');
        paginaInput.setAttribute('class', 'aa_files');
        paginaInput.setAttribute('id', 'image_' + idPagina);
        paginaInput.setAttribute('name', 'aAImageFiles[]');
        paginaInput.setAttribute('ng-model', 'image_' + idPagina);
        divLabelCol.appendChild(paginaLabel);
        divInputCol.appendChild(paginaInput);
        divFila.appendChild(divLabelCol);
        divFila.appendChild(divInputCol);
        paginasBox.appendChild(divFila);
        $scope.numPaginasAdjuntas = numeroPaginas;
    };


    $scope.eliminarUltimaPagina = ()=> {
        var numeroPaginas = parseInt($scope.numPaginas, 10);
        if(numeroPaginas > 1){
            var idPaginaAEliminar = 'dic_pagina' + numeroPaginas;
            var paginasBox = document.getElementById('paginas_dictamen_box');
            paginasBox.removeChild(document.getElementById(idPaginaAEliminar));
            $scope.numPaginas = --numeroPaginas;
        }
    };

    $scope.eliminarUltimaPaginaAdjunta = ()=> {
        var numeroPaginas = parseInt($scope.numPaginasAdjuntas, 10);
        if(numeroPaginas > 0){
            var idPaginaAEliminar = 'aa_pagina' + numeroPaginas;
            var paginasBox = document.getElementById('archivo_adjunto_box');
            paginasBox.removeChild(document.getElementById(idPaginaAEliminar));
            $scope.numPaginasAdjuntas = --numeroPaginas;
        }
    };


    $scope.validarFormulario = ()=> {
        $scope.mostrarDictamen = false;
        $scope.mostrarPaginas = false;
        $scope.mostrarPaginasAdjuntas = false;
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
                        fd.append('fecha', $scope.fecha_revision);
                        fd.append('numDictamen', numDictamenValidado);
                        fd.append('idFicha', $scope.urlParams.idFicha);
                        const dic_inputs = document.getElementsByClassName('dic_files');
                        const dicInputFiles = Array.from(dic_inputs);
                        const aa_inputs = document.getElementsByClassName('aa_files');
                        const aAInputFiles = Array.from(aa_inputs);
                        console.log(dicInputFiles);
                        console.log(dicInputFiles.length);
                        console.log(aAInputFiles);
                        console.log(aAInputFiles.length);
                        for(i = 0;  i < dicInputFiles.length; i++) {
                            if(dicInputFiles[i].files[0] != null){
                                fd.append('dicImageFiles', dicInputFiles[i].files[0]);
                                if(i == dicInputFiles.length - 1){
                                    if(aAInputFiles.length > 0) {
                                        for(i = 0;  i < aAInputFiles.length; i++) {
                                            if(aAInputFiles[i].files[0] != null){
                                                fd.append('aAImageFiles', aAInputFiles[i].files[0]);
                                                if(i == aAInputFiles.length - 1){
                                                    $http({
                                                        method : "POST",
                                                        url : $scope.serverUrl + "/formularios/opiniones/revisar",
                                                        data : fd,
                                                        transformRequest: angular.identity,
                                                        headers: {'Content-Type': undefined}
                                                    }).then(function mySuccess(response) {
                                                        $window.location.href = "../../seguimiento_opiniones.html#titulo_seguimiento";
                                                    }, function myError(response) {
                                                        console.log(response.statusText);
                                                    });
                                                }
                                            }else{
                                                $scope.mostrarPaginasAdjuntas = true;
                                                break;
                                            }
                                        }
                                    }else{
                                        $http({
                                            method : "POST",
                                            url : $scope.serverUrl + "/formularios/opiniones/revisar",
                                            data : fd,
                                            transformRequest: angular.identity,
                                            headers: {'Content-Type': undefined}
                                        }).then(function mySuccess(response) {
                                            $window.location.href = "../../seguimiento_opiniones.html#titulo_seguimiento";
                                        }, function myError(response) {
                                            console.log(response.statusText);
                                        });
                                    }      
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