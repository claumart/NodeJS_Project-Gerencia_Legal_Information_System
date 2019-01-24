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

app.controller("detailCtrl", function($scope, $http, $window, utilities, detailUtilities) {
    $scope.urlParams = utilities.getAllUrlParams($window.location.href);
	$scope.accion = "";
    $scope.textoBoton = "";
    $scope.registroPrevios = 0;
    $scope.numPdf = 0;
    $scope.numWord = 0;
    $scope.numAdjunto = 0;

    $http({
        method : "POST",
        url : "/detalle/opinion/obtenerfichaCompleta",
        headers: {'Content-Type': 'application/json'},
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
        url : "/detalle/opinion/obtenerPdf",
        headers: {'Content-Type': 'application/json'},
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var pdf = JSON.parse(response.data);
        $scope.numPdf = pdf.length;
        if($scope.numPdf>0) $scope.urlPdf = pdf[0].urlPdf;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : "/detalle/opinion/obtenerWord",
        headers: {'Content-Type': 'application/json'},
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var word = JSON.parse(response.data);
        $scope.numWord = word.length;
        if($scope.numWord>0) $scope.urlWord = word[0].urlWord;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

    $http({
        method : "POST",
        url : "/detalle/opinion/obtenerArchivosAdjuntos",
        headers: {'Content-Type': 'application/json'},
        data : {idFicha : $scope.urlParams.idFicha}
    }).then(function mySuccess(response) {
        var adjunto = JSON.parse(response.data);
        $scope.numAdjunto = adjunto.length;
        if($scope.numAdjunto>0) $scope.urlAdjunto = adjunto[0].urlArchivoAdjunto;
        $scope.construirGaleria();
    }, function myError(response) {
        console.log(response.statusText);
    });

});



