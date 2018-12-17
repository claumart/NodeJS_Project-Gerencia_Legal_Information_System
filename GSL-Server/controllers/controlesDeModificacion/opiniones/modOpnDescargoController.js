var status = require('http-status');
var modOpnDescargoController = {};

modOpnDescargoController.getFichaDescargo = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaOpinion as idficha, " +
        "fechaDescargo FROM FichaEntradaOpinion " +
        "WHERE idFichaEntradaOpinion = ?";

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

modOpnDescargoController.updateDescargo = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaOpinion SET fechaDescargo = STR_TO_DATE(?, \'%d-%m-%Y\') " +
      	"WHERE idFichaEntradaOpinion = ?";
    	connection.query(query, [req.body.fecha, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
    });
}

module.exports = modOpnDescargoController;