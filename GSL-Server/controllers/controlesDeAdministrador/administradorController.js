var administradorController = {};
var status = require('http-status');
var fs = require('fs-extra');
var path = require('../controlesDeFormularios/dictamenPath');

administradorController.mostrarExpedientePorNumero = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "LEFT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "WHERE numExpediente = ? GROUP BY fichaexp.idFichaEntradaExpediente " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "RIGHT JOIN EstadoExpediente " +
            "ON EstadoExpediente.idEstadoExpediente = fichaexp.idEstadoExpediente " +
        "WHERE numExpediente = ? GROUP BY fichaexp.idFichaEntradaExpediente";
        connection.query(query, [req.body.numExpediente, req.body.numExpediente], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

administradorController.mostrarOpinionPorOficio = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.numOficio = ? " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE fichaOpinion.numOficio = ?";
        connection.query(query, [req.body.numOficio, req.body.numOficio], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}


administradorController.mostrarPatronatoPorNumero = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichapatronato.idFichaEntradaPatronato as idficha, GROUP_CONCAT(ExpedientePatronato.numExpedientePatronato SEPARATOR ', ') " + 
        "as numExpediente, CONCAT(TipoComunidad.nombreTipoComunidad, \' \' , Comunidad.nombreComunidad) AS comunidad, " +
        "AsuntoPatronato.nombreAsuntoPatronato as nombreAsunto, fichapatronato.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM FichaEntradaPatronato as fichapatronato " +
        "LEFT JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "LEFT JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "LEFT JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        "LEFT JOIN TipoComunidad " +
            "ON TipoComunidad.idTipoComunidad = Comunidad.idTipoComunidad " +
        "LEFT JOIN AsuntoPatronato " +
            "ON AsuntoPatronato.idAsuntoPatronato = fichapatronato.idAsuntoPatronato " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichapatronato.idAbogadoAsignado " +
        "WHERE ExpedientePatronato.numExpedientePatronato = ? GROUP BY fichapatronato.idFichaEntradaPatronato " +
        "UNION " +
        "SELECT fichapatronato.idFichaEntradaPatronato as idficha, GROUP_CONCAT(ExpedientePatronato.numExpedientePatronato SEPARATOR ', ') " + 
        "as numExpediente, CONCAT(TipoComunidad.nombreTipoComunidad, \' \', Comunidad.nombreComunidad) AS comunidad, " +
        "AsuntoPatronato.nombreAsuntoPatronato as nombreAsunto, fichapatronato.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM FichaEntradaPatronato as fichapatronato " +
        "RIGHT JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "RIGHT JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "RIGHT JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        "RIGHT JOIN TipoComunidad " +
            "ON TipoComunidad.idTipoComunidad = Comunidad.idTipoComunidad " +
        "RIGHT JOIN AsuntoPatronato " +
            "ON AsuntoPatronato.idAsuntoPatronato = fichapatronato.idAsuntoPatronato " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichapatronato.idAbogadoAsignado " +
        "WHERE ExpedientePatronato.numExpedientePatronato = ? GROUP BY fichapatronato.idFichaEntradaPatronato";
        connection.query(query, [req.body.numExpediente, req.body.numExpediente], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}


administradorController.eliminarExpediente = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var idDictamen;
        var expedientes = [];
        var promise = new Promise((resolve, reject)=>{
            connection.query("SELECT idDictamen FROM FichaEntradaExpediente WHERE idFichaEntradaExpediente = ?", [req.body.idFicha], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if(results.length > 0) {
                    idDictamen = results[0].idDictamen;
                }
                resolve("");
            });
        });

        promise.then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query("SELECT idExpediente FROM FichaEntradaExpedienteXExpediente WHERE idFichaEntradaExpediente = ?", [req.body.idFicha], async(err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    if(results.length > 0) {
                        expedientes = results;
                    }
                    
                    resolve("");
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query("DELETE FROM FichaEntradaExpediente WHERE idFichaEntradaExpediente = ?", [req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise(async (resolve, reject)=>{
                if(idDictamen != null){
                    var dictamenPath = path + "/" + idDictamen;
                    fs.remove(dictamenPath, err => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }
                    });
                    connection.query("DELETE FROM Dictamen WHERE idDictamen = ?", [idDictamen], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        resolve("");
                    });
                }else{
                    resolve("");
                }  
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                for(let i = 0; i< expedientes.length; i++){
                    connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpedienteXExpediente WHERE idExpediente = ?', 
                    [expedientes[i].idExpediente], (err, results) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        if(results[0].numeroRegistros ==0){
                            connection.query('DELETE FROM Expediente WHERE idExpediente = ?', [expedientes[i].idExpediente], (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(i == expedientes.length -1){
                                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                                }     
                            });
                        }else{
                            if(i == expedientes.length -1){
                                res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                            }  
                        }      
                    });
                }
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}


