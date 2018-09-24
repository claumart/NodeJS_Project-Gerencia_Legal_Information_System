var status = require('http-status');
var descargarOficioController = {};

descargarOficioController.descargarOpinion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaOpinion SET fechaDescargo = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";
    	connection.query(query, [req.body.fecha, 3, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Opinion descargada correctamente' });
      	});
      
    });
}

module.exports = descargarOficioController;