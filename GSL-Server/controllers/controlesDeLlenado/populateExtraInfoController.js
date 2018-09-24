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


module.exports = populateExtraInfoController;