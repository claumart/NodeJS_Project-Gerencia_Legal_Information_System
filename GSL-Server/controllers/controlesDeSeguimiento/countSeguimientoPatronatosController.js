var seguimientoPatronatoController = {};

seguimientoPatronatoController.contarPatronatosRecibidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichapatronato.idFichaEntradaPatronato) as numeroRegistros  " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE fichapatronato.idEstadoPatronato = ?";
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

seguimientoPatronatoController.contarPatronatosAsignados = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT COUNT(fichapatronato.idFichaEntradaPatronato) as numeroRegistros  " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE fichapatronato.idEstadoPatronato = ?";
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

seguimientoPatronatoController.contarPatronatosDescargados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichapatronato.idFichaEntradaPatronato) as numeroRegistros  " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE fichapatronato.idEstadoPatronato = ?";
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

seguimientoPatronatoController.contarPatronatosRevisados = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichapatronato.idFichaEntradaPatronato) as numeroRegistros  " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE fichapatronato.idEstadoPatronato = ?";
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

seguimientoPatronatoController.contarPatronatosRemitidos = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT COUNT(fichapatronato.idFichaEntradaPatronato) as numeroRegistros  " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE fichapatronato.idEstadoPatronato = ?";
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


module.exports = seguimientoPatronatoController;