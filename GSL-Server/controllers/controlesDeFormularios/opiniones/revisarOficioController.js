var status = require('http-status');
var fs = require('fs');
var revisarOficioController = {};
var path = require('../dictamenPath');

revisarOficioController.revisarOpinion = (req, res, next) => {
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var DictamenId;
        await connection.query('INSERT INTO Dictamen(numDictamen, idTipoDictamen) VALUES(?, ?)', [req.body.numDictamen, 2], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            DictamenId = rows.insertId;

            fs.mkdir(path + '/' + DictamenId, err => { 
                if (err && err.code != 'EEXIST') throw 'up';
                if (err && err.code == 'EEXIST') {
                    res.status(status.OK).json({ message: 'La carpeta ya existe' });
                }else{
                    for(let i = 0; i< req.files.dicImageFiles.length; i++){
                        let pagDictamen = i + 1;
                        let extensionArchivo = req.files.dicImageFiles[i].name.slice(req.files.dicImageFiles[i].name.length - 4, req.files.dicImageFiles[i].name.length);
                        let urlPag = '/' + DictamenId + '/' + 'dic' + DictamenId + '-pag' + pagDictamen + extensionArchivo; 

                        req.files.dicImageFiles[i].mv(path + urlPag, function(err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                            connection.query('INSERT INTO PaginaDictamen(idDictamen, numeroPagina, urlPagina) VALUES(?, ?, ?)', [DictamenId, pagDictamen, urlPag], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } 
                                if(i == req.files.dicImageFiles.length - 1) {
                                    if(req.files.aAImageFiles != null) {
                                        for(let j = 0; j< req.files.aAImageFiles.length; j++){
                                            let pagAA = j + 1;
                                            let extensionArchivoAA = req.files.aAImageFiles[j].name.slice(req.files.aAImageFiles[j].name.length - 4, req.files.aAImageFiles[j].name.length);
                                            let urlPagAA = '/' + DictamenId + '/' + 'dic' + DictamenId + '-archivo_adjunto-pag' + pagAA + extensionArchivoAA;

                                            req.files.aAImageFiles[j].mv(path + urlPagAA, function(err) {
                                                if (err) {
                                                    console.log(err);
                                                    return res.status(500).send(err);
                                                }
                                                connection.query('INSERT INTO PaginaArchivoAdjunto(idDictamen, numeroPagina, urlPagina) VALUES(?, ?, ?)', [DictamenId, pagAA, urlPagAA], (err, rows) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return next(err);
                                                    } 
                                                    if(j == req.files.aAImageFiles.length - 1) {
                                                        var query = "UPDATE FichaEntradaOpinion SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                                                        "idDictamen = ?, idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";
                                                        connection.query(query, [req.body.fecha, DictamenId, 4, req.body.idFicha], (err, rows) => {
                                                            if (err) {
                                                                console.log(err);
                                                                return next(err);
                                                            }
                                                            res.status(status.OK).json({ message: 'Opinion revisada correctamente' });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    }else {
                                        var query = "UPDATE FichaEntradaOpinion SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                                        "idDictamen = ?, idEstadoOpinion = ? WHERE idFichaEntradaOpinion = ?";
                                        connection.query(query, [req.body.fecha, DictamenId, 4, req.body.idFicha], (err, rows) => {
                                            if (err) {
                                                console.log(err);
                                                return next(err);
                                            }
                                            res.status(status.OK).json({ message: 'Opinion revisada correctamente' });
                                        });    
                                    }
                                }       
                            });
              
                        });
                        
                    }
                }
                
            });
        });
    });
}

module.exports = revisarOficioController;