administradorController.eliminarOpinion = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var idDictamen;
        var expedientes = [];
        var promise = new Promise((resolve, reject)=>{
            connection.query("SELECT idDictamen FROM FichaEntradaOpinion WHERE idFichaEntradaOpinion = ?", [req.body.idFicha], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if(results.length > 0) {
                    idDictamen = results[0].idDictamen;
                }
                resolve("");
            });
        });

        promise.then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query("DELETE FROM FichaEntradaOpinion WHERE idFichaEntradaOpinion = ?", [req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise(async (resolve, reject)=>{
                if(idDictamen != null){
                    var dictamenPath = path + "/" + idDictamen;
                    fs.remove(dictamenPath, err => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }
                    });
                    connection.query("DELETE FROM Dictamen WHERE idDictamen = ?", [idDictamen], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                    });
                }else{
                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                }  
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.eliminarPatronato = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var idDictamen;
        var expedientes = [];
        var promise = new Promise((resolve, reject)=>{
            connection.query("SELECT idDictamen FROM FichaEntradaPatronato WHERE idFichaEntradaPatronato = ?", [req.body.idFicha], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if(results.length > 0) {
                    idDictamen = results[0].idDictamen;
                }
                resolve("");
            });
        });

        promise.then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query("SELECT idExpedientePatronato FROM FichaEntradaPatronatoXExpedientePatronato WHERE idFichaEntradaPatronato = ?", 
                [req.body.idFicha], async(err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    if(results.length > 0) {
                        expedientes = results;
                    }
                    
                    resolve("");
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query("DELETE FROM FichaEntradaPatronato WHERE idFichaEntradaPatronato = ?", [req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve("");
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise(async (resolve, reject)=>{
                if(idDictamen != null){
                    var dictamenPath = path + "/" + idDictamen;
                    fs.remove(dictamenPath, err => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }
                    });
                    connection.query("DELETE FROM Dictamen WHERE idDictamen = ?", [idDictamen], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        resolve("");
                    });
                }else{
                    resolve("");
                }  
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject)=>{
                for(let i = 0; i< expedientes.length; i++){
                    connection.query('SELECT COUNT(idFichaEntradaPatronato) as numeroRegistros FROM FichaEntradaPatronatoXExpedientePatronato WHERE idExpedientePatronato = ?', 
                    [expedientes[i].idExpedientePatronato], (err, results) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        if(results[0].numeroRegistros ==0){
                            connection.query('DELETE FROM ExpedientePatronato WHERE idExpedientePatronato = ?', [expedientes[i].idExpedientePatronato], (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                if(i == expedientes.length -1){
                                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                                }     
                            });
                        }else{
                            if(i == expedientes.length -1){
                                res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                            }  
                        }      
                    });
                }
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.registrarDependencia = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idDependencia) as numeroRegistros FROM Dependencia WHERE nombreDependencia = ?', 
        [req.body.nombreDependencia], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("INSERT INTO Dependencia(nombreDependencia) VALUES(?)", [req.body.nombreDependencia], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.eliminarDependencia = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var numeroRegistrosExp;
        var numeroRegistrosOpn;
        var numeroRegistrosPtt;
        var numeroRegistrosPrevision;
        var promise = new Promise((resolve, reject)=>{
            connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpediente WHERE ' +
            'idProcedencia = ? OR idDependenciaRemision = ?', [req.body.idDependencia, req.body.idDependencia], (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                resolve(results[0].numeroRegistros);
            });
        });

        promise.then((result)=>{
            numeroRegistrosExp = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idFichaEntradaOpinion) as numeroRegistros FROM FichaEntradaOpinion WHERE ' +
                'idProcedencia = ?', [req.body.idDependencia], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosOpn = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idFichaEntradaPatronato) as numeroRegistros FROM FichaEntradaPatronato WHERE ' +
                'idProcedencia = ? OR idDependenciaRemision = ?', [req.body.idDependencia, req.body.idDependencia], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosPtt = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idPrevisionExpediente) as numeroRegistros FROM PrevisionExpediente WHERE ' +
                'idDependenciaRemision = ? OR idDependenciaRetorno = ?', [req.body.idDependencia, req.body.idDependencia], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                }); 
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosPrevision = result;
            return new Promise((resolve, reject)=>{
                if(numeroRegistrosExp > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de expedientes' });
                }else if(numeroRegistrosOpn > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de opiniones' });
                }else if(numeroRegistrosPtt > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de patronatos' });
                }else if(numeroRegistrosPrevision > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de providencia' });
                }else{
                    connection.query("DELETE FROM Dependencia WHERE idDependencia = ?", [req.body.idDependencia], (err, rows) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                    });
                }
            });       
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.actualizarDependencia = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idDependencia) as numeroRegistros FROM Dependencia WHERE nombreDependencia = ?', 
        [req.body.nombreDependencia], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("UPDATE Dependencia SET nombreDependencia = ? WHERE idDependencia = ?", [req.body.nombreDependencia, req.body.idDependencia], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro actualizado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
        
    });
}

