var status = require('http-status');
var modExpProvidenciaController = {};

modExpProvidenciaController.getFichaRemisionPrevio = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaExpediente as idficha, " +
        "idDependenciaRemision, motivoRemision, recibidoPor, fechaRemision " +
        "FROM PrevisionExpediente " +
        "WHERE idPrevisionExpediente = ?";

        connection.query(query, [req.body.idPrevio], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
};


modExpProvidenciaController.updateRemisionPrevio = (req, res, next) => {
  req.getConnection((err, connection)=> {
      if (err) return next(err);
      if(req.body.motivo != "") {
        var query = "UPDATE PrevisionExpediente SET idDependenciaRemision = ?, motivoRemision = ?, recibidoPor = ?, " +
        "fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\') WHERE idPrevisionExpediente = ?";
        connection.query(query, [req.body.dependenciaRemisionPrevio, req.body.motivo, req.body.recibidoPor, req.body.fecha, req.body.idPrevio], (err, rows) => {
            if (err) {
                  console.log(err);
                  return next(err);
            }
            res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
        });

      }else {
        var query = "UPDATE PrevisionExpediente SET idDependenciaRemision = ?, recibidoPor = ?, " +
        "fechaRemision = STR_TO_DATE(?, \'%d-%m-%Y\') WHERE idPrevisionExpediente = ?";
        connection.query(query, [req.body.dependenciaRemisionPrevio, req.body.recibidoPor, req.body.fecha, req.body.idPrevio], (err, rows) => {
            if (err) {
                  console.log(err);
                  return next(err);
            }
            res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
        });
      }   
  });
};


modExpProvidenciaController.getFichaReingresoPrevio = (req, res, next) => {
    req.getConnection(async function(err, connection) {
        var query = "SELECT idFichaEntradaExpediente as idficha, " +
        "idDependenciaRetorno, idEmpleadoReceptor, fechaRetorno " +
        "FROM PrevisionExpediente " +
        "WHERE idPrevisionExpediente = ?";

        connection.query(query, [req.body.idPrevio], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
};

modExpProvidenciaController.updateReingresoPrevio = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "UPDATE PrevisionExpediente SET idDependenciaRetorno = ?, idEmpleadoReceptor = ?, fechaRetorno = STR_TO_DATE(?, \'%d-%m-%Y\') " +
        "WHERE idPrevisionExpediente = ?";
        connection.query(query, [req.body.dependenciaReingreso, req.body.numEmpleadoReceptor, req.body.fecha, req.body.idPrevio], (err, rows) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.status(status.OK).json({ message: 'formulario actualizado correctamente' });
        }); 
  });
};


module.exports = modExpProvidenciaController;