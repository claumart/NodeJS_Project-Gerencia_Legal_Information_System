/***********************Hecho por Shirley Claudette Martínez***********************/
var status = require('http-status');
var registrarPatronatoController = {};

registrarPatronatoController.saveNoAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        if (err) return next(err);
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('INSERT INTO FichaEntradaPatronato(idProcedencia, interesado, apoderadoLegal, idAsuntoPatronato, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoPatronato) ' +
                    'VALUES(?, ?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }else {
                connection.query('INSERT INTO FichaEntradaPatronato(idProcedencia, interesado, idAsuntoPatronato, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoPatronato) ' +
                    'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }
        });

        let promise2 = new Promise((resolve, reject) => {
            connection.query('SELECT idComunidad FROM Comunidad WHERE nombreComunidad = ? AND idMunicipio = ? AND idTipoComunidad = ?', 
                [req.body.comunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                if(results.length > 0) {
                    resolve(results[0].idComunidad);
                }else{
                    connection.query('INSERT INTO Comunidad(nombreComunidad, idMunicipio, idTipoComunidad) VALUES(?, ?, ?)', [req.body.comunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        resolve(rows.insertId);
                    });
                }

            });
        });

        var fichaEntradaId = await promise1;
        var idComunidad = await promise2;
        var numExpGenerado = "GPM-" + req.body.codigoMunicipio + "-" + req.body.idTipoComunidad + "-" + idComunidad + "-" + req.body.anioProceso;
        connection.query('SELECT idExpedientePatronato FROM ExpedientePatronato WHERE numExpedientePatronato = ?', [numExpGenerado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0) {
                expedienteId = results[0].idExpedientePatronato;
                connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                [req.body.foliosIns, req.body.periodoValidez, expedienteId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                    [fichaEntradaId, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                    });
                });  
            }else{
                connection.query('INSERT INTO ExpedientePatronato(idComunidadRelacionada, numExpedientePatronato, periodoDeValidez, folios) VALUES(?, ?, ?, ?)', 
                [idComunidad, numExpGenerado, req.body.periodoValidez, req.body.foliosIns], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    expedienteId = rows.insertId;
                    
                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                    [fichaEntradaId, expedienteId], (err, rows) => {
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

}


registrarPatronatoController.saveAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection){
        if (err) return next(err);
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('INSERT INTO FichaEntradaPatronato(idProcedencia, interesado, apoderadoLegal, idAsuntoPatronato, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoPatronato) ' +
                    'VALUES(?, ?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }else {
                connection.query('INSERT INTO FichaEntradaPatronato(idProcedencia, interesado, idAsuntoPatronato, idEmpleadoReceptor, fechaEntrada, informacionAdicional, idEstadoPatronato) ' +
                    'VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), ?, ?)', [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, 
                    req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, 1], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            }
        });

        let promise2 = new Promise((resolve, reject) => {
            connection.query('SELECT idComunidad FROM Comunidad WHERE nombreComunidad = ? AND idMunicipio = ? AND idTipoComunidad = ?', 
                [req.body.comunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                if(results.length > 0) {
                    resolve(results[0].idComunidad);
                }else{
                    connection.query('INSERT INTO Comunidad(nombreComunidad, idMunicipio, idTipoComunidad) VALUES(?, ?, ?)', [req.body.comunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        resolve(rows.insertId);
                    });
                }

            });
        });

        var fichaEntradaId = await promise1;
        var idComunidad = await promise2;
        var numExpGenerado = "GPM-" + req.body.codigoMunicipio + "-" + req.body.idTipoComunidad + "-" + idComunidad + "-" + req.body.anioProceso;


       connection.query('SELECT idExpedientePatronato FROM ExpedientePatronato WHERE numExpedientePatronato = ?', [numExpGenerado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0) {
                var expedienteInsId = results[0].idExpedientePatronato;
                connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                [req.body.foliosIns, req.body.periodoValidez, expedienteInsId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                    [fichaEntradaId, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }  
                    });
                });  
            }else{
                connection.query('INSERT INTO ExpedientePatronato(idComunidadRelacionada, numExpedientePatronato, periodoDeValidez, folios) VALUES(?, ?, ?, ?)', 
                [idComunidad, numExpGenerado, req.body.periodoValidez, req.body.foliosIns], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    var expedienteInsId = rows.insertId;
                    
                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                    [fichaEntradaId, expedienteInsId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                    });

                });
            }

        });


        for(let i = 0; i< req.body.cantidadExpedientes; i++){
            let numExpediente = req.body.expedientes[i].numExpediente;
            let folios = req.body.expedientes[i].folios;
            connection.query('SELECT idExpedientePatronato FROM ExpedientePatronato WHERE numExpedientePatronato = ?', [numExpediente], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                if(results.length > 0) {
                    expedienteId = results[0].idExpedientePatronato;
                    connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                    [folios, req.body.periodoValidez, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                        [fichaEntradaId, expedienteId], (err, rows) => {
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
                    connection.query('INSERT INTO ExpedientePatronato(idComunidadRelacionada, numExpedientePatronato, periodoDeValidez, folios) VALUES(?, ?, ?, ?)', 
                    [idComunidad, numExpediente, req.body.periodoValidez, folios], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        expedienteId = rows.insertId;
                        
                        connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                        [fichaEntradaId, expedienteId], (err, rows) => {
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

    });     
}


module.exports = registrarPatronatoController;