administradorController.registrarAsunto = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idAsunto) as numeroRegistros FROM Asunto WHERE nombreAsunto = ?', 
        [req.body.nombreAsunto], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("INSERT INTO Asunto(nombreAsunto) VALUES(?)", [req.body.nombreAsunto], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.eliminarAsunto = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpediente WHERE idAsunto = ?', 
        [req.body.idAsunto], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros == 0){
                connection.query("DELETE FROM Asunto WHERE idAsunto = ?", [req.body.idAsunto], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de expedientes' });
            }      
        });
    });
}

administradorController.actualizarAsunto = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idAsunto) as numeroRegistros FROM Asunto WHERE nombreAsunto = ?', 
        [req.body.nombreAsunto], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros == 0){
                connection.query("UPDATE Asunto SET nombreAsunto = ? WHERE idAsunto = ?", [req.body.nombreAsunto, req.body.idAsunto], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro actualizado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.registrarEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("INSERT INTO Empleado(nombreEmpleado, activo, idCargo) VALUES(?, ?, ?)", 
        [req.body.nombreEmpleado, req.body.activo, req.body.idCargo], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return next(err);
            }
            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
        });
    });
}

administradorController.eliminarEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var numeroRegistrosExp;
        var numeroRegistrosOpn;
        var numeroRegistrosPtt;
        var numeroRegistrosPrevision;
        var numEmpleado;
        var promise = new Promise((resolve, reject)=>{
            connection.query('SELECT numEmpleado FROM Usuario WHERE identificacionUsuario = ?', 
	        [req.session.userId], (err, results) => {
	            if (err) {
	                console.log(err);
	                return next(err);
	            }
	            numEmpleado = results[0].numEmpleado;
	            resolve("");
	        });
        });

        promise.then((result)=>{
        	return new Promise((resolve, reject)=>{
        		connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpediente WHERE ' +
	            'idEmpleadoReceptor = ? OR idAbogadoAsignado = ?', [req.body.numEmpleado, req.body.numEmpleado], (err, results) => {
	                if (err) {
	                    console.log(err);
	                    return next(err);
	                }
	                resolve(results[0].numeroRegistros);
	            });
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosExp = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idFichaEntradaOpinion) as numeroRegistros FROM FichaEntradaOpinion WHERE ' +
                'idEmpleadoReceptor = ? OR idAbogadoAsignado = ?', [req.body.numEmpleado, req.body.numEmpleado], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosOpn = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idFichaEntradaPatronato) as numeroRegistros FROM FichaEntradaPatronato WHERE ' +
                'idEmpleadoReceptor = ? OR idAbogadoAsignado = ?', [req.body.numEmpleado, req.body.numEmpleado], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosPtt = result;
            return new Promise((resolve, reject)=>{
                connection.query('SELECT COUNT(idPrevisionExpediente) as numeroRegistros FROM PrevisionExpediente WHERE ' +
                'idEmpleadoReceptor = ?', [req.body.numEmpleado], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(results[0].numeroRegistros);
                }); 
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            numeroRegistrosPrevision = result;
            return new Promise((resolve, reject)=>{
                if(numeroRegistrosExp > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de expedientes' });
                }else if(numeroRegistrosOpn > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de opiniones' });
                }else if(numeroRegistrosPtt > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de patronatos' });
                }else if(numeroRegistrosPrevision > 0){
                    res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de providencia' });
                }else{
                    connection.query("DELETE FROM Empleado WHERE numEmpleado = ?", [req.body.numEmpleado], (err, rows) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }
                        if(numEmpleado == req.body.numEmpleado){
				        	req.session = null;
				        	res.status(status.OK).json({ message: 'Si' });
				        }else{
				            res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
				        }  
                    });
                }
            });       
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.actualizarEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var promise = new Promise((resolve, reject)=>{
            connection.query('SELECT numEmpleado FROM Usuario WHERE identificacionUsuario = ?', 
	        [req.session.userId], (err, results) => {
	            if (err) {
	                console.log(err);
	                return next(err);
	            }
	            resolve(results[0].numEmpleado);
	        });
        });

        promise.then((result)=>{
        	return new Promise((resolve, reject)=>{
        		connection.query("UPDATE Empleado SET nombreEmpleado = ?, activo = ?, idCargo = ?  WHERE numEmpleado = ?", 
		        [req.body.nombreEmpleado, req.body.activo, req.body.idCargo, req.body.numEmpleado], (err, rows) => {
		            if (err) {
		                console.log(err);
		                res.status(500).send(err);
		                return next(err);
		            }
		            if(result == req.body.numEmpleado){
				        req.session.nombreEmpleado = req.body.nombreEmpleado;
				    }
				    res.status(status.OK).json({ message: 'Registro actualizado correctamente' });  
		        });
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.registrarCargoEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idCargoEmpleado) as numeroRegistros FROM CargoEmpleado WHERE nombreCargoEmpleado = ?', 
        [req.body.nombreCargoEmpleado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("INSERT INTO CargoEmpleado(nombreCargoEmpleado) VALUES(?)", [req.body.nombreCargoEmpleado], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.eliminarCargoEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(numEmpleado) as numeroRegistros FROM Empleado WHERE idCargo = ?', 
        [req.body.idCargoEmpleado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("DELETE FROM CargoEmpleado WHERE idCargoEmpleado = ?", [req.body.idCargoEmpleado], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de empleados' });
            }      
        });
    });
}

administradorController.actualizarCargoEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idCargoEmpleado) as numeroRegistros FROM CargoEmpleado WHERE nombreCargoEmpleado = ?', 
        [req.body.nombreCargoEmpleado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros == 0){
                connection.query("UPDATE CargoEmpleado SET nombreCargoEmpleado = ? WHERE idCargoEmpleado = ?", [req.body.nombreCargoEmpleado, req.body.idCargoEmpleado], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro actualizado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.eliminarComunidad = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idExpedientePatronato) as numeroRegistros FROM ExpedientePatronato WHERE idComunidadRelacionada = ?', 
        [req.body.idComunidad], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros ==0){
                connection.query("DELETE FROM Comunidad WHERE idComunidad = ?", [req.body.idComunidad], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro eliminado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'No se puede eliminar el registro porque está siendo usado en los registros de expedientes de patronato' });
            }      
        });
    });
}

