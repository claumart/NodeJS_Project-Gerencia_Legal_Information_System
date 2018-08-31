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


module.exports = populateExtraInfoController;