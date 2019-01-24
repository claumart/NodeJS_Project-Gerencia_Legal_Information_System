app.controller("formCtrl", function($scope, $http, $window, utilities) {
    $scope.mostrarDictamen = false;
    $scope.mostrarPaginas = false;
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
    $scope.numOficios = "";
    $scope.num_dictamen = "";
    $scope.pdfFileName = "Ninguno";
    $scope.wordFileName = "Ninguno";
    $scope.archivoAdjuntoFileName = "Ninguno";

    $scope.closeModal = ()=> {
        document.getElementById('myModal').style.display = "none";
    };

    $http({
            method : "POST",
            url : "/populate/formularios/nombreOpiniones",
            headers: {'Content-Type': 'application/json'},
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


    /*****************************************Verificar y completar formulario de modificacion*****************************************/
    /**********************************************************************************************************************************/
    ComprobarModoModificacion = ()=> {
        if($scope.urlParams.mod == 1) {
            LlenarCampos();
        }
    };

    LlenarCampos = ()=>{
       $http({
            method : "POST",
            url : "/modificacion/opiniones/obtener/formularioRevision",
            headers: {'Content-Type': 'application/json'},
            data : {idFicha : $scope.urlParams.idFicha}
        }).then(async function mySuccess(response) {
            var lista =  await JSON.parse(response.data);
            $scope.fecha_revision = new Date(lista[0].fechaRevision);
            $scope.num_dictamen = lista[0].numDictamen;
            $scope.numDictamenTemp = lista[0].numDictamen;
            if(lista[0].urlPdf != null){
                $scope.pdfFileName = lista[0].urlPdf;
                $scope.existePdf = true;
            }else{
                $scope.existePdf = false;
            }
            if(lista[0].urlWord != null){
                $scope.wordFileName = lista[0].urlWord;
                $scope.existeWord = true;
            }else{
                $scope.existeWord = false;
            }
            if(lista[0].urlArchivoAdjunto != null){
                $scope.archivoAdjuntoFileName = lista[0].urlArchivoAdjunto;
                $scope.existeAA = true;
            }else{
                $scope.existeAA = false;
            }
            $scope.idDictamen = lista[0].idDictamen;
        }, function myError(response) {
            $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
            document.getElementById('myModal').style.display = "flex";
        }); 
    };

    ComprobarModoModificacion();

    /**********************************************************************************************************************************/
    /**********************************************************************************************************************************/

    $scope.validarFormulario = ()=>{
        if($scope.urlParams.mod == 1){
            ActualizarFormulario();
        }else{
            GuardarFormulario();
        }
    } 

    ActualizarFormulario = ()=> {
        $scope.mostrarDictamen = false;
        $scope.mostrarArchivo = false;
        var dictamenExistente;
        if($scope.fecha_revision != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_revision);
            var fd = new FormData();
            const pdfInput = document.getElementById('pdf_dictamen');
            if(pdfInput.files[0] != null){
                fd.append('pdfInput', pdfInput.files[0]);
            }
            const wordInput = document.getElementById('word_dictamen');
            if(wordInput.files[0] != null){
                fd.append('wordInput', wordInput.files[0]);
            }
            const archivoAdjuntoInput = document.getElementById('archivo_adjunto_dictamen');
            if(archivoAdjuntoInput.files[0] != null){
                fd.append('aAInput', archivoAdjuntoInput.files[0]);
            }
            if($scope.existePdf){  
                fd.append('urlPdf', $scope.pdfFileName);
            }
            if($scope.existeWord){
                fd.append('urlWord', $scope.wordFileName);
            }
            if($scope.existeAA){
                fd.append('urlAA', $scope.archivoAdjuntoFileName);
            }
            fd.append('existePdf', $scope.existePdf);
            fd.append('existeWord', $scope.existeWord);
            fd.append('existeAA', $scope.existeAA);
            fd.append('fecha', fechaValidada);
            fd.append('idFicha', $scope.urlParams.idFicha);
            fd.append('idDictamen', $scope.idDictamen);
            if($scope.num_dictamen.length < 26 && $scope.num_dictamen.trim().length > 0){
                var numDictamenValidado = utilities.eliminateSpace($scope.num_dictamen.toUpperCase().trim());
                if(numDictamenValidado == $scope.numDictamenTemp){
                    fd.append('numDictamen', numDictamenValidado);
                    $http({
                        method : "POST",
                        url : "/modificacion/opiniones/actualizar/formularioRevision",
                        data : fd,
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).then(function mySuccess(response) {
                        $window.location.href = "/modificacion#titulo_modificacion";
                    }, function myError(response) {
                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                        document.getElementById('myModal').style.display = "flex";
                    });      
                }else{
                    $http({
                        method : "POST",
                        url : "/extraInfo/formularios/existeDictamen",
                        headers: {'Content-Type': 'application/json'},
                        data : {numDictamen : numDictamenValidado}
                    }).then(function mySuccess(response) {
                        if(!response.data) {
                            fd.append('numDictamen', numDictamenValidado);
                            $http({
                                method : "POST",
                                url : "/modificacion/opiniones/actualizar/formularioRevision",
                                data : fd,
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                            }).then(function mySuccess(response) {
                                $window.location.href = "/modificacion#titulo_modificacion";
                            }, function myError(response) {
                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                document.getElementById('myModal').style.display = "flex";
                            });
                        }else{
                            $scope.mostrarDictamen = true; 
                        }
                    }, function myError(response) {
                        $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                        document.getElementById('myModal').style.display = "flex";
                    });
                }
            }else{
                $scope.modalMessage = "El campo Número de dictamen es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
                document.getElementById('myModal').style.display = "flex";
            }
        }else {
            $scope.modalMessage = "Por favor seleccione la fecha de revisión del expediente";
            document.getElementById('myModal').style.display = "flex";
        }       
    };


    GuardarFormulario = ()=> {
        $scope.mostrarDictamen = false;
        $scope.mostrarArchivo = false;
        var dictamenExistente;
        if($scope.fecha_revision != null) {
            var fechaValidada = utilities.validarFecha($scope.fecha_revision);
            if($scope.num_dictamen.length < 26 && $scope.num_dictamen.trim().length > 0){
                var numDictamenValidado = utilities.eliminateSpace($scope.num_dictamen.toUpperCase().trim());
                $http({
                    method : "POST",
                    url : "/extraInfo/formularios/existeDictamen",
                    headers: {'Content-Type': 'application/json'},
                    data : {numDictamen : numDictamenValidado}
                }).then(function mySuccess(response) {
                    if(!response.data) {
                        var fd = new FormData();
                        const pdfInput = document.getElementById('pdf_dictamen');
                        if(pdfInput.files[0] != null){
                            fd.append('pdfInput', pdfInput.files[0]);
                            const wordInput = document.getElementById('word_dictamen');
                            if(wordInput.files[0] != null){
                                fd.append('wordInput', wordInput.files[0]);
                            }
                            const archivoAdjuntoInput = document.getElementById('archivo_adjunto_dictamen');
                            if(archivoAdjuntoInput.files[0] != null){
                                fd.append('archivoAdjuntoInput', archivoAdjuntoInput.files[0]);
                            }
                            fd.append('fecha', fechaValidada);
                            fd.append('numDictamen', numDictamenValidado);
                            fd.append('idFicha', $scope.urlParams.idFicha);
                            $http({
                                method : "POST",
                                url : "/formularios/opiniones/revisar",
                                data : fd,
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                            }).then(function mySuccess(response) {
                                $window.location.href = "/seguimiento_opiniones#titulo_seguimiento";
                            }, function myError(response) {
                                $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                                document.getElementById('myModal').style.display = "flex";
                            });      
                            
                        }else{
                            $scope.mostrarArchivo = true;
                        }
                    }else{
                       $scope.mostrarDictamen = true; 
                    }
                }, function myError(response) {
                    $scope.modalMessage = response.statusText + " La acción no se pudo completar debido a un fallo en el sistema";
                    document.getElementById('myModal').style.display = "flex";
                });

            }else {
                $scope.modalMessage = "El campo Número de dictamen es muy largo o está vacío, por favor ingrese un valor valido y sin espacios";
                document.getElementById('myModal').style.display = "flex";
            }
        }else {
            $scope.modalMessage = "Por favor seleccione la fecha de revisión del expediente";
            document.getElementById('myModal').style.display = "flex";
        }       
    };

});