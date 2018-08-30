var express = require('express');
var router = express.Router();
var registrarExpController = require('../../controllers/controlesDeFormularios/expedientes/registrarExpRecibidoController');

router.post('/formularios/expedientes/registrar/noAcumuladoActual', registrarExpController.saveNoAcumuladoActual);

router.post('/formularios/expedientes/registrar/noAcumuladoPersonalizada', registrarExpController.saveNoAcumuladoPersonalizada);

router.post('/formularios/expedientes/registrar/acumuladoActual', registrarExpController.saveAcumuladoActual);

router.post('/formularios/expedientes/registrar/acumuladoPersonalizada', registrarExpController.saveAcumuladoPersonalizada);

module.exports = router;