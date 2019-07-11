var status = require('http-status');
var countRegistroPatronatosController = {};

countRegistroPatronatosController.parametros1SinFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE ExpedientePatronato.numExpedientePatronato LIKE ?";
				break;
			case  "comunidad":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE Comunidad.nombreComunidad LIKE ?";
				break;
			case  "interesado":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichapatronato.interesado LIKE ?";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichapatronato.apoderadoLegal LIKE ?";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idProcedencia = ?";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idEmpleadoReceptor = ?";
				break;
			case  "asunto":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idAsuntoPatronato = ?";
				break;
			case  "tipoComunidad":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE Comunidad.idTipoComunidad = ?";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idAbogadoAsignado = ?";
				break;
			case  "dependenciaRemision":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idDependenciaRemision = ?";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idEstadoPatronato = ?";
				break;
			default:
				return next();
		}

		var query = "SELECT COUNT(DISTINCT fichapatronato.idFichaEntradaPatronato) as numeroRegistros " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "INNER JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "INNER JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "INNER JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        fraseBusqueda;

	    await connection.query(query, [campoBusqueda, campoBusqueda], (err, results) => {
	        if (err) {
	            console.log(err);
	            return next(err);
	        }
	        var string=JSON.stringify(results);
	        res.status(status.OK).json(string);
	    });
	});
}

countRegistroPatronatosController.parametros1ConFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
        var fraseBusquedaFecha;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE ExpedientePatronato.numExpedientePatronato LIKE ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "comunidad":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE Comunidad.nombreComunidad LIKE ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "interesado":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichapatronato.interesado LIKE ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichapatronato.apoderadoLegal LIKE ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idProcedencia = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idEmpleadoReceptor = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "asunto":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idAsuntoPatronato = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "tipoComunidad":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE Comunidad.idTipoComunidad = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idAbogadoAsignado = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaAsignacion BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "dependenciaRemision":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idDependenciaRemision = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaRemision BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichapatronato.idEstadoPatronato = ?";
				fraseBusquedaFecha = "AND fichapatronato.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			default:
				return next();
		}

		var query = "SELECT COUNT(DISTINCT fichapatronato.idFichaEntradaPatronato) as numeroRegistros " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "INNER JOIN FichaEntradaPatronatoXExpedientePatronato as fichaxpatronato " +
            "ON fichapatronato.idFichaEntradaPatronato = fichaxpatronato.idFichaEntradaPatronato " +
        "INNER JOIN ExpedientePatronato " +
            "ON ExpedientePatronato.idExpedientePatronato = fichaxpatronato.idExpedientePatronato " +
        "INNER JOIN Comunidad " +
            "ON Comunidad.idComunidad = ExpedientePatronato.idComunidadRelacionada " +
        fraseBusqueda + " " + fraseBusquedaFecha;

	    if(req.body.fechaInicio != null && req.body.fechaFin != null) {
        	var fechaInicio = req.body.fechaInicio.trim() + " 00:00:00";
        	var fechaFin = req.body.fechaFin.trim() + " 23:59:59";
        	await connection.query(query, [campoBusqueda, fechaInicio, fechaFin, campoBusqueda, fechaInicio, fechaFin], (err, results) => {
		        if (err) {
		            console.log(err);
		            return next(err);
		        }
		        var string=JSON.stringify(results);
		        res.status(status.OK).json(string);
		    });

        }else if(req.body.fecha != null) {
        	var fechaInicio = req.body.fecha.trim() + " 00:00:00";
        	var fechaFin = req.body.fecha.trim() + " 23:59:59";
        	await connection.query(query, [campoBusqueda, fechaInicio, fechaFin, campoBusqueda, fechaInicio, fechaFin], (err, results) => {
		        if (err) {
		            console.log(err);
		            return next(err);
		        }
		        var string=JSON.stringify(results);
		        res.status(status.OK).json(string);
		    });
        }else {
        	res.status(status.BAD_REQUEST);
        }
	});
}

countRegistroPatronatosController.parametros2ConFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);

        var query = "SELECT COUNT(DISTINCT fichapatronato.idFichaEntradaPatronato) as numeroRegistros " + 
        "FROM FichaEntradaPatronato as fichapatronato " +
        "WHERE " + req.body.parametroBusqueda + " BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
			"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') GROUP BY fichapatronato.idFichaEntradaPatronato";

        if(req.body.fechaInicio != null && req.body.fechaFin != null) {
        	var fechaInicio = req.body.fechaInicio.trim() + " 00:00:00";
        	var fechaFin = req.body.fechaFin.trim() + " 23:59:59";
        	await connection.query(query, [fechaInicio, fechaFin, fechaInicio, fechaFin], (err, results) => {
		        if (err) {
		            console.log(err);
		            return next(err);
		        }
		        var string=JSON.stringify(results);
		        res.status(status.OK).json(string);
		    });

        }else if(req.body.fecha != null) {
        	var fechaInicio = req.body.fecha.trim() + " 00:00:00";
        	var fechaFin = req.body.fecha.trim() + " 23:59:59";
        	await connection.query(query, [fechaInicio, fechaFin, fechaInicio, fechaFin], (err, results) => {
		        if (err) {
		            console.log(err);
		            return next(err);
		        }
		        var string=JSON.stringify(results);
		        res.status(status.OK).json(string);
		    });
        }else {
        	res.status(status.BAD_REQUEST);
        }   
	});
}

module.exports = countRegistroPatronatosController;