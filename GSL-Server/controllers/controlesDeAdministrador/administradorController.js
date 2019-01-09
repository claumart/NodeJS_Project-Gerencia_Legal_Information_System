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
module.exports = administradorController;