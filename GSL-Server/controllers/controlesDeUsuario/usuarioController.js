var usuarioController = {};
var status = require('http-status');
var fs = require('fs-extra');
const crypto = require('crypto');
var path = require('path');

usuarioController.verificarUserId = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT identificacionUsuario FROM Usuario WHERE identificacionUsuario = ?", [req.body.userId], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0){
	            if(results[0].identificacionUsuario == req.body.userId) {
	                res.send(true);
	            } else{
	                res.send(false);
	            }
	        }else {
            	res.send(false);
            }
        });
      
    });
}

usuarioController.verificarPassword = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT identificacionUsuario, password FROM Usuario WHERE identificacionUsuario = ? AND password = ?", 
        [req.body.userId, req.body.password], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0){
            	if(results[0].identificacionUsuario == req.body.userId && results[0].password == req.body.password) {
	                res.send(true);
	            } else{
	                res.send(false);
	            }
            }else {
            	res.send(false);
            }
        });
      
    });
}

usuarioController.iniciarSesion = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query1 = "SELECT idUsuario, identificacionUsuario, password, nombreEmpleado " +
        "FROM Usuario INNER JOIN Empleado " +
        	"ON Usuario.numEmpleado = Empleado.numEmpleado " +
        "WHERE Usuario.identificacionUsuario = ? AND Usuario.password = ?"
        connection.query(query1, [req.body.userId, req.body.password], (err, results1) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results1.length > 0){
            	if(results1[0].identificacionUsuario == req.body.userId && results1[0].password == req.body.password) {
            		var query2 = "SELECT Privilegio.codigoPrivilegio FROM PrivilegioXUsuario INNER JOIN Privilegio " +
            		"ON Privilegio.idPrivilegio = PrivilegioXUsuario.idPrivilegio WHERE PrivilegioXUsuario.idUsuario = ?";
            		connection.query(query2, [results1[0].idUsuario], (err, results2) => {
			            if (err) {
			                console.log(err);
			                return next(err);
			            }
			            req.session.userId = results1[0].identificacionUsuario;
            			req.session.nombreEmpleado = results1[0].nombreEmpleado;
            			req.session.userPrivileges = results2.map(function(value, index, array){return value.codigoPrivilegio;});
	                	res.send("/inicio");
			        });
	            } else{
	                res.send("/");
	            }
            }
        });
      
    });
}


usuarioController.obtenerPrivilegios = (req, res, next) => {
	var string=JSON.stringify(req.session.userPrivileges);
    res.json(string);

}

usuarioController.mostrarOpinionPorOficio = (req, res, next) => {
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


usuarioController.mostrarPatronatoPorNumero = (req, res, next) => {
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


usuarioController.eliminarExpediente = (req, res, next) => {
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


usuarioController.eliminarOpinion = (req, res, next) => {
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

usuarioController.eliminarPatronato = (req, res, next) => {
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

usuarioController.registrarDependencia = (req, res, next) => {
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

usuarioController.eliminarDependencia = (req, res, next) => {
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

usuarioController.actualizarDependencia = (req, res, next) => {
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

usuarioController.registrarAsunto = (req, res, next) => {
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

usuarioController.eliminarAsunto = (req, res, next) => {
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

usuarioController.actualizarAsunto = (req, res, next) => {
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

usuarioController.registrarEmpleado = (req, res, next) => {
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

usuarioController.eliminarEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var numeroRegistrosExp;
        var numeroRegistrosOpn;
        var numeroRegistrosPtt;
        var numeroRegistrosPrevision;
        var promise = new Promise((resolve, reject)=>{
            connection.query('SELECT COUNT(idFichaEntradaExpediente) as numeroRegistros FROM FichaEntradaExpediente WHERE ' +
            'idEmpleadoReceptor = ? OR idAbogadoAsignado = ?', [req.body.numEmpleado, req.body.numEmpleado], (err, results) => {
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

usuarioController.actualizarEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("UPDATE Empleado SET nombreEmpleado = ?, activo = ?, idCargo = ?  WHERE numEmpleado = ?", 
        [req.body.nombreEmpleado, req.body.activo, req.body.idCargo, req.body.numEmpleado], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return next(err);
            }
            res.status(status.OK).json({ message: 'Registro guardado correctamente' });
        });
    });
}

usuarioController.registrarCargoEmpleado = (req, res, next) => {
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

usuarioController.eliminarCargoEmpleado = (req, res, next) => {
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

usuarioController.actualizarCargoEmpleado = (req, res, next) => {
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

usuarioController.eliminarComunidad = (req, res, next) => {
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

usuarioController.actualizarComunidad = (req, res, next) => {
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



module.exports = usuarioController;