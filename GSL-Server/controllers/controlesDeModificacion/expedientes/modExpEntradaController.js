/***********************Hecho por Shirley Claudette Martínez***********************/
var status = require('http-status');
var modExpEntradaController = {};

modExpEntradaController.getFichaEntrada = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaExpediente as idficha, " +
        "idProcedencia, interesado, apoderadoLegal, idAsunto, idEmpleadoReceptor, fechaEntrada " +
        "FROM fichaEntradaExpediente " +
        "WHERE idFichaEntradaExpediente = ?";

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

modExpEntradaController.getExpedientes = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT Expediente.idExpediente, " +
        "Expediente.numExpediente, Expediente.folios " +
        "FROM fichaentradaexpediente as fichaexp " + 
        "INNER JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "INNER JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "WHERE fichaexp.idFichaEntradaExpediente = ?";
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

modExpEntradaController.updateNoAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        if (err) return next(err);
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('UPDATE FichaEntradaExpediente SET idProcedencia = ?, interesado = ?, apoderadoLegal = ?, idAsunto = ?, ' + 
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaExpediente = ?',
                [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, 
                req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpediente;}));
                });
            }else {
                connection.query('UPDATE FichaEntradaExpediente SET idProcedencia = ?, interesado = ?, idAsunto = ?, ' + 
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaExpediente = ?', 
                [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpediente;}));
                });
            }
        });

        var oldExp = await promise1;
        let promise2 = new Promise((resolve, reject) => {
            if(oldExp.indexOf(req.body.numExpediente) == -1){
                connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.numExpediente], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }

                    if(results.length > 0) {
                        expedienteId = results[0].idExpediente;
                        connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', [req.body.folios, expedienteId], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                resolve("");
                            });
                        });
                    }else{
                        connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [req.body.numExpediente, req.body.folios], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            expedienteId = rows.insertId;
                            
                            connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                resolve("");
                            });

                        });
                    }

                });
            }else{
                resolve("");        
            }
        });

        promise2.then(function(result){
            for(let i=0; i<req.body.expedientesAntiguos.length; i++){
                if(req.body.expedientesAntiguos[i].numExpediente != req.body.numExpediente){
                    connection.query('DELETE FROM FichaEntradaExpedienteXExpediente WHERE idFichaEntradaExpediente = ? AND idExpediente = ?', 
                    [req.body.idFicha, req.body.expedientesAntiguos[i].idExpediente], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpedienteXExpediente WHERE idExpediente = ?', 
                        [req.body.expedientesAntiguos[i].idExpediente], (err, results) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            if(results[0].numeroRegistros ==0){
                                connection.query('DELETE FROM Expediente WHERE idExpediente = ?', 
                                [req.body.expedientesAntiguos[i].idExpediente], (err, results) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    if(i == req.body.expedientesAntiguos.length -1){
                                        res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                                    }     
                                });
                            }else{
                               if(i == req.body.expedientesAntiguos.length -1){
                                    res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                                }  
                            }     
                        });
                    });
                }else{
                    connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', [req.body.folios, req.body.expedientesAntiguos[i].idExpediente], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        if(i == req.body.expedientesAntiguos.length -1){
                            res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                        }  
                    });  
                }
            }
        }, function(err) {
            console.log(err);
            return next(err);
        });

        
    });

}


modExpEntradaController.updateAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection){ 
        if (err) return next(err);
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('UPDATE FichaEntradaExpediente SET idProcedencia = ?, interesado = ?, apoderadoLegal = ?, idAsunto = ?, ' + 
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaExpediente = ?',
                [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, 
                req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpediente;}));
                });
            }else {
                connection.query('UPDATE FichaEntradaExpediente SET idProcedencia = ?, interesado = ?, idAsunto = ?, ' + 
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaExpediente = ?', 
                [req.body.idProcedencia, req.body.interesado, req.body.idAsunto, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpediente;}));
                });
            }
        });

        var oldExp = await promise1;
        let promise2 = new Promise((resolve, reject) => {
            for(let i=0; i<req.body.expedientes.length; i++) {
                if(oldExp.indexOf(req.body.expedientes[i].numExpediente) == -1){
                    connection.query('SELECT idExpediente FROM Expediente WHERE numExpediente = ?', [req.body.expedientes[i].numExpediente], (err, results) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }

                        if(results.length > 0) {
                            expedienteId = results[0].idExpediente;
                            connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', [req.body.expedientes[i].folios, expedienteId], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    if(i == req.body.expedientes.length - 1){
                                        resolve(req.body.expedientes.map(function(value, index, array){return value.numExpediente;}));
                                    }
                                });
                            });
                        }else{
                            connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [req.body.expedientes[i].numExpediente, req.body.expedientes[i].folios], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                expedienteId = rows.insertId;
                                
                                connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    if(i == req.body.expedientes.length - 1){
                                        resolve(req.body.expedientes.map(function(value, index, array){return value.numExpediente;}));
                                    }
                                });

                            });
                        }
                    });
                }
            }
        });

        var newExp = await promise2;
        for(let i=0; i<req.body.expedientesAntiguos.length; i++){
            let indice = newExp.indexOf(req.body.expedientesAntiguos[i].numExpediente);
            if(indice == -1){
                connection.query('DELETE FROM FichaEntradaExpedienteXExpediente WHERE idFichaEntradaExpediente = ? AND idExpediente = ?', 
                [req.body.idFicha, req.body.expedientesAntiguos[i].idExpediente], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpedienteXExpediente WHERE idExpediente = ?', 
                    [req.body.expedientesAntiguos[i].idExpediente], (err, results) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        if(results[0].numeroRegistros ==0){
                            connection.query('DELETE FROM Expediente WHERE idExpediente = ?', 
                            [req.body.expedientesAntiguos[i].idExpediente], (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(i == req.body.expedientesAntiguos.length -1){
                                    res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                                }     
                            });
                        }else{
                            if(i == req.body.expedientesAntiguos.length -1){
                                res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                            }  
                        }      
                    });
                });
            }else{
                connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', [req.body.req.body.expedientes[indice].folios, req.body.expedientesAntiguos[i].idExpediente], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    if(i == req.body.expedientesAntiguos.length -1){
                        res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                    }
                });    
            }
        }
    });     
}


module.exports = modExpEntradaController;
