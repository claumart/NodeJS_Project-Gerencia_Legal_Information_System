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


    $http({
        method : "POST",
        url : "/detalle/patronato/obtenerfichaCompleta",
        headers: {'Content-Type': 'application/json'},
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
        $scope.extrainfo = detalleExpedienteList[0].informacionAdicional;
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
        url : "/detalle/patronato/obtenerPdf",
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
        url : "/detalle/patronato/obtenerWord",
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


});


