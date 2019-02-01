var usuarioController = {};
var status = require('http-status');
var fs = require('fs-extra');
const crypto = require('crypto');
var path = require('path');

usuarioController.verificarUserId = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT identificacionUsuario FROM Usuario WHERE identificacionUsuario = ?", [req.body.userId], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0){
	            if(results[0].identificacionUsuario == req.body.userId) {
	                res.send(true);
	            } else{
	                res.send(false);
	            }
	        }else {
            	res.send(false);
            }
        });
      
    });
}

usuarioController.verificarPassword = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query("SELECT identificacionUsuario, password FROM Usuario WHERE identificacionUsuario = ? AND password = ?", 
        [req.body.userId, req.body.password], (err, results) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results.length > 0){
            	if(results[0].identificacionUsuario == req.body.userId && results[0].password == req.body.password) {
	                res.send(true);
	            } else{
	                res.send(false);
	            }
            }else {
            	res.send(false);
            }
        });
      
    });
}

usuarioController.iniciarSesion = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        var query1 = "SELECT idUsuario, identificacionUsuario, password, nombreEmpleado " +
        "FROM Usuario INNER JOIN Empleado " +
        	"ON Usuario.numEmpleado = Empleado.numEmpleado " +
        "WHERE Usuario.identificacionUsuario = ? AND Usuario.password = ?";
        connection.query(query1, [req.body.userId, req.body.password], (err, results1) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if(results1.length > 0){
            	if(results1[0].identificacionUsuario == req.body.userId && results1[0].password == req.body.password) {
            		var query2 = "SELECT Privilegio.codigoPrivilegio FROM PrivilegioXUsuario INNER JOIN Privilegio " +
            		"ON Privilegio.idPrivilegio = PrivilegioXUsuario.idPrivilegio WHERE PrivilegioXUsuario.idUsuario = ?";
            		connection.query(query2, [results1[0].idUsuario], (err, results2) => {
			            if (err) {
			                console.log(err);
			                return next(err);
			            }
			            req.session.userId = results1[0].identificacionUsuario;
            			req.session.nombreEmpleado = results1[0].nombreEmpleado;
            			req.session.userPrivileges = results2.map(function(value, index, array){return value.codigoPrivilegio;});
	                	res.send("/inicio");
			        });
	            } else{
	                res.send("/");
	            }
            }
        });
      
    });
}


usuarioController.obtenerPrivilegios = (req, res, next) => {
	var string=JSON.stringify(req.session.userPrivileges);
    res.json(string);
}


usuarioController.comprobarPassword = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT password FROM Usuario WHERE identificacionUsuario = ?', 
	    [req.session.userId], (err, results) => {
	        if (err) {
	            console.log(err);
	            return next(err);
	        }  

           	if(results[0].password == req.body.actualPassword) {
	            res.send(true);
	        } else{
	            res.send(false);
	        }
	            
	    });
    });
}

usuarioController.cambiarPassword = (req, res, next) => {
    req.getConnection((err, connection)=> {
        if (err) return next(err);
        connection.query('SELECT password, idUsuario FROM Usuario WHERE identificacionUsuario = ?', 
	    [req.session.userId], (err, results) => {
	        if (err) {
	            console.log(err);
	            return next(err);
	        }  

           	if(results[0].password == req.body.actualPassword) {
           		if(req.body.newPassword == req.body.passwordVerification){
           			connection.query("UPDATE Usuario SET password = ?  WHERE idUsuario = ?", 
				    [req.body.newPassword, results[0].idUsuario], (err, rows) => {
				        if (err) {
				            console.log(err);
				            res.status(500).send(err);
				            return next(err);
				        }
				        res.send(true);
				    });
           		}else{
           			res.send(false);
           		}
	        } else{
	            res.send(false);
	        }
	            
	    });
    });
}


module.exports = usuarioController;