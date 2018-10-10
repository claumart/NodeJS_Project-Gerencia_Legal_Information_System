var status = require('http-status');
var fs = require('fs');
var revisarExpController = {};
var path = require('../dictamenPath');

revisarExpController.crearDictamen = (req, res, next) => {
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var DictamenId;
        await connection.query('INSERT INTO Dictamen(numDictamen, idTipoDictamen) VALUES(?, ?)', [req.body.numDictamen, 1], (err, rows) => {
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
                    for(let i = 0; i< req.files.imageFiles.length; i++){
                        let pagDictamen = i + 1;
                        let extensionArchivo = req.files.imageFiles[i].name.slice(req.files.imageFiles[i].name.length - 4, req.files.imageFiles[i].name.length);
                        let urlPag = '/' + DictamenId + '/' + 'dic' + DictamenId + '-pag' + pagDictamen + extensionArchivo; 

                        req.files.imageFiles[i].mv(path + urlPag, function(err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                            connection.query('INSERT INTO PaginaDictamen(idDictamen, numeroPagina, urlPagina) VALUES(?, ?, ?)', [DictamenId, pagDictamen, urlPag], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } 
                                if(i == req.files.imageFiles.length - 1) {
                                    var query = "UPDATE FichaEntradaExpediente SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                                    "idDictamen = ?, idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?";
                                      connection.query(query, [req.body.fecha, DictamenId, 4, req.body.idFicha], (err, rows) => {
                                        if (err) {
                                            console.log(err);
                                            return next(err);
                                        }
                                        res.status(status.OK).json({ message: 'Dictamen revisado correctamente' });
                                    });
                                }       
                            });
              
                        });
                        
                    }
                }
                
            });
        });
    });
}


module.exports = revisarExpController;