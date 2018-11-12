var status = require('http-status');
var buscarRegistroOpinionController = {};

buscarRegistroOpinionController.parametros1SinFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.numOficio LIKE ?";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.apoderadoLegal LIKE ?";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idProcedencia = ?";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idEmpleadoReceptor = ?";
				break;
			case  "asunto":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.asunto LIKE ?";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idAbogadoAsignado = ?";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idEstadoOpinion = ?";
				break;
			default:
				return next();
		}

		var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        fraseBusqueda + " " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
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

buscarRegistroOpinionController.parametros1ConFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
        var fraseBusquedaFecha;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.numOficio LIKE ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.apoderadoLegal LIKE ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idProcedencia = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idEmpleadoReceptor = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "asunto":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaOpinion.asunto LIKE ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idAbogadoAsignado = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaAsignacion BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idEstadoOpinion = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			default:
				return next();
		}

		var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        fraseBusqueda + " " + fraseBusquedaFecha + " " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
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

buscarRegistroOpinionController.parametros2ConFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);

        var query = "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE " + req.body.parametroBusqueda + " BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
			"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
        "UNION " +
        "SELECT fichaOpinion.idFichaEntradaOpinion as idficha, fichaOpinion.numOficio, Procedencia.nombreDependencia as nombreProcedencia, " +
        "fichaOpinion.asunto, fichaOpinion.fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaopinion as fichaOpinion " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaOpinion.idProcedencia " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaOpinion.idAbogadoAsignado " +
        "WHERE " + req.body.parametroBusqueda + " BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
			"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";

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

module.exports = buscarRegistroOpinionController;