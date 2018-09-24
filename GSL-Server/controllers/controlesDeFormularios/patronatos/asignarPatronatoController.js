var status = require('http-status');
var asignarPatronatoController = {};

asignarPatronatoController.asignarPatronato = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      	var query = "UPDATE FichaEntradaPatronato SET idAbogadoAsignado = ?, fechaAsignacion = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
      	"idEstadoPatronato = ? WHERE idFichaEntradaPatronato = ?";
    	connection.query(query, [req.body.numAbogadoAsignado, req.body.fecha, 2, req.body.idFicha], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
        	res.status(status.OK).json({ message: 'Patronato asignado correctamente' });
      	});
      
    });
}

module.exports = asignarPatronatoController;