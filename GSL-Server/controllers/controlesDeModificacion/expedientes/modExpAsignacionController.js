var status = require('http-status');
var modExpAsignacionController = {};

modExpAsignacionController.getFichaAsignacion = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaExpediente as idficha, " +
        "idAbogadoAsignado, fechaAsignacion " +
        "FROM fichaEntradaExpediente " +
        "WHERE idFichaEntradaExpediente = ?";

        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
};

modExpAsignacionController.updateAsignacion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaExpediente SET idAbogadoAsignado = ?, fechaAsignacion = STR_TO_DATE(?, \'%d-%m-%Y\') " +
      	"WHERE idFichaEntradaExpediente = ?";
    	connection.query(query, [req.body.numAbogadoAsignado, req.body.fecha, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
    });
}

module.exports = modExpAsignacionController;