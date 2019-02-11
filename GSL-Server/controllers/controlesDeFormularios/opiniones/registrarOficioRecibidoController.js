var status = require('http-status');
var registrarOficioController = {};

registrarOficioController.saveOpinion = (req, res, next) => {
	req.getConnection(async function(err, connection) {
    	if (err) return next(err);
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('INSERT INTO FichaEntradaOpinion(idProcedencia, apoderadoLegal, asunto, numOficio, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoOpinion) ' +
                    'VALUES(?, ?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.apoderado, req.body.asunto, req.body.numOficio, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }else {
                
                connection.query('INSERT INTO FichaEntradaOpinion(idProcedencia, asunto, numOficio, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoOpinion) ' +
                    'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.asunto, req.body.numOficio, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }
        });

        var fichaEntradaId = await promise1;
        if(req.body.cantidadExpedientes < 1){
            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
        }else{
            for(let i = 0; i< req.body.cantidadExpedientes; i++){
                let numExpediente = req.body.expedientes[i].numExpediente;
                let folios = req.body.expedientes[i].folios;
                connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [numExpediente], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }

                    if(results.length > 0) {
                        expedienteId = results[0].idExpediente;
                        connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', [folios, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            connection.query('INSERT INTO FichaEntradaOpinionXExpediente(idFichaEntradaOpinion, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(i==req.body.cantidadExpedientes -1) {
                                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                                }
                            });
                        });
                    }else{
                        connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [numExpediente, folios], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            expedienteId = rows.insertId;

                            connection.query('INSERT INTO FichaEntradaOpinionXExpediente(idFichaEntradaOpinion, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(i==req.body.cantidadExpedientes -1) {
                                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                                }
                            });

                        });
                    }

                });
            }
        }      
    });
}


module.exports = registrarOficioController;
