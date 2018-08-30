var status = require('http-status');
var registrarExpController = {};

registrarExpController.saveNoAcumuladoActual = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var fichaEntradaId;
        var expedienteId;
    	connection.query('INSERT INTO FichaEntradaExpediente(idProcedencia, interesado, idAsunto, idEmpleadoReceptor, fechaEntrada, idEstadoExpediente) ' +
            'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
            req.body.numEmpleadoReceptor, req.body.fecha, 1], (err, rows) => {
        	if (err) {
                console.log(err);
                return next(err);
            }
            fichaEntradaId = rows.insertId;
    
            connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.numExpediente], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                if(results.length > 0) {
                    expedienteId = results[0].idExpediente;

                    connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                    });
                }else{
                    connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [req.body.numExpediente, req.body.folios], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        expedienteId = rows.insertId;
                
                        connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                        });

                    });
                }

            });
      	});

      
    });
	//res.json();
}

registrarExpController.saveNoAcumuladoPersonalizada = (req, res, next) => {
	req.getConnection((err, connection)=> {
        if (err) return next(err);
        var fichaEntradaId;
        var expedienteId;
        connection.query('INSERT INTO FichaEntradaExpediente(idProcedencia, interesado, idAsunto, idEmpleadoReceptor, fechaEntrada, idEstadoExpediente) ' +
            'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%Y-%m-%d %H:%i:%s\'), ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
            req.body.numEmpleadoReceptor, req.body.fecha, 1], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
            fichaEntradaId = rows.insertId;

            connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.numExpediente], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                if(results.length > 0) {
                    expedienteId = results[0].idExpediente;

                    connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                    });
                }else{
                    connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [req.body.numExpediente, req.body.folios], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                        expedienteId = rows.insertId;

                        connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                        });

                    });
                }

            });
        });

      
    });
}


registrarExpController.saveAcumuladoActual = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var fichaEntradaId;
        var expedienteId;
        connection.query('INSERT INTO FichaEntradaExpediente(idProcedencia, interesado, idAsunto, idEmpleadoReceptor, fechaEntrada, idEstadoExpediente) ' +
            'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
            req.body.numEmpleadoReceptor, req.body.fecha, 1], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
            fichaEntradaId = rows.insertId;
            var contador = 0;
            for(i = 0; i< req.body.cantidadExpedientes; i++){
                //var numExpediente = ;
                //var folios = ;
                var numExpediente = req.body.numExpedientes[i];
                var folios = req.body.folios[i];
                connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.numExpedientes[i]], (err, results) => {
                    var index = req.body.cantidadExpedientes - contador--;
                    var numExpediente = req.body.numExpedientes[index];
                    var folios = req.body.folios[index];
                    if (err) {
                        console.log(err);
                        return next(err);
                    }

                    if(results.length > 0) {
                        expedienteId = results[0].idExpediente;

                        connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            contador++;
                            if(contador==req.body.cantidadExpedientes) {
                                res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                            }
                        });
                    }else{
                        connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [numExpediente, folios], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                            expedienteId = rows.insertId;

                            connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                contador++;
                                if(contador==req.body.cantidadExpedientes) {
                                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                                }
                            });

                        });
                    }

                });
                
                contador++;
            }

        });     
      
    });
}


registrarExpController.saveAcumuladoPersonalizada = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var fichaEntradaId;
        var expedienteId;
        connection.query('INSERT INTO FichaEntradaExpediente(idProcedencia, interesado, idAsunto, idEmpleadoReceptor, fechaEntrada, idEstadoExpediente) ' +
            'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%Y-%m-%d %H:%i:%s\'), ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
            req.body.numEmpleadoReceptor, req.body.fecha, 1], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
            fichaEntradaId = rows.insertId;
            var contador = 0;
            for(i = 0; i< req.body.cantidadExpedientes; i++){
                //var numExpediente = ;
                //var folios = ;
                var numExpediente = req.body.numExpedientes[i];
                var folios = req.body.folios[i];
                connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.numExpedientes[i]], (err, results) => {
                    var index = req.body.cantidadExpedientes - contador--;
                    var numExpediente = req.body.numExpedientes[index];
                    var folios = req.body.folios[index];
                    if (err) {
                        console.log(err);
                        return next(err);
                    }

                    if(results.length > 0) {
                        expedienteId = results[0].idExpediente;
                        connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            contador++;
                            if(contador==req.body.cantidadExpedientes) {
                                res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                            }
                        });
                    }else{
                        connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [numExpediente, folios], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            //res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                            expedienteId = rows.insertId;

                            connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                contador++;
                                if(contador==req.body.cantidadExpedientes) {
                                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                                }
                            });

                        });
                    }

                });
                
                contador++;
            }

        });     
      
    });
}

module.exports = registrarExpController;
