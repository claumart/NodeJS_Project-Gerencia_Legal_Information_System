var status = require('http-status');
var asignarOficioController = {};

asignarOficioController.asignarOpinion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaOpinion SET idAbogadoAsignado = ?, fechaAsignacion = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";
    	connection.query(query, [req.body.numAbogadoAsignado, req.body.fecha, 2, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Opinion asignada correctamente' });
      	});
      
    });
}

module.exports = asignarOficioController;