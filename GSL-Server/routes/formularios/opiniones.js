var express = require('express');
var router = express.Router();
var registrarOficioController = require('../../controllers/controlesDeFormularios/opiniones/registrarOficioRecibidoController');

router.post('/formularios/opiniones/registrar', registrarOficioController.saveOpinion);


module.exports = router;