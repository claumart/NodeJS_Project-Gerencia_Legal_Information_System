var status = require('http-status');
var providenciaExpController = {};

providenciaExpController.remitirConPrevio = (req, res, next) => {
  req.getConnection((err, connection)=> {
      if (err) return next(err);
      if(req.body.motivo != "") {
        var query = "INSERT INTO PrevisionExpediente(idFichaEntradaExpediente, idDependenciaRemision, motivoRemision, recibidoPor, fechaRemision) " +
        "VALUES(?, ?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y\'))";
        connection.query(query, [req.body.idFicha, req.body.dependenciaRemisionPrevio, req.body.motivo, req.body.recibidoPor, req.body.fecha], (err, rows) => {
            if (err) {
                  console.log(err);
                  return next(err);
            }
            connection.query("UPDATE FichaEntradaExpediente SET idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?", [6, req.body.idFicha], (err, rows) => {
              if (err) {
                console.log(err);
                return next(err);
              }
              res.status(status.OK).json({ message: 'Expedientes remitidos con previo correctamente' });
            });
        });

      }else {
        var query = "INSERT INTO PrevisionExpediente(idFichaEntradaExpediente, idDependenciaRemision, recibidoPor, fechaRemision) " +
        "VALUES(?, ?, ?, STR_TO_DATE(?, \'%d-%m-%Y\'))";
        connection.query(query, [req.body.idFicha, req.body.dependenciaRemisionPrevio, req.body.recibidoPor, req.body.fecha], (err, rows) => {
            if (err) {
                  console.log(err);
                  return next(err);
            }
            connection.query("UPDATE FichaEntradaExpediente SET idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?", [6, req.body.idFicha], (err, rows) => {
              if (err) {
                console.log(err);
                return next(err);
              }
              res.status(status.OK).json({ message: 'Expedientes remitidos con previo correctamente' });
            });
        });
      }   
  });
};

providenciaExpController.reingresarConPrevio = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "UPDATE PrevisionExpediente SET idDependenciaRetorno = ?, idEmpleadoReceptor = ?, fechaRetorno = STR_TO_DATE(?, \'%d-%m-%Y\') " +
        "WHERE idFichaEntradaExpediente = ? AND fechaRetorno IS null";
        connection.query(query, [req.body.dependenciaReingreso, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idFicha], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            connection.query("UPDATE FichaEntradaExpediente SET idEstadoExpediente = ? WHERE idFichaEntradaExpediente = ?", [2, req.body.idFicha], (err, rows) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.status(status.OK).json({ message: 'Expedientes reingresados con previo correctamente' });
            });
        }); 
  });
};


module.exports = providenciaExpController;