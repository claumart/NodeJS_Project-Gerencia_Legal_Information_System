var status = require('http-status');
var buscarRegistroExpedienteController = {};

buscarRegistroExpedienteController.parametros1SinFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE Expediente.numExpediente LIKE ?";
				break;
			case  "interesado":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaexp.interesado LIKE ?";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaexp.apoderadoLegal LIKE ?";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idProcedencia = ?";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idEmpleadoReceptor = ?";
				break;
			case  "asunto":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idAsunto = ?";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idAbogadoAsignado = ?";
				break;
			case  "dependenciaRemision":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idDependenciaRemision = ?";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idEstadoExpediente = ?";
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

buscarRegistroExpedienteController.parametros1ConFecha = (req, res, next)=>{
	req.getConnection(async function(err, connection){
        if (err) return next(err);
        var campoBusqueda;
        var fraseBusqueda;
        var fraseBusquedaFecha;
		switch(req.body.parametroBusqueda) {
			case  "numExpediente":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE Expediente.numExpediente LIKE ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "interesado":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaexp.interesado LIKE ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "apoderadoLegal":
				campoBusqueda = "%" + req.body.valorParametro + "%";
				fraseBusqueda = "WHERE fichaexp.apoderadoLegal LIKE ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "procedencia":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idProcedencia = ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "empleadoReceptor":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idEmpleadoReceptor = ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "asunto":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idAsunto = ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "abogadoAsignado":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idAbogadoAsignado = ?";
				fraseBusquedaFecha = "AND fichaexp.fechaAsignacion BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "dependenciaRemision":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idDependenciaRemision = ?";
				fraseBusquedaFecha = "AND fechaRemision BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
				"AND STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s')";
				break;
			case  "estadoExpediente":
				campoBusqueda = req.body.valorParametro;
				fraseBusqueda = "WHERE fichaexp.idEstadoExpediente = ?";
				fraseBusquedaFecha = "AND fichaexp.fechaEntrada BETWEEN STR_TO_DATE(?, '%d-%m-%Y %H:%i:%s') " +
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
		        var string=JSON.stringify(results);
		        res.status(status.OK).json(string);
		    });
        }else {
        	res.status(status.BAD_REQUEST);
        }
	});
}

buscarRegistroExpedienteController.parametros2ConFecha = (req, res, next)=>{
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

module.exports = buscarRegistroExpedienteController;