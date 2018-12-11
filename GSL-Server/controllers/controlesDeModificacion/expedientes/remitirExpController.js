var status = require('http-status');
var remitirExpController = {};

remitirExpController.remitirExpedientes = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaExpediente SET idDependenciaRemision = ?, fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"recibidoPor = ?, idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?";
    	  connection.query(query, [req.body.dependenciaRemision, req.body.fecha, req.body.recibidoPor, 5, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Expedientes remitidos correctamente' });
      	});
      
  });
}

module.exports = remitirExpController;