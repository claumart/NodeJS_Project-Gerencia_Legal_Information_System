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

detalleOpinionController.obtenerPdf = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PdfDictamen.urlPdf " + 
        "FROM FichaEntradaOpinion as fichaOpinion INNER JOIN PdfDictamen ON fichaOpinion.idDictamen = PdfDictamen.idDictamen " + 
        "WHERE fichaOpinion.idFichaEntradaOpinion = ?";
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

detalleOpinionController.obtenerWord = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT WordDictamen.urlWord " + 
        "FROM FichaEntradaOpinion as fichaOpinion INNER JOIN WordDictamen ON fichaOpinion.idDictamen = WordDictamen.idDictamen " + 
        "WHERE fichaOpinion.idFichaEntradaOpinion = ?";
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
        var query = "SELECT ArchivoAdjunto.urlArchivoAdjunto " + 
        "FROM FichaEntradaOpinion as fichaOpinion INNER JOIN ArchivoAdjunto ON fichaOpinion.idDictamen = ArchivoAdjunto.idDictamen " + 
        "WHERE fichaOpinion.idFichaEntradaOpinion = ?";
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


module.exports = detalleOpinionController;