var populateSelectsController = {};

populateSelectsController.populateDependencia = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results);
            console.log(__dirname);
        	res.json(string);
      	});
      
    });
}

populateSelectsController.populateEmpleadoReceptor = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT numEmpleado, nombreEmpleado FROM Empleado WHERE activo=?', [true], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results);
        	
        	res.json(string);
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
	        res.json(string);
      	});
      
    });
}

populateSelectsController.populateEstadoExpediente = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
    	connection.query('SELECT idEstadoExpediente, nombreEstadoExpediente as nombreEstado FROM EstadoExpediente', [], (err, results) => {
	        if (err) return next(err);
	        var string=JSON.stringify(results);
	        res.json(string);
	    });
      
    });
}

populateSelectsController.populateAsunto = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idAsunto, nombreAsunto FROM Asunto', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results);
        res.json(string);
      });
      
    });
}
populateSelectsController.populateTipoComunidad = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idTipoComunidad, nombreTipoComunidad FROM TipoComunidad', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        res.json(string);
      });
      
    });
}
populateSelectsController.populateCargoEmpleado = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idCargoEmpleado, nombreCargoEmpleado FROM CargoEmpleado', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        res.json(string);
      });
      
    });
}

populateSelectsController.populateCargoEmpleadoSinAbogado = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
      
        connection.query('SELECT idCargoEmpleado, nombreCargoEmpleado FROM CargoEmpleado WHERE NOT idCargoEmpleado=?', [1], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        res.json(string);
      });
      
    });
}

module.exports = populateSelectsController;