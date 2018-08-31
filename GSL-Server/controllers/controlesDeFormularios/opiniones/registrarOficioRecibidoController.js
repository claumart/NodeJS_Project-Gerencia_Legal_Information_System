var status = require('http-status');
var registrarOficioController = {};

registrarOficioController.saveOpinion = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
    	connection.query('INSERT INTO FichaEntradaOpinion(idProcedencia, idAsunto, numOficio, idEmpleadoReceptor, fechaEntrada, idEstadoOpinion) ' +
            'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?)', [req.body.idProcedencia, req.body.idAsunto, req.body.numOficio, 
            req.body.numEmpleadoReceptor, req.body.fecha, 1], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
      	});
      
    });
}


module.exports = registrarOficioController;
