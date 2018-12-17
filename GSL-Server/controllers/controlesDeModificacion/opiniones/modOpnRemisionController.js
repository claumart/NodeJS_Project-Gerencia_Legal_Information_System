var status = require('http-status');
var modOpnRemisionController = {};

modOpnRemisionController.getFichaRemision = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaOpinion as idficha, " +
        "fechaRemision, recibidoPor " +
        "FROM FichaEntradaOpinion " +
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

modOpnRemisionController.updateRemision = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = "UPDATE FichaEntradaOpinion SET fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
        "recibidoPor = ? WHERE idFichaEntradaOpinion = ?";
    	  connection.query(query, [req.body.fecha, req.body.recibidoPor, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
  });
}

module.exports = modOpnRemisionController;