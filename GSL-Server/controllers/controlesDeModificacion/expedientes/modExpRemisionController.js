var status = require('http-status');
var modExpRemisionController = {};

modExpRemisionController.getFichaRemision = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaExpediente as idficha, " +
        "idDependenciaRemision, fechaRemision, recibidoPor " +
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

modExpRemisionController.updateRemision = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaExpediente SET idDependenciaRemision = ?, fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"recibidoPor = ? WHERE idFichaEntradaExpediente = ?";
    	  connection.query(query, [req.body.dependenciaRemision, req.body.fecha, req.body.recibidoPor, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
      	});
      
  });
}

module.exports = modExpRemisionController;