administradorController.actualizarComunidad = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT COUNT(idComunidad) as numeroRegistros FROM Comunidad WHERE nombreComunidad = ? AND idMunicipio = ? AND idTipoComunidad = ?', 
        [req.body.nombreComunidad, req.body.idMunicipio, req.body.idTipoComunidad], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results[0].numeroRegistros == 0){
                connection.query("UPDATE Comunidad SET nombreComunidad = ?, idMunicipio = ?, idTipoComunidad = ? WHERE idComunidad = ?", 
                [req.body.nombreComunidad, req.body.idMunicipio, req.body.idTipoComunidad, req.body.idComunidad], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro actualizado correctamente' });
                });
            }else{
                res.status(status.OK).json({ message: 'El registro ya se encuentra en la base de datos' });
            }      
        });
    });
}

administradorController.empleadoPoseeUsuario = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT idUsuario FROM Usuario WHERE numEmpleado = ?', 
        [req.body.numEmpleado], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if(results.length > 0){
            	res.send(true);
            }else{
            	res.send(false);
            }    
        });   
    });
}


administradorController.existeUserId = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT identificacionUsuario FROM Usuario WHERE identificacionUsuario = ?", [req.body.userId], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0){
	            res.send(true);
	        }else {
            	res.send(false);
            }
        });
      
    });
}

