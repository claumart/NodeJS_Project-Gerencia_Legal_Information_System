var status = require('http-status');
var descargarPatronatoController = {};

descargarPatronatoController.descargarPatronato = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaPatronato SET fechaDescargo = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoPatronato = ? WHERE idFichaEntradaPatronato = ?";
    	connection.query(query, [req.body.fecha, 3, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Patronato descargado correctamente' });
      	});
      
    });
}

module.exports = descargarPatronatoController;