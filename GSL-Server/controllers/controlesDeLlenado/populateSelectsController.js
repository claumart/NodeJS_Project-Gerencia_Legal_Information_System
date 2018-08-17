var populateSelectsController = {};

populateSelectsController.populateDependencia = (req, res, next) => {
	req.getConnection((err, connection)=> {
    	if (err) return next(err);
      
    	connection.query('SELECT idDependencia, nombreDependencia FROM Dependencia', [], (err, results) => {
        if (err) return next(err);
        
        results[0].RESULT;
        // -> 1
        
        res.send(200);
      });
      
    });
	res.json();
}

populateSelectsController.populateEmpleadoReceptor = (req, res, next) => {
	res.json();
}

populateSelectsController.populateAbogadoAsignado = (req, res, next) => {
	res.json();
}

populateSelectsController.populateEstadoExpediente = (req, res, next) => {
	res.json();
}

populateSelectsController.populateAsunto = (req, res, next) => {
	res.json();
}
populateSelectsController.populateTipoLugar = (req, res, next) => {
	res.json();
}
populateSelectsController.populateCargoEmpleado = (req, res, next) => {
	res.json();
}


module.exports = populateSelectsController;