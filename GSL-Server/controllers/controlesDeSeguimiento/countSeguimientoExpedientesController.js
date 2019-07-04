var countSeguimientoExpController = {};

countSeguimientoExpController.contarExpedientesRecibidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
    	connection.query(query, [1], (err, results) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	var string=JSON.stringify(results);
        	res.json(string);
      	});
    });
}

countSeguimientoExpController.contarExpedientesAsignados = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [2], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

countSeguimientoExpController.contarExpedientesDescargados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [3], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

countSeguimientoExpController.contarExpedientesRevisados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [4], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

countSeguimientoExpController.contarExpedientesRemitidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [5], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
      
}

countSeguimientoExpController.contarExpedientesConPrevio = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaexp.idFichaEntradaExpediente) as numeroRegistros " +
        "FROM fichaentradaexpediente as fichaexp " +
        "WHERE fichaexp.idEstadoExpediente = ?";
        connection.query(query, [6], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
      
}

module.exports = countSeguimientoExpController;