var status = require('http-status');
var remitirOficioController = {};

remitirOficioController.remitirOpinion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	/*var query = "UPDATE FichaEntradaOpinion SET idDependenciaRemision = ?, fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"recibidoPor = ?, idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";*/
        var query = "UPDATE FichaEntradaOpinion SET fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
        "recibidoPor = ?, idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";
    	  connection.query(query, [req.body.fecha, req.body.recibidoPor, 5, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Opinión remitida correctamente' });
      	});
      
  });
}

module.exports = remitirOficioController;