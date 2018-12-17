var status = require('http-status');
var modOpnEntradaController = {};

modOpnEntradaController.getFichaEntrada = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaOpinion as idficha, idProcedencia, " +
        "apoderadoLegal, asunto, numOficio, idEmpleadoReceptor, fechaEntrada " +
        "FROM FichaEntradaOpinion " +
        "WHERE idFichaEntradaOpinion = ?";

        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });

    });
};

modOpnEntradaController.updateOpinion = (req, res, next) => {
	req.getConnection(async function(err, connection) {
    	if (err) return next(err);
        if(req.body.apoderado != "") {
            await connection.query('UPDATE FichaEntradaOpinion SET idProcedencia = ?, apoderadoLegal = ?, asunto = ?, numOficio = ?, idEmpleadoReceptor = ?, ' +
            'fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE  idFichaEntradaOpinion = ?', [req.body.idProcedencia, req.body.apoderado, 
            req.body.asunto, req.body.numOficio, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
            });
        }else {
            await connection.query('UPDATE FichaEntradaOpinion SET idProcedencia = ?, asunto = ?, numOficio = ?, idEmpleadoReceptor = ?, ' +
            'fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaOpinion = ?', [req.body.idProcedencia, req.body.asunto, 
            req.body.numOficio, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
            });
        }      
    });
}


module.exports = modOpnEntradaController;
