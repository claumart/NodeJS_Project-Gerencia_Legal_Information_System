var seguimientoOpinionController = {};

seguimientoOpinionController.mostrarOpinionesRecibidas = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.mostrarOpinionesAsignadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.mostrarOpinionesDescargadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.mostrarOpinionesRevisadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.mostrarOpinionesRemitidas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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


seguimientoOpinionController.mostrarOpinionPorOficio = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaOpinion.idEstadoOpinion as idEstado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.numOficio = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado, fichaOpinion.idEstadoOpinion as idEstado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.numOficio = ?";
        connection.query(query, [req.body.numOficio, req.body.numOficio], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

module.exports = seguimientoOpinionController;