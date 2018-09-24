var status = require('http-status');
var remitirOficioController = {};

remitirOficioController.remitirOpinion = (req, res, next) => {
  req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaPatronato SET idDependenciaRemision = ?, fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"recibidoPor = ?, idEstadoPatronato = ? WHERE idFichaEntradaPatronato = ?";
    	  connection.query(query, [req.body.dependenciaRemision, req.body.fecha, req.body.recibidoPor, 5, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Patronato remitido correctamente' });
      	});
      
  });
}

module.exports = remitirOficioController;
