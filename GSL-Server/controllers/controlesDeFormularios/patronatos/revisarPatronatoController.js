var status = require('http-status');
var fs = require('fs');
var revisarPatronatoController = {};
var path = require('../dictamenPath');

revisarPatronatoController.crearDictamen = (req, res, next) => {
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        let DictamenId;
        let promise = new Promise((resolve, reject) => {
            connection.query('INSERT INTO Dictamen(numDictamen, idTipoDictamen) VALUES(?, ?)', [req.body.numDictamen, 3], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                fs.mkdir(path + '/' + rows.insertId, err => { 
                    if (err && err.code != 'EEXIST') throw 'up';
                    if (err && err.code == 'EEXIST') {
                        res.status(status.OK).json({ message: 'La carpeta ya existe' });
                        return next(err);
                    }
                    resolve(rows.insertId);
                });
            });
        });


        promise.then((result)=>{
            DictamenId = result;
            return new Promise((resolve, reject) => {
                var arrayExtensionPdf = req.files.pdfInput.name.split(".");
                var extensionPdf = arrayExtensionPdf[arrayExtensionPdf.length -1];
                var urlPdf = '/' + DictamenId + '/' + 'dictamen' + DictamenId + "." + extensionPdf; 
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
                    var urlWord = '/' + DictamenId + '/' + 'dictamen' + DictamenId + "." + extensionWord;
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

                            var query = "UPDATE FichaEntradaPatronato SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                        	"idDictamen = ?, idEstadoPatronato = ? WHERE idFichaEntradaPatronato = ?";
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
                    var query = "UPDATE FichaEntradaPatronato SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\'), " +
                    "idDictamen = ?, idEstadoPatronato = ? WHERE idFichaEntradaPatronato = ?";
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


module.exports = revisarPatronatoController;


/*

*/