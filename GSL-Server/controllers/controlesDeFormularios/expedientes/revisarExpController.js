var status = require('http-status');
var fs = require('fs');
var revisarExpController = {};

//Cambiar esta variable cuando el programa migre de hosting, según sea el caso
var path = "C:\\xampp\\htdocs\\gerencia_legal\\GSL-Server\\dictamenes\\";

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
    /*fs.mkdir('/path', err => { 
    if (err && err.code != 'EEXIST') throw 'up'
        console.log('Hola mundo'); 
    })*/
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var fichaEntradaId;
        var expedienteId;
        connection.query('SELECT idDictamen FROM Dictamen WHERE numDictamen = ?', [req.body.numDictamen], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0) {
                expedienteId = results[0].idExpediente;
                connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                });
            }else{
                connection.query('INSERT INTO Expediente(numExpediente, folios) VALUES(?, ?)', [req.body.numExpediente, req.body.folios], (err, rows) => {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    expedienteId = rows.insertId;
                
                    connection.query('INSERT INTO FichaEntradaExpedienteXExpediente(idFichaEntradaExpediente, idExpediente) VALUES(?, ?)', [fichaEntradaId, expedienteId], (err, rows) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        res.status(status.OK).json({ message: 'Registro guardado correctamente' });
                    });

                });
            }

        });

      
    });
}


module.exports = revisarExpController;
