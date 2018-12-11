var status = require('http-status');
var asignarExpController = {};

asignarExpController.asignarExpedientes = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaExpediente SET idAbogadoAsignado = ?, fechaAsignacion = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?";
    	connection.query(query, [req.body.numAbogadoAsignado, req.body.fecha, 2, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Expedientes asignados correctamente' });
      	});
      
    });
}

module.exports = asignarExpController;