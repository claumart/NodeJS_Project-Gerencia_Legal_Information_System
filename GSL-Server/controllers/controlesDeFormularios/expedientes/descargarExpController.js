var status = require('http-status');
var descargarExpController = {};

descargarExpController.descargarExpedientes = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaExpediente SET fechaDescargo = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?";
    	connection.query(query, [req.body.fecha, 3, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Expedientes descargados correctamente' });
      	});
      
    });
}

module.exports = descargarExpController;