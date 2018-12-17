var modificacionExpController = {};

modificacionExpController.getFichas = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto, fechaEntrada, fichaexp.idEstadoExpediente as idEstado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "INNER JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "INNER JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "INNER JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "INNER JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "WHERE Expediente.numExpediente = ?";
        connection.query(query, [req.body.numExpediente], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

modificacionExpController.getFichasDePrevision = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT DISTINCT fichaexp.idFichaEntradaExpediente as idficha, " +
        "dependenciaRemision.nombreDependencia as dependenciaRemision, " +
        "previo.motivoRemision, previo.idPrevisionExpediente as idPrevio, previo.fechaRemision, previo.fechaRetorno " +
        "FROM fichaentradaexpediente as fichaexp " +
        "INNER JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "INNER JOIN Expediente " + 
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "INNER JOIN PrevisionExpediente as previo " +
            "ON previo.idFichaEntradaExpediente = fichaexp.idFichaEntradaExpediente " +
        "INNER JOIN Dependencia as dependenciaRemision " +
            "ON dependenciaRemision.idDependencia = previo.idDependenciaRemision " +
        "INNER JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "WHERE fichaexp.idFichaEntradaExpediente = ?";
        connection.query(query, [req.body.idFicha], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}

module.exports = modificacionExpController;