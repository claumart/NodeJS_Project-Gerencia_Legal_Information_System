var populateSelectsController = {};

populateSelectsController.populateDependencia = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results)
        	console.log(string);
        	//results[0].RESULT;
        	// -> 1
        
        	res.json(string);
      	});
      
    });
	//res.json();
}

populateSelectsController.populateEmpleadoReceptor = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT numEmpleado, nombresEmpleado, apellidosEmpleado FROM Empleado WHERE activo=1', [], (err, results) => {
        	if (err) return next(err);
        	var string=JSON.stringify(results)
        	console.log(string);
        	//results[0].RESULT;
        	// -> 1
        
        	res.json(string);
      	});
      
    });
}

populateSelectsController.populateAbogadoAsignado = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT numEmpleado, nombresEmpleado, apellidosEmpleado FROM ' +
    		'(Empleado WHERE activo="true" and idCargo=1', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        //results[0].RESULT;
        // -> 1
        
        res.json(string);
      });
      
    });
}

populateSelectsController.populateEstadoExpediente = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        //results[0].RESULT;
        // -> 1
        
        res.json(string);
      });
      
    });
}

populateSelectsController.populateAsunto = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idAsunto, nombreAsunto FROM Asunto', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        //results[0].RESULT;
        // -> 1
        
        res.json(string);
      });
      
    });
}
populateSelectsController.populateTipoLugar = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        //results[0].RESULT;
        // -> 1
        
        res.json(string);
      });
      
    });
}
populateSelectsController.populateCargoEmpleado = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        if (err) return next(err);
        var string=JSON.stringify(results)
        console.log(string);
        //results[0].RESULT;
        // -> 1
        
        res.json(string);
      });
      
    });
}


module.exports = populateSelectsController;