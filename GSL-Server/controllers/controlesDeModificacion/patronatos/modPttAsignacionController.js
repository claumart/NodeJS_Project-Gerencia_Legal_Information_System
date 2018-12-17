var status = require('http-status');
var modPttAsignacionController = {};

modPttAsignacionController.getFichaAsignacion = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaPatronato as idficha, " +
        "idAbogadoAsignado, fechaAsignacion " +
        "FROM FichaEntradaPatronato " +
        "WHERE idFichaEntradaPatronato = ?";

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

modPttAsignacionController.updateAsignacion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaPatronato SET idAbogadoAsignado = ?, fechaAsignacion = STR_TO_DATE(?, \'%d-%m-%Y\') " +
      	"WHERE idFichaEntradaPatronato = ?";
    	connection.query(query, [req.body.numAbogadoAsignado, req.body.fecha, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
    });
}

module.exports = modPttAsignacionController;