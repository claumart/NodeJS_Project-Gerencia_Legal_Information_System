var status = require('http-status');
var fs = require('fs');
var modOpnRevisionController = {};
var path = require('../../controlesDeFormularios/dictamenPath');


modOpnRevisionController.getFichaRevision = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT fichaOpinion.fechaRevision, Dictamen.idDictamen, Dictamen.numDictamen, PdfDictamen.urlPdf, WordDictamen.urlWord, " +
        "ArchivoAdjunto.urlArchivoAdjunto " +
        "FROM FichaEntradaOpinion as fichaOpinion " +
        "LEFT JOIN Dictamen " +
            "ON fichaOpinion.idDictamen = Dictamen.idDictamen " +
        "LEFT JOIN PdfDictamen " +
            "ON Dictamen.idDictamen = PdfDictamen.idDictamen " +
        "LEFT JOIN WordDictamen " +
            "ON Dictamen.idDictamen = WordDictamen.idDictamen " +
        "LEFT JOIN ArchivoAdjunto " +
            "ON Dictamen.idDictamen = ArchivoAdjunto.idDictamen " +
        "WHERE fichaOpinion.idFichaEntradaOpinion = ? " +
        "UNION " +
        "SELECT fichaOpinion.fechaRevision, Dictamen.idDictamen, Dictamen.numDictamen, PdfDictamen.urlPdf, WordDictamen.urlWord, " +
        "ArchivoAdjunto.urlArchivoAdjunto " +
        "FROM FichaEntradaOpinion as fichaOpinion " +
        "RIGHT JOIN Dictamen " +
            "ON fichaOpinion.idDictamen = Dictamen.idDictamen " +
        "RIGHT JOIN PdfDictamen " +
            "ON Dictamen.idDictamen = PdfDictamen.idDictamen " +
        "RIGHT JOIN WordDictamen " +
            "ON Dictamen.idDictamen = WordDictamen.idDictamen " +
        "RIGHT JOIN ArchivoAdjunto " +
            "ON Dictamen.idDictamen = ArchivoAdjunto.idDictamen " +
        "WHERE fichaOpinion.idFichaEntradaOpinion = ?";

        connection.query(query, [req.body.idFicha, req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });

    });
};

modOpnRevisionController.updateRevision = (req, res, next) => {
    req.getConnection(async function(err, connection){
        if (err) return next(err);
        let carpeta;
        let promise = new Promise((resolve, reject) => {
            connection.query('UPDATE Dictamen SET numDictamen = ? WHERE idDictamen = ?', [req.body.numDictamen, req.body.idDictamen], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                resolve("");
            });
        });

        promise.then((result)=>{
            return new Promise((resolve, reject)=>{
                connection.query('SELECT urlPdf FROM PdfDictamen WHERE idDictamen = ?', [req.body.idDictamen], (err, results) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    if(results.length > 0){
                        carpeta = results[0].urlPdf.split('/')[1];
                        resolve("");
                    }else{
                        console.log('Error, un registro que debería existir no existe');
                        res.status(500);
                        return next();
                    }
                    
                });
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                if(req.files != null && req.files.pdfInput != null){
                    var arrayExtensionPdf = req.files.pdfInput.name.split(".");
                    var extensionPdf = arrayExtensionPdf[arrayExtensionPdf.length -1];
                    var urlPdf = '/' + carpeta + '/' + 'dictamen' + req.body.idDictamen + "." + extensionPdf;
                    if(req.body.existePdf == "true"){
                        fs.unlink(path + req.body.urlPdf, (err) => {
                            if (err){
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }
                            req.files.pdfInput.mv(path + urlPdf, async function(err) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                    return next(err);
                                }
                                await connection.query('UPDATE PdfDictamen SET urlPdf = ? WHERE idDictamen = ?', [urlPdf, req.body.idDictamen], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    } 
                                    resolve("");  
                                });      
                            });
                        });
                    }else{
                        req.files.pdfInput.mv(path + urlPdf, async function(err) {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }
                            await connection.query('INSERT INTO PdfDictamen(idDictamen, urlPdf) VALUES(?, ?)', [req.body.idDictamen, urlPdf], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } 
                                resolve("");  
                            });        
                        });
                    }
                }else{
                    resolve("");
                }
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                if(req.files != null && req.files.wordInput != null){
                    var arrayExtensionWord = req.files.wordInput.name.split(".");
                    var extensionWord = arrayExtensionWord[arrayExtensionWord.length -1];
                    var urlWord = '/' + carpeta + '/' + 'dictamen' + req.body.idDictamen + "." + extensionWord;
                    if(req.body.existeWord == "true"){
                        fs.unlink(path + req.body.urlWord, (err) => {
                            if (err){
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }
                            req.files.wordInput.mv(path + urlWord, async function(err) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                    return next(err);
                                }

                                await connection.query('UPDATE WordDictamen SET urlWord = ? WHERE idDictamen = ?', [urlWord, req.body.idDictamen], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    } 
                                    resolve("");
                                });          
                            });
                        });    
                    }else{
                        req.files.wordInput.mv(path + urlWord, async function(err) {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }

                            await connection.query('INSERT INTO WordDictamen(idDictamen, urlWord) VALUES(?, ?)', [req.body.idDictamen, urlWord], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } 
                                resolve("");
                            });          
                        });
                    }
                }else{
                    resolve("");
                }
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                if(req.files != null && req.files.aAInput != null){
                    var arrayExtensionAA = req.files.aAInput.name.split(".");
                    var extensionAA = arrayExtensionAA[arrayExtensionAA.length -1];
                    var urlAA = '/' + carpeta + '/' + 'archivo-adjunto-dictamen' + req.body.idDictamen + "." + extensionAA; 
                    if(req.body.existeAA == "true"){
                        fs.unlink(path + req.body.urlAA, (err) => {
                            if (err){
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }
                            req.files.aAInput.mv(path + urlAA, async function(err) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send(err);
                                    return next(err);
                                }

                                await connection.query('UPDATE ArchivoAdjunto SET urlArchivoAdjunto = ? WHERE idDictamen = ?', [urlAA, req.body.idDictamen], (err, rows) => {
                                    if (err) {
                                        console.log(err);
                                        return next(err);
                                    } 
                                    resolve("");
                                });          
                            });
                        });    
                    }else{
                        req.files.aAInput.mv(path + urlAA, async function(err) {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                                return next(err);
                            }

                            await connection.query('INSERT INTO ArchivoAdjunto(idDictamen, urlArchivoAdjunto) VALUES(?, ?)', [req.body.idDictamen, urlAA], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return next(err);
                                } 
                                resolve("");
                            });          
                        });
                    }
                }else{
                    resolve("");
                }
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        }).then((result)=>{
            return new Promise((resolve, reject) => {
                var query = "UPDATE FichaEntradaOpinion SET fechaRevision = STR_TO_DATE(?, \'%d-%m-%Y\') " +
                "WHERE idFichaEntradaOpinion = ?";
                connection.query(query, [req.body.fecha, req.body.idFicha], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
                });  
            });
        }, (err)=>{
            console.log(err);
            res.status(500).send(err);
            return next(err);
        });
    });
}

module.exports = modOpnRevisionController;