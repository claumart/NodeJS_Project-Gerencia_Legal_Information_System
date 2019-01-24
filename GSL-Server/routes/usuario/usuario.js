var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/controlesDeUsuario/usuarioController');

router.post('/usuario/verificarUserId', usuarioController.verificarUserId);

router.post('/usuario/verificarPassword', usuarioController.verificarPassword);

router.post('/usuario/iniciarSesion', usuarioController.iniciarSesion);

router.post('/usuario/obtenerPrivilegios', usuarioController.obtenerPrivilegios);


module.exports = router;