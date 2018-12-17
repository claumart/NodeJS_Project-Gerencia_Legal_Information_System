var status = require('http-status');
var modPttDescargoController = {};

modPttDescargoController.getFichaDescargo = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaPatronato as idficha, " +
        "fechaDescargo FROM FichaEntradaPatronato " +
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

modPttDescargoController.updateDescargo = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaPatronato SET fechaDescargo = STR_TO_DATE(?, \'%d-%m-%Y\') " +
      	"WHERE idFichaEntradaPatronato = ?";
    	connection.query(query, [req.body.fecha, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
    });
}

module.exports = modPttDescargoController;