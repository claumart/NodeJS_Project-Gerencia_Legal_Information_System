var populateSelectsController = {};

populateSelectsController.populateDependencia = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results);
        	res.status(200).json(string);
      	});
      
    });
}

populateSelectsController.populateEmpleadoReceptor = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT numEmpleado, nombreEmpleado FROM Empleado WHERE activo=?', [true], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results);
        	res.setHeader('Content-Type', 'application/json');
            res.status(200).json(string);
      	});
      
    });
}

populateSelectsController.populateEmpleado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
      
        connection.query('SELECT numEmpleado, nombreEmpleado, activo, idCargo FROM Empleado', [], (err, results) => {
            if (err) return next(err);
            var string=JSON.stringify(results);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(string);
        });
      
    });
}

populateSelectsController.populateAbogadoAsignado = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
        var query = 'SELECT numEmpleado, nombreEmpleado FROM ' +
            'Empleado WHERE activo=? and idCargo=?';
    	connection.query(query, [true, 1], (err, results) => {
	        if (err) return next(err);
	        var string=JSON.stringify(results);
	        res.setHeader('Content-Type', 'application/json');
            res.status(200).json(string);
      	});
      
    });
}

populateSelectsController.populateEstadoExpediente = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
    	connection.query('SELECT idEstadoExpediente, nombreEstadoExpediente as nombreEstado FROM EstadoExpediente', [], (err, results) => {
	        if (err) return next(err);
	        var string=JSON.stringify(results);
	        res.setHeader('Content-Type', 'application/json');
            res.status(200).json(string);
	    });
      
    });
}

populateSelectsController.populateAsunto = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idAsunto, nombreAsunto FROM Asunto', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateAsuntoPatronato = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
      
        connection.query('SELECT idAsuntoPatronato, nombreAsuntoPatronato FROM AsuntoPatronato', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateMunicipio = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
      
        connection.query('SELECT idMunicipio, nombreMunicipio, codigoMunicipio FROM Municipio', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateTipoComunidad = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idTipoComunidad, nombreTipoComunidad FROM TipoComunidad', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateCargoEmpleado = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idCargoEmpleado, nombreCargoEmpleado FROM CargoEmpleado', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateComunidad = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query = "SELECT Comunidad.idComunidad, " +
        "CONCAT(TipoComunidad.nombreTipoComunidad, \' \' , Comunidad.nombreComunidad, \' - \', Municipio.codigoMunicipio) AS comunidad, " +
        "Comunidad.nombreComunidad, Comunidad.idMunicipio, Comunidad.idTipoComunidad " +
        "FROM Comunidad INNER JOIN Municipio " +
            "ON Comunidad.idMunicipio = Municipio.idMunicipio " +
        "INNER JOIN TipoComunidad " +
            "ON Comunidad.idTipoComunidad = TipoComunidad.idTipoComunidad";
        connection.query(query, [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

populateSelectsController.populateCargoEmpleadoSinAbogado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
      
        connection.query('SELECT idCargoEmpleado, nombreCargoEmpleado FROM CargoEmpleado WHERE NOT idCargoEmpleado=?', [1], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(string);
      });
      
    });
}

module.exports = populateSelectsController;