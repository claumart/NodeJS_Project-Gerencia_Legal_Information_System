/***********************Hecho por Shirley Claudette Martínez***********************/
var status = require('http-status');
var modPttEntradaController = {};

modPttEntradaController.getFichaEntrada = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaPatronato as idficha, " +
        "idProcedencia, interesado, apoderadoLegal, idAsuntoPatronato, idEmpleadoReceptor, fechaEntrada " +
        "FROM FichaEntradaPatronato " +
        "WHERE idFichaEntradaPatronato = ?";

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


modPttEntradaController.getExpedientes = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT ExpedientePatronato.idExpedientePatronato, ExpedientePatronato.periodoDeValidez, " +
        "ExpedientePatronato.numExpedientePatronato, ExpedientePatronato.folios " +
        "FROM FichaEntradaPatronato as fichapatronato " + 
        "INNER JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "INNER JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "WHERE fichapatronato.idFichaEntradaPatronato = ?";
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

modPttEntradaController.getNombreComunidad = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        connection.query('SELECT nombreComunidad FROM Comunidad WHERE idComunidad = ?', [req.body.idComunidad], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}; 

modPttEntradaController.updateNoAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        if (err) return next(err);
        var idComunidad;
        var numExpGenerado;
        var oldExp;
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('UPDATE FichaEntradaPatronato SET idProcedencia = ?, interesado = ?, apoderadoLegal = ?, idAsuntoPatronato = ?, ' +
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaPatronato = ?', 
                [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, req.body.numEmpleadoReceptor, 
                req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            }else {
                connection.query('UPDATE FichaEntradaPatronato SET idProcedencia = ?, interesado = ?, idAsuntoPatronato = ?, idEmpleadoReceptor = ?, ' +
                    'fechaEntrada =  STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaPatronato = ?', [req.body.idProcedencia, req.body.interesado, 
                    req.body.idAsunto, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            }
        });

        promise1.then((result)=>{
            return new Promise((resolve, reject) => {
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
        }, (err)=>{
            console.log(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                idComunidad = result;
                numExpGenerado = "GPM-" + req.body.codigoMunicipio + "-" + req.body.idTipoComunidad + "-" + idComunidad + "-" + req.body.anioProceso;
                oldExp = req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpedientePatronato;});
                if(oldExp.indexOf(numExpGenerado) == -1){
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
                                [req.body.idFicha, expedienteId], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    resolve("");
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
                                [req.body.idFicha, expedienteId], (err, rows) => {
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
        }, (err)=>{
            console.log(err);
            return next(err);
        }).then((result)=>{
            for(let i=0; i<req.body.expedientesAntiguos.length; i++){
                if(!(req.body.expedientesAntiguos[i].numExpedientePatronato == numExpGenerado)){
                    connection.query('DELETE FROM FichaEntradaPatronatoXExpedientePatronato WHERE idFichaEntradaPatronato = ? AND idExpedientePatronato = ?', 
                    [req.body.idFicha, req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        connection.query('SELECT COUNT(idFichaEntradaPatronato) as numeroRegistros FROM FichaEntradaPatronatoXExpedientePatronato WHERE idExpedientePatronato = ?', 
                        [req.body.expedientesAntiguos[i].idExpedientePatronato], (err, results) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            if(results[0].numeroRegistros ==0){
                                connection.query('DELETE FROM ExpedientePatronato WHERE idExpedientePatronato = ?', 
                                [req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
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
                    connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                    [req.body.foliosIns, req.body.periodoValidez, req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
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
        }, (err)=> {
            console.log(err);
            return next(err);
        });
    });
}

modPttEntradaController.updateAcumulado = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        if (err) return next(err);
        var idComunidad;
        var numExpGenerado;
        var oldExp;
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('UPDATE FichaEntradaPatronato SET idProcedencia = ?, interesado = ?, apoderadoLegal = ?, idAsuntoPatronato = ?, ' +
                'idEmpleadoReceptor = ?, fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaPatronato = ?', 
                [req.body.idProcedencia, req.body.interesado, req.body.apoderado, req.body.idAsunto, req.body.numEmpleadoReceptor, 
                req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            }else {
                connection.query('UPDATE FichaEntradaPatronato SET idProcedencia = ?, interesado = ?, idAsuntoPatronato = ?, idEmpleadoReceptor = ?, ' +
                    'fechaEntrada =  STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\') WHERE idFichaEntradaPatronato = ?', [req.body.idProcedencia, req.body.interesado, 
                    req.body.idAsunto, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            }
        });

        promise1.then((result)=>{
            return new Promise((resolve, reject) => {
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
        }, (err)=>{
            console.log(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                idComunidad = result;
                numExpGenerado = "GPM-" + req.body.codigoMunicipio + "-" + req.body.idTipoComunidad + "-" + idComunidad + "-" + req.body.anioProceso;
                oldExp = req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpedientePatronato;});
                if(oldExp.indexOf(numExpGenerado) == -1){
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
                                [req.body.idFicha, expedienteId], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    resolve("");
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
                                [req.body.idFicha, expedienteId], (err, rows) => {
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
        }, (err)=>{
            console.log(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                for(let i=0; i<req.body.expedientes.length; i++){
                    if(oldExp.indexOf(req.body.expedientes[i].numExpediente) == -1){
                        connection.query('SELECT idExpedientePatronato FROM ExpedientePatronato WHERE numExpedientePatronato = ?', [req.body.expedientes[i].numExpediente], (err, results) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            if(results.length > 0) {
                                expedienteId = results[0].idExpedientePatronato;
                                connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                                [req.body.expedientes[i].folios, req.body.periodoValidez, expedienteId], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                                    [req.body.idFicha, expedienteId], (err, rows) => {
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
                                connection.query('INSERT INTO ExpedientePatronato(idComunidadRelacionada, numExpedientePatronato, periodoDeValidez, folios) VALUES(?, ?, ?, ?)', 
                                [idComunidad, req.body.expedientes[i].numExpediente, req.body.periodoValidez, req.body.expedientes[i].folios], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    }
                                    expedienteId = rows.insertId;
                                    
                                    connection.query('INSERT INTO FichaEntradaPatronatoXExpedientePatronato(idFichaEntradaPatronato, idExpedientePatronato) VALUES(?, ?)', 
                                    [req.body.idFicha, expedienteId], (err, rows) => {
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
                    }else{
                        if(i == req.body.expedientes.length - 1){
                            resolve(req.body.expedientes.map(function(value, index, array){return value.numExpediente;}));
                        }
                    }
                }
                
            });
        }, (err)=>{
            console.log(err);
            return next(err);
        }).then((result)=>{
            for(let i=0; i<req.body.expedientesAntiguos.length; i++){
                if(!(req.body.expedientesAntiguos[i].numExpedientePatronato == numExpGenerado)){
                    let indice = result.indexOf(req.body.expedientesAntiguos[i].numExpedientePatronato)
                    if(indice == -1){
                        connection.query('DELETE FROM FichaEntradaPatronatoXExpedientePatronato WHERE idFichaEntradaPatronato = ? AND idExpedientePatronato = ?', 
                        [req.body.idFicha, req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            connection.query('SELECT COUNT(idFichaEntradaPatronato) as numeroRegistros FROM FichaEntradaPatronatoXExpedientePatronato WHERE idExpedientePatronato = ?', 
                            [req.body.expedientesAntiguos[i].idExpedientePatronato], (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(results[0].numeroRegistros ==0){
                                    connection.query('DELETE FROM ExpedientePatronato WHERE idExpedientePatronato = ?', 
                                    [req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
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
                       connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                        [req.body.expedientes[indice].folios, req.body.periodoValidez, req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            if(i == req.body.expedientesAntiguos.length -1){
                                res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                            }  
                        });   
                    }
                }else{
                    connection.query('UPDATE ExpedientePatronato SET folios = ?, periodoDeValidez = ? WHERE idExpedientePatronato = ?', 
                    [req.body.foliosIns, req.body.periodoValidez, req.body.expedientesAntiguos[i].idExpedientePatronato], (err, rows) => {
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
        }, (err)=> {
            console.log(err);
            return next(err);
        });;  
    });     
}


module.exports = modPttEntradaController;
