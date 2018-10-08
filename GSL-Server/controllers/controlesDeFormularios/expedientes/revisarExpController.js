var status = require('http-status');
var fs = require('fs');
var revisarExpController = {};

//Cambiar esta variable cuando el programa migre de hosting, según sea el caso
var path = "C:/xampp/htdocs/gerencia_legal/GSL-Server/dictamenes";

revisarExpController.verDir = (req, res, next) => {
    console.log(__dirname);
    prueba();
        fs.mkdir(path + "04", err => { 
            if (err && err.code != 'EEXIST') throw 'up';
            if (err && err.code == 'EEXIST') {
                console.log('Ya existe');
            }
            console.log('todo bien'); 
        });
    res.sendStatus(status.OK);
}


async function prueba(){
    for(i = 0; i < 5; i++) {
        console.log('En el for con valor de iterador ' + i);
        await aRealizar(function() {
            console.log('Dentro de la funcion con valor de iterador ' + i);
        });
    }
}

function aRealizar(funcion){
    funcion();
}


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