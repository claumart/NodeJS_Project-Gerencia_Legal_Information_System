var seguimientoExpController = {};

seguimientoExpController.mostrarExpedientesRecibidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
    	connection.query(query, [1, 1], (err, results) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	var string=JSON.stringify(results);
        	res.json(string);
      	});
    });
}

seguimientoExpController.mostrarExpedientesAsignados = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [2, 2], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

seguimientoExpController.mostrarExpedientesDescargados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [3, 3], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

seguimientoExpController.mostrarExpedientesRevisados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [4, 4], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

seguimientoExpController.mostrarExpedientesRemitidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [5, 5], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
      
}
seguimientoExpController.mostrarExpedientesConPrevio = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [6, 6], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
      
}

seguimientoExpController.mostrarExpedientePorNumero = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "EstadoExpediente.idEstadoExpediente as idEstado FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "LEFT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "WHERE numExpediente = ? " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, Expediente.numExpediente as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, " +
        "EstadoExpediente.idEstadoExpediente as idEstado FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "RIGHT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "WHERE numExpediente = ?";
        connection.query(query, [req.body.numExpediente, req.body.numExpediente], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

module.exports = seguimientoExpController;