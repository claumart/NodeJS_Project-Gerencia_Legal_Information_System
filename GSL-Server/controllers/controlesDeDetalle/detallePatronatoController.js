var status = require('http-status');
var detallePatronatoController = {};

detallePatronatoController.obtenerfichaCompleta = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichapatronato.idFichaEntradaPatronato as idficha, GROUP_CONCAT(ExpedientePatronato.numExpedientePatronato SEPARATOR ', ') " +
        "as numExpediente, CONCAT(TipoComunidad.nombreTipoComunidad, \' \' , Comunidad.nombreComunidad) AS comunidad, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichapatronato.interesado, fichapatronato.apoderadoLegal, " +
        "AsuntoPatronato.nombreAsuntoPatronato as nombreAsunto, empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, " +
        "fichapatronato.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichapatronato.fechaAsignacion, " +
        "fichapatronato.fechaDescargo, fichapatronato.fechaRevision, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, " +
        "fichapatronato.recibidoPor, fichapatronato.fechaRemision, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen " +
        "FROM FichaEntradaPatronato as fichapatronato " +
        "LEFT JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "LEFT JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "LEFT JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        "LEFT JOIN TipoComunidad " +
            "ON TipoComunidad.idTipoComunidad = Comunidad.idTipoComunidad " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichapatronato.idProcedencia " +
        "LEFT JOIN AsuntoPatronato " +
            "ON AsuntoPatronato.idAsuntoPatronato = fichapatronato.idAsuntoPatronato " +
        "LEFT JOIN Empleado as empleadoReceptor  " +
            "ON empleadoReceptor.numEmpleado = fichapatronato.idEmpleadoReceptor " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichapatronato.idAbogadoAsignado " +
        "LEFT JOIN Dependencia as dependenciaRemision " +
            "ON dependenciaRemision.idDependencia = fichapatronato.idDependenciaRemision " +
        "LEFT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichapatronato.idEstadoPatronato " +
        "LEFT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichapatronato.idDictamen " +
        "WHERE fichapatronato.idFichaEntradaPatronato = ? GROUP BY fichapatronato.idFichaEntradaPatronato " +
        "UNION " +
        "SELECT fichapatronato.idFichaEntradaPatronato as idficha, GROUP_CONCAT(ExpedientePatronato.numExpedientePatronato SEPARATOR ', ') " +
        "as numExpediente, CONCAT(TipoComunidad.nombreTipoComunidad, \' \' , Comunidad.nombreComunidad) AS comunidad, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichapatronato.interesado, fichapatronato.apoderadoLegal, " +
        "AsuntoPatronato.nombreAsuntoPatronato as nombreAsunto, empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, " +
        "fichapatronato.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichapatronato.fechaAsignacion, " +
        "fichapatronato.fechaDescargo, fichapatronato.fechaRevision, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, " +
        "fichapatronato.recibidoPor, fichapatronato.fechaRemision, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen " +
        "FROM FichaEntradaPatronato as fichapatronato " +
        "RIGHT JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "RIGHT JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "RIGHT JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        "RIGHT JOIN TipoComunidad " +
            "ON TipoComunidad.idTipoComunidad = Comunidad.idTipoComunidad " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichapatronato.idProcedencia " +
        "RIGHT JOIN AsuntoPatronato " +
            "ON AsuntoPatronato.idAsuntoPatronato = fichapatronato.idAsuntoPatronato " +
        "RIGHT JOIN Empleado as empleadoReceptor " +
            "ON empleadoReceptor.numEmpleado = fichapatronato.idEmpleadoReceptor " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichapatronato.idAbogadoAsignado " +
        "RIGHT JOIN Dependencia as dependenciaRemision " +
            "ON dependenciaRemision.idDependencia = fichapatronato.idDependenciaRemision " +
        "RIGHT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichapatronato.idEstadoPatronato " +
        "RIGHT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichapatronato.idDictamen " +
        "WHERE fichapatronato.idFichaEntradaPatronato = ? GROUP BY fichapatronato.idFichaEntradaPatronato";
    	connection.query(query, [req.body.idFicha, req.body.idFicha], (err, results) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	var string=JSON.stringify(results);
        	res.status(status.OK).json(string);
      	});
    });
}

detallePatronatoController.obtenerImagenesDictamen = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PaginaDictamen.idDictamen, PaginaDictamen.numeroPagina, PaginaDictamen.urlPagina " + 
        "FROM FichaEntradaPatronato as fichapatronato INNER JOIN PaginaDictamen ON fichapatronato.idDictamen = PaginaDictamen.idDictamen " + 
        "WHERE fichapatronato.idFichaEntradaPatronato = ? ORDER BY PaginaDictamen.numeroPagina ASC";
        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.status(status.OK).json(string);
        });
    });
}

module.exports = detallePatronatoController;