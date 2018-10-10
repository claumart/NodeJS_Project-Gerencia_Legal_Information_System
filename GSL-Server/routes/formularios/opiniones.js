var express = require('express');
var router = express.Router();
var registrarOficioController = require('../../controllers/controlesDeFormularios/opiniones/registrarOficioRecibidoController');
var asignarOficioController = require('../../controllers/controlesDeFormularios/opiniones/asignarOficioController');
var descargarOficioController = require('../../controllers/controlesDeFormularios/opiniones/descargarOficioController');
var revisarOficioController = require('../../controllers/controlesDeFormularios/opiniones/revisarOficioController');
var remitirOficioController = require('../../controllers/controlesDeFormularios/opiniones/remitirOficioController');

router.post('/formularios/opiniones/registrar', registrarOficioController.saveOpinion);
router.post('/formularios/opiniones/asignar', asignarOficioController.asignarOpinion);
router.post('/formularios/opiniones/descargar', descargarOficioController.descargarOpinion);
router.post('/formularios/opiniones/revisar', revisarOficioController.revisarOpinion);
router.post('/formularios/opiniones/remitir', remitirOficioController.remitirOpinion);


module.exports = router;