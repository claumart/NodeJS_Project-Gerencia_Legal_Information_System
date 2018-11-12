var status = require('http-status');
var detalleOpinionController = {};

detalleOpinionController.obtenerfichaCompleta = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichaOpinion.apoderadoLegal, fichaOpinion.asunto, " +
        "empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "fichaOpinion.fechaAsignacion, fichaOpinion.fechaDescargo, fichaOpinion.fechaRevision, " +
        "fichaOpinion.recibidoPor, fichaOpinion.fechaRemision, EstadoExpediente.nombreEstadoExpediente as nombreEstadoOpinion, Dictamen.numDictamen " +
        "FROM FichaEntradaOpinion as fichaOpinion " + 
        "LEFT JOIN Dependencia as Procedencia " + 
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " + 
        "LEFT JOIN Empleado as empleadoReceptor " + 
            "ON empleadoReceptor.numEmpleado = fichaOpinion.idEmpleadoReceptor " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " + 
        "LEFT JOIN EstadoExpediente " + 
            "ON EstadoExpediente.idEstadoExpediente = fichaOpinion.idEstadoOpinion " +
        "LEFT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichaOpinion.idDictamen " +
        "WHERE fichaOpinion.idFichaEntradaOpinion = ? " +  
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichaOpinion.apoderadoLegal, fichaOpinion.asunto, " +
        "empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "fichaOpinion.fechaAsignacion, fichaOpinion.fechaDescargo, fichaOpinion.fechaRevision, " +
        "fichaOpinion.recibidoPor, fichaOpinion.fechaRemision, EstadoExpediente.nombreEstadoExpediente as nombreEstadoOpinion, Dictamen.numDictamen " +
        "FROM FichaEntradaOpinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN Empleado as empleadoReceptor " +
            "ON empleadoReceptor.numEmpleado = fichaOpinion.idEmpleadoReceptor " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "RIGHT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaOpinion.idEstadoOpinion " +
        "RIGHT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichaOpinion.idDictamen " +
        "WHERE fichaOpinion.idFichaEntradaOpinion = ?";
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

detalleOpinionController.obtenerImagenesDictamen = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PaginaDictamen.idDictamen, PaginaDictamen.numeroPagina, PaginaDictamen.urlPagina " + 
        "FROM FichaEntradaOpinion as fichaOpinion INNER JOIN PaginaDictamen ON fichaOpinion.idDictamen = PaginaDictamen.idDictamen " + 
        "WHERE fichaOpinion.idFichaEntradaOpinion = ? ORDER BY PaginaDictamen.numeroPagina ASC";
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

detalleOpinionController.obtenerArchivosAdjuntos = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PaginaArchivoAdjunto.idDictamen, PaginaArchivoAdjunto.numeroPagina, PaginaArchivoAdjunto.urlPagina " + 
        "FROM FichaEntradaOpinion as fichaOpinion INNER JOIN PaginaArchivoAdjunto ON fichaOpinion.idDictamen = PaginaArchivoAdjunto.idDictamen " + 
        "WHERE fichaOpinion.idFichaEntradaOpinion = ? ORDER BY PaginaArchivoAdjunto.numeroPagina ASC";
        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(results);
            var string=JSON.stringify(results);
            res.status(status.OK).json(string);
        });
    });
}


module.exports = detalleOpinionController;