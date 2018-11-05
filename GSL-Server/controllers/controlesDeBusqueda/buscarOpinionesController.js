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

		var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        fraseBusqueda + " GROUP BY fichaexp.idFichaEntradaExpediente " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        fraseBusqueda + " GROUP BY fichaexp.idFichaEntradaExpediente";

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
				fraseBusqueda = "WHERE fichaOpinion.numExpediente LIKE ?";
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
			case  "dependenciaRemision":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaOpinion.idDependenciaRemision = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaRemision BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idEstadoExpediente = ?";
				fraseBusquedaFecha = "AND fichaOpinion.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			default:
				return next();
		}

		var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        fraseBusqueda + " " + fraseBusquedaFecha + " GROUP BY fichaexp.idFichaEntradaExpediente " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        fraseBusqueda + " " + fraseBusquedaFecha + " GROUP BY fichaexp.idFichaEntradaExpediente";

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
		        console.log(query);
		        console.log(campoBusqueda);
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

		var query = "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia," +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "LEFT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "LEFT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "LEFT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "LEFT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "LEFT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
        "WHERE " + req.body.parametroBusqueda + " BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') GROUP BY fichaexp.idFichaEntradaExpediente " +    
        "UNION " +
        "SELECT fichaexp.idFichaEntradaExpediente as idficha, GROUP_CONCAT(Expediente.numExpediente SEPARATOR ', ') as numExpediente, Procedencia.nombreDependencia as nombreProcedencia, " +
        "asunto.nombreAsunto as nombreAsunto, fichaexp.fechaEntrada as fechaEntrada, abogado.nombreEmpleado as nombreAbogadoAsignado " +
        "FROM fichaentradaexpediente as fichaexp " +
        "RIGHT JOIN fichaEntradaExpedienteXExpediente as fichaxexp " +
            "ON fichaexp.idFichaEntradaExpediente = fichaxexp.idFichaEntradaExpediente " +
        "RIGHT JOIN Expediente " +
            "ON Expediente.idExpediente = fichaxexp.idExpediente " +
        "RIGHT JOIN Dependencia as Procedencia " +
            "ON Procedencia.idDependencia = fichaexp.idProcedencia " +
        "RIGHT JOIN Asunto " +
            "ON Asunto.idAsunto = fichaexp.idAsunto " +
        "RIGHT JOIN empleado as abogado " +
            "ON abogado.numEmpleado = fichaexp.idAbogadoAsignado " +
       "WHERE " + req.body.parametroBusqueda + " BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') GROUP BY fichaexp.idFichaEntradaExpediente";
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