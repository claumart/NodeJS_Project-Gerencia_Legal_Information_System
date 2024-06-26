var populateExtraInfoController = {};

populateExtraInfoController.getNombreExpedientes = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "SELECT Expediente.numExpediente as numExpediente FROM fichaEntradaExpedienteXExpediente as fichaxexp " +
        "RIGHT JOIN Expediente ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "WHERE fichaxexp.idFichaEntradaExpediente =?";
    	connection.query(query, [req.body.idFicha], (err, results) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	var string=JSON.stringify(results);
        	res.json(string);
      	});
      
    });
}


populateExtraInfoController.getNombreOpiniones = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT numOficio FROM fichaEntradaOpinion as fichaOpinion " +
        "WHERE fichaOpinion.idFichaEntradaOpinion =?";
        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
      
    });
}


populateExtraInfoController.getNombrePatronatos = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT ExpedientePatronato.numExpedientePatronato as numPatronato FROM FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
        "RIGHT JOIN ExpedientePatronato ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "WHERE fichaxpatronato.idFichaEntradaPatronato =?";
        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
      
    });
}


populateExtraInfoController.getComunidades = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var matchComunidad = '%' + req.body.matchComunidad + '%';
        var query = "SELECT nombreComunidad FROM Comunidad " +
        "WHERE nombreComunidad LIKE ? AND idMunicipio = ? AND idTipoComunidad = ?";
        connection.query(query, [matchComunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
      
    });
}


populateExtraInfoController.existeDictamen = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT idDictamen FROM Dictamen WHERE numDictamen = ?", [req.body.numDictamen], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0) {
                res.send(true);
            } else{
                res.send(false);
            }
        });
      
    });
}


populateExtraInfoController.existeDictamenMod = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT idDictamen FROM Dictamen WHERE numDictamen = ?", [req.body.numDictamen], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0) {
                res.send(true);
            } else{
                res.send(false);
            }
        });
      
    });
}

populateExtraInfoController.obtenerPrivilegiosDeUsuario = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT PrivilegioXUsuario.idPrivilegio FROM PrivilegioXUsuario WHERE PrivilegioXUsuario.idUsuario = ?";
        connection.query(query, [req.body.idUsuario], (err, results) => {
            var string=JSON.stringify(results);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(string);
        });
      
    });
}


module.exports = populateExtraInfoController;