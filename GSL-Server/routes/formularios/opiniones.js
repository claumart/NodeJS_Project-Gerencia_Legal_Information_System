var express = require('express');
var router = express.Router();
var registrarOficioController = require('../../controllers/controlesDeFormularios/opiniones/registrarOficioRecibidoController');

router.post('/formularios/opiniones/registrar/fechaActual', registrarOficioController.saveConFechaActual);

router.post('/formularios/opiniones/registrar/fechaPersonalizada', registrarOficioController.saveConFechaPersonalizada);


module.exports = router;