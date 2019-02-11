var status = require('http-status');
var modOpnEntradaController = {};

modOpnEntradaController.getFichaEntrada = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaOpinion as idficha, idProcedencia, " +
        "apoderadoLegal, asunto, numOficio, idEmpleadoReceptor, fechaEntrada, informacionAdicional " +
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

modOpnEntradaController.getExpedientes = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT Expediente.idExpediente, " +
        "Expediente.numExpediente, Expediente.folios " +
        "FROM FichaEntradaOpinion as fichaopinon " + 
        "INNER JOIN fichaEntradaOpinionXExpediente as fichaxexp " +
            "ON fichaopinon.idFichaEntradaOpinion = fichaxexp.idFichaEntradaOpinion " +
        "INNER JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "WHERE fichaopinon.idFichaEntradaOpinion = ?";
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
        var expedienteId;
        let promise1 = new Promise((resolve, reject) => {
            if(req.body.apoderado != "") {
                connection.query('UPDATE FichaEntradaOpinion SET idProcedencia = ?, apoderadoLegal = ?, asunto = ?, numOficio = ?, idEmpleadoReceptor = ?, ' +
                'fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), informacionAdicional = ? WHERE  idFichaEntradaOpinion = ?', [req.body.idProcedencia, req.body.apoderado, 
                req.body.asunto, req.body.numOficio, req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    resolve(req.body.expedientesAntiguos.map(function(value, index, array){return value.numExpediente;}));
                });
            }else {
                connection.query('UPDATE FichaEntradaOpinion SET idProcedencia = ?, asunto = ?, numOficio = ?, idEmpleadoReceptor = ?, ' +
                'fechaEntrada = STR_TO_DATE(?, \'%d-%m-%Y %H:%i:%s\'), informacionAdicional = ? WHERE idFichaEntradaOpinion = ?', [req.body.idProcedencia, req.body.asunto, 
                req.body.numOficio, req.body.numEmpleadoReceptor, req.body.fecha, req.body.extrainfo, req.body.idFicha], (err, rows) => {
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
                                connection.query('INSERT INTO FichaEntradaOpinionXExpediente(idFichaEntradaOpinion, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
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
                                
                                connection.query('INSERT INTO FichaEntradaOpinionXExpediente(idFichaEntradaOpinion, idExpediente) VALUES(?, ?)', [req.body.idFicha, expedienteId], (err, rows) => {
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

        var newExp = await promise2;
        if(req.body.expedientesAntiguos.length < 1){
            res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
        }else{
            for(let i=0; i<req.body.expedientesAntiguos.length; i++){
                let indice = newExp.indexOf(req.body.expedientesAntiguos[i].numExpediente);
                if(indice == -1){
                    connection.query('DELETE FROM FichaEntradaOpinionXExpediente WHERE idFichaEntradaOpinion = ? AND idExpediente = ?', 
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
                            let numRecordExp = results[0].numeroRegistros;
                            connection.query('SELECT COUNT(idFichaEntradaOpinion) as numeroRegistros FROM FichaEntradaOpinionXExpediente WHERE idExpediente = ?', 
                            [req.body.expedientesAntiguos[i].idExpediente], (err, results) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                let numRecordOpn = results[0].numeroRegistros;
                                if(numRecordExp == 0 && numRecordOpn == 0){
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
                    });
                }else{
                    connection.query('UPDATE Expediente SET folios = ? WHERE idExpediente = ?', 
                    [req.body.expedientes[indice].folios, req.body.expedientesAntiguos[i].idExpediente], (err, rows) => {
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
        }     
    });
}


module.exports = modOpnEntradaController;
