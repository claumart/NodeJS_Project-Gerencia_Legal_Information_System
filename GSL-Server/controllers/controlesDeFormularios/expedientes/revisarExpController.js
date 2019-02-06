var status = require('http-status');
var fs = require('fs');
var revisarExpController = {};
var path = require('../dictamenPath');
const crypto = require('crypto');

revisarExpController.crearDictamen = (req, res, next) => {
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        let DictamenId;
        let carpeta;
        let promise = new Promise((resolve, reject) => {
            connection.query('INSERT INTO Dictamen(numDictamen, idTipoDictamen) VALUES(?, ?)', [req.body.numDictamen, 1], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                var date = new Date();
                var now = d.toLocaleString() + '.' + d.getMilliseconds();
                crypto.scrypt(now, Math.random().toString(36).substring(2), 32, (err, derivedKey) => {
                    if (err) throw err;
                    carpeta = derivedKey.toString('hex');
                    fs.mkdir(path + '/' + carpeta, err => { 
                        if (err && err.code != 'EEXIST') throw 'up';
                        if (err && err.code == 'EEXIST') {
                            res.status(status.OK).json({ message: 'La carpeta ya existe' });
                            return next(err);
                        }
                        resolve(rows.insertId);
                    });
                });
            });
        });


        promise.then((result)=>{
            DictamenId = result; 
            return new Promise((resolve, reject) => {
                var arrayExtensionPdf = req.files.pdfInput.name.split(".");
                var extensionPdf = arrayExtensionPdf[arrayExtensionPdf.length -1];
                var urlPdf = '/' + carpeta + '/' + 'dictamen' + DictamenId + "." + extensionPdf;
                req.files.pdfInput.mv(path + urlPdf, async function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                        return next(err);
                    }

                    await connection.query('INSERT INTO PdfDictamen(idDictamen, urlPdf) VALUES(?, ?)', [DictamenId, urlPdf], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        } 
                        resolve("");  
                    });          
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                if(req.files.wordInput != null){
                    var arrayExtensionWord = req.files.wordInput.name.split(".");
                    var extensionWord = arrayExtensionWord[arrayExtensionWord.length -1];
                    var urlWord = '/' + carpeta + '/' + 'dictamen' + DictamenId + "." + extensionWord; 
                    req.files.wordInput.mv(path + urlWord, async function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                            return next(err);
                        }

                        await connection.query('INSERT INTO WordDictamen(idDictamen, urlWord) VALUES(?, ?)', [DictamenId, urlWord], (err, rows) => {
                            if (err) {
                                console.log(err);
                                return next(err);
                            } 

                            var query = "UPDATE FichaEntradaExpediente SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                            "idDictamen = ?, idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?";
                            connection.query(query, [req.body.fecha, DictamenId, 4, req.body.idFicha], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                }
                                res.status(status.OK).json({ message: 'Dictamen revisado correctamente' });
                            });      
                        });          
                    });
                }else{
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
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });

    });
}


module.exports = revisarExpController;


/*

*/