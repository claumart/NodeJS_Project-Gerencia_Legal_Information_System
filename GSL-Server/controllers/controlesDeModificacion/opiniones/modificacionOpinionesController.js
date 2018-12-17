/***********************Hecho por Shirley Claudette Martínez***********************/
var modificacionOpnController = {};

modificacionOpnController.getFichas = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto as nombreAsunto, fechaEntrada, fichaOpinion.idEstadoOpinion as idEstado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "INNER JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "WHERE fichaOpinion.numOficio = ?";
        connection.query(query, [req.body.numOficio], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            var string=JSON.stringify(results);
            res.json(string);
        });
    });
}


module.exports = modificacionOpnController;