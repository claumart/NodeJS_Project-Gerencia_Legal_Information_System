var modificacionPttController = {};

modificacionPttController.getFichas = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichapatronato.idFichaEntradaPatronato as idficha, " +
        "CONCAT(TipoComunidad.nombreTipoComunidad, \' \' , Comunidad.nombreComunidad) AS comunidad, " +
        "AsuntoPatronato.nombreAsuntoPatronato as nombreAsunto, fechaEntrada, fichapatronato.idEstadoPatronato as idEstado " +
        "FROM FichaEntradaPatronato as fichapatronato " +
        "INNER JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "INNER JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "INNER JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        "INNER JOIN TipoComunidad " +
            "ON TipoComunidad.idTipoComunidad = Comunidad.idTipoComunidad " +
        "INNER JOIN AsuntoPatronato " +
            "ON AsuntoPatronato.idAsuntoPatronato = fichapatronato.idAsuntoPatronato " +
        "WHERE ExpedientePatronato.numExpedientePatronato = ?";
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


module.exports = modificacionPttController;