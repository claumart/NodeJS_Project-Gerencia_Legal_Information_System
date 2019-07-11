var seguimientoOpinionController = {};

seguimientoOpinionController.contarOpinionesRecibidas = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichaOpinion.idFichaEntradaOpinion) as numeroRegistros " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.contarOpinionesAsignadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichaOpinion.idFichaEntradaOpinion) as numeroRegistros " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.contarOpinionesDescargadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaOpinion.idFichaEntradaOpinion) as numeroRegistros " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.contarOpinionesRevisadas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaOpinion.idFichaEntradaOpinion) as numeroRegistros " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

seguimientoOpinionController.contarOpinionesRemitidas = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichaOpinion.idFichaEntradaOpinion) as numeroRegistros " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "WHERE fichaOpinion.idEstadoOpinion = ?";
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

module.exports = seguimientoOpinionController;