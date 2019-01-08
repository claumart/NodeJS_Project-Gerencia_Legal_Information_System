var status = require('http-status');
var detalleExpedienteController = {};

detalleExpedienteController.obtenerfichaCompleta = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichaexp.interesado, fichaexp.apoderadoLegal, asunto.nombreAsunto as nombreAsunto, " +
        "empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "fichaexp.fechaAsignacion, fichaexp.fechaDescargo, fichaexp.fechaRevision, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, " +
        "fichaexp.recibidoPor, fichaexp.fechaRemision, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen " +
        "FROM fichaentradaexpediente as fichaexp " + 
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " + 
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " + 
        " LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN Empleado as empleadoReceptor " + 
            "ON empleadoReceptor.numEmpleado = fichaexp.idEmpleadoReceptor " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "LEFT JOIN Dependencia as dependenciaRemision " +
            "ON dependenciaRemision.idDependencia = fichaexp.idDependenciaRemision " + 
        "LEFT JOIN EstadoExpediente " + 
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "LEFT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichaexp.idDictamen " +
        "WHERE fichaexp.idFichaEntradaExpediente = ? GROUP BY fichaexp.idFichaEntradaExpediente " +  
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, " +
        "Procedencia.nombreDependencia as nombreProcedencia, fichaexp.interesado, fichaexp.apoderadoLegal, asunto.nombreAsunto as nombreAsunto, " +
        "empleadoReceptor.nombreEmpleado as nombreEmpleadoReceptor, fichaexp.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "fichaexp.fechaAsignacion, fichaexp.fechaDescargo, fichaexp.fechaRevision, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, " +
        "fichaexp.recibidoPor, fichaexp.fechaRemision, EstadoExpediente.nombreEstadoExpediente, Dictamen.numDictamen " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN Empleado as empleadoReceptor " +
            "ON empleadoReceptor.numEmpleado = fichaexp.idEmpleadoReceptor " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "RIGHT JOIN Dependencia as dependenciaRemision " +
            "ON dependenciaRemision.idDependencia = fichaexp.idDependenciaRemision " +
        "RIGHT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "RIGHT JOIN Dictamen " +
            "ON Dictamen.idDictamen = fichaexp.idDictamen " +
        "WHERE fichaexp.idFichaEntradaExpediente = ? GROUP BY fichaexp.idFichaEntradaExpediente";
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

detalleExpedienteController.obtenerPdf = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PdfDictamen.urlPdf " + 
        "FROM fichaentradaexpediente as fichaexp INNER JOIN PdfDictamen ON fichaexp.idDictamen = PdfDictamen.idDictamen " + 
        "WHERE fichaexp.idFichaEntradaExpediente = ?";
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

detalleExpedienteController.obtenerWord = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT WordDictamen.urlWord " + 
        "FROM fichaentradaexpediente as fichaexp INNER JOIN WordDictamen ON fichaexp.idDictamen = WordDictamen.idDictamen " + 
        "WHERE fichaexp.idFichaEntradaExpediente = ?";
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

detalleExpedienteController.obtenerHistorialPrevision = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT preexp.idPrevisionExpediente, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, preexp.motivoRemision, " +
        "preexp.recibidoPor, preexp.fechaRemision, dependenciaRetorno.nombreDependencia as nombreDependenciaRetorno, empleadoReceptor.nombreEmpleado " +
        "as nombreEmpleadoReceptor, preexp.fechaRetorno " +
        "FROM PrevisionExpediente as preexp " +
        "LEFT JOIN Dependencia as dependenciaRemision " +
            "ON preexp.idDependenciaRemision = dependenciaRemision.idDependencia " +
        "LEFT JOIN Dependencia as dependenciaRetorno " +
            "ON preexp.idDependenciaRetorno = dependenciaRetorno.idDependencia " +
        "LEFT JOIN Empleado as empleadoReceptor " +
            "ON preexp.idEmpleadoReceptor = empleadoReceptor.numEmpleado " +
        "WHERE preexp.idFichaEntradaExpediente = ? " +
        "UNION " +
        "SELECT preexp.idPrevisionExpediente, dependenciaRemision.nombreDependencia as nombreDependenciaRemision, preexp.motivoRemision, " +
        "preexp.recibidoPor, preexp.fechaRemision, dependenciaRetorno.nombreDependencia as nombreDependenciaRetorno, empleadoReceptor.nombreEmpleado " +
        "as nombreEmpleadoReceptor, preexp.fechaRetorno " +
        "FROM PrevisionExpediente as preexp " +
        "RIGHT JOIN Dependencia as dependenciaRemision " +
            "ON preexp.idDependenciaRemision = dependenciaRemision.idDependencia " +
        "RIGHT JOIN Dependencia as dependenciaRetorno " +
            "ON preexp.idDependenciaRetorno = dependenciaRetorno.idDependencia " +
        "RIGHT JOIN Empleado as empleadoReceptor " +
            "ON preexp.idEmpleadoReceptor = empleadoReceptor.numEmpleado " +
        "WHERE preexp.idFichaEntradaExpediente = ? ORDER BY idPrevisionExpediente DESC";
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


module.exports = detalleExpedienteController;