administradorController.registrarUsuario = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var empleadoPoseeUsuario;
        var existeUserId;
        var promise = new Promise((resolve, reject)=>{
        	connection.query('SELECT idUsuario FROM Usuario WHERE numEmpleado = ?', 
	        [req.body.numEmpleado], (err, results) => {
	            if (err) {
	                console.log(err);
	                return next(err);
	            }
	            if(results.length >0){
        			empleadoPoseeUsuario = true;
	        	}else{
	        		empleadoPoseeUsuario = 	false;
	        	}
	            resolve("");  
	        });
        });
        
        promise.then((result)=>{
        	return new Promise((resolve, reject)=>{
		        connection.query("SELECT identificacionUsuario FROM Usuario WHERE identificacionUsuario = ?", [req.body.userId], (err, results) => {
				    if (err) {
				        console.log(err);
				        return next(err);
				    }
				    if(results.length >0){
	        			existeUserId = true;
		        	}else{
		        		existeUserId = 	false;
		        	}
				    resolve("");    
				});
		    });
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
        		if(!empleadoPoseeUsuario && !existeUserId){
        			if(req.body.password == req.body.passwordVerification){
        				connection.query("INSERT INTO Usuario(numEmpleado, identificacionUsuario, password) VALUES(?, ?, ?)", 
						[req.body.numEmpleado, req.body.identificacionUsuario, req.body.password], async(err, rows) => {
						    if (err) {
						        console.log(err);
						        res.status(500).send(err);
						        return next(err);
						    }
						    let idUsuario = rows.insertId;
						    for(let i = 0; i < req.body.privilegios.length; i++){
								await connection.query("INSERT INTO PrivilegioXUsuario(idPrivilegio, idUsuario) VALUES(?, ?)", 
								[req.body.privilegios[i], idUsuario], (err, rows) => {
					                if (err) {
					                    console.log(err);
					                    res.status(500).send(err);
					                    return next(err);
					                }
					                if(i == req.body.privilegios.length -1){
					                   	res.status(status.OK).json({ message: 'Registro guardado correctamente' });
					                }
					            });
						    }
						});
        			}else{
        				res.status(status.OK).json({ message: 'No se pudo guardar el registro porque las contraseñas no coinciden' });
        			}
	        	}else{
	        		res.status(status.OK).json({ message: 'No se pudo guardar el registro ya que la información está corrupta' });
	        	}
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

administradorController.eliminarUsuario = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT idUsuario FROM Usuario WHERE identificacionUsuario = ?', 
        [req.session.userId], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            connection.query("DELETE FROM Usuario WHERE idUsuario = ?", [req.body.idUsuario], (err, rows) => {
		        if (err) {
		            console.log(err);
		            res.status(500).send(err);
		            return next(err);
		        }
		        if(results[0].idUsuario == req.body.idUsuario){
		        	req.session = null;
		        	res.status(status.OK).send(true);
		        }else{
		            res.status(status.OK).send(false);
		        }  
		    });    
        });
    });
}

administradorController.actualizarUsuario = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        let idUsuario;
        var empleadoPoseeUsuario;
        var existeUserId;
        var promise = new Promise((resolve, reject)=>{
        	connection.query('SELECT idUsuario FROM Usuario WHERE identificacionUsuario = ?', 
	        [req.session.userId], (err, results) => {
	            if (err) {
	                console.log(err);
	                return next(err);
	            }
	            idUsuario = results[0].idUsuario;
	            resolve("");
	        });
        });
        
        promise.then((result)=>{
        	return new Promise((resolve, reject)=>{
        		connection.query('SELECT idUsuario FROM Usuario WHERE numEmpleado = ?', 
		        [req.body.numEmpleado], (err, results) => {
		            if (err) {
		                console.log(err);
		                return next(err);
		            }
		            if(results.length >0){
	        			empleadoPoseeUsuario = true;
		        	}else{
		        		empleadoPoseeUsuario = 	false;
		        	}
		            resolve("");  
		        });
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
		        connection.query("SELECT identificacionUsuario FROM Usuario WHERE identificacionUsuario = ?", [req.body.userId], (err, results) => {
				    if (err) {
				        console.log(err);
				        return next(err);
				    }
				    if(results.length >0){
	        			existeUserId = true;
		        	}else{
		        		existeUserId = 	false;
		        	}
				    resolve("");    
				});
		    });
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
        		if(!empleadoPoseeUsuario && !existeUserId){
        			if(req.body.password == req.body.passwordVerification){
        				connection.query("UPDATE Usuario SET numEmpleado = ?, identificacionUsuario = ?, password = ?  WHERE idUsuario = ?", 
				        [req.body.numEmpleado, req.body.identificacionUsuario, req.body.password, req.body.idUsuario], (err, rows) => {
				            if (err) {
				                console.log(err);
				                res.status(500).send(err);
				                return next(err);
				            }
				            resolve(true);
				        });
        			}else{
        				resolve(false);
        			}
	        	}else if((req.body.numEmpleado == req.body.numEmpleadoOld && req.body.identificacionUsuario == req.body.identificacionUsuarioOld)
	        	||(!empleadoPoseeUsuario && req.body.identificacionUsuario == req.body.identificacionUsuarioOld)
	        	||(!existeUserId && req.body.numEmpleado == req.body.numEmpleadoOld)){
	        		if(req.body.password == req.body.passwordVerification){
        				connection.query("UPDATE Usuario SET numEmpleado = ?, identificacionUsuario = ?, password = ?  WHERE idUsuario = ?", 
				        [req.body.numEmpleado, req.body.identificacionUsuario, req.body.password, req.body.idUsuario], (err, rows) => {
				            if (err) {
				                console.log(err);
				                res.status(500).send(err);
				                return next(err);
				            }
				            resolve(true);
				        });
        			}else{
        				resolve(false);
        			}
	        	}else{
	        		resolve(false);
	        	}
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
        		if(result){
        			for(let i = 0; i < req.body.privilegios.length; i++){
						if(req.body.privilegiosAntiguos.indexOf(req.body.privilegios[i]) == -1){
							connection.query("INSERT INTO PrivilegioXUsuario(idPrivilegio, idUsuario) VALUES(?, ?)", 
							[req.body.privilegios[i], req.body.idUsuario], (err, rows) => {
					            if (err) {
					                console.log(err);
					                res.status(500).send(err);
					                return next(err);
					            }
					        });
						}
					}
					resolve(true);
        		}else{
        			resolve(false);
        		}
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);	
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
        		if(result){
        			for(let j = 0; j < req.body.privilegiosAntiguos.length; j++){
						if(req.body.privilegios.indexOf(req.body.privilegiosAntiguos[j]) == -1){
							connection.query("DELETE FROM PrivilegioXUsuario WHERE idPrivilegio = ? AND idUsuario = ?", 
							[req.body.privilegiosAntiguos[j], req.body.idUsuario], (err, rows) => {
					            if (err) {
					                console.log(err);
					                res.status(500).send(err);
					                return next(err);
					            }
					        });
						}
					}
					resolve(true);
        		}else{
        			resolve(false);
        		}
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
        	return new Promise((resolve, reject)=>{
        		if(result){
        			if(idUsuario == req.body.idUsuario){
        				var query = "SELECT Privilegio.codigoPrivilegio FROM PrivilegioXUsuario INNER JOIN Privilegio " +
	            		"ON Privilegio.idPrivilegio = PrivilegioXUsuario.idPrivilegio WHERE PrivilegioXUsuario.idUsuario = ?";
	            		connection.query(query, [idUsuario], (err, results) => {
				            if (err) {
				                console.log(err);
				                return next(err);
				            }
				            req.session.userId = req.body.identificacionUsuario;
	            			req.session.userPrivileges = results.map(function(value, index, array){return value.codigoPrivilegio;});
				        });
        			}
        			res.status(status.OK).json({ message: 'Registro actualizado correctamente' });
        		}else{
        			res.status(status.OK).json({ message: 'No se pudo actualizar el registro porque la información no coincide o está corrupta' });
        		}
        	});
        }, (err)=>{
        	console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

module.exports = administradorController;