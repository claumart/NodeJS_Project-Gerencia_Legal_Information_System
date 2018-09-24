var express = require('express');
var router = express.Router();
var registrarExpController = require('../../controllers/controlesDeFormularios/expedientes/registrarExpRecibidoController');
var asignarExpController = require('../../controllers/controlesDeFormularios/expedientes/asignarExpController');
var descargarExpController = require('../../controllers/controlesDeFormularios/expedientes/descargarExpController');
var revisarExpController = require('../../controllers/controlesDeFormularios/expedientes/revisarExpController');
var remitirExpController = require('../../controllers/controlesDeFormularios/expedientes/remitirExpController');
var providenciaExpController = require('../../controllers/controlesDeFormularios/expedientes/providenciaExpController');

/******************************************Registro de Expedientes*********************************************/
router.post('/formularios/expedientes/registrar/noAcumulado', registrarExpController.saveNoAcumulado);

router.post('/formularios/expedientes/registrar/acumulado', registrarExpController.saveAcumulado);

/****************************************Asignación de Expedientes********************************************/
router.post('/formularios/expedientes/asignar', asignarExpController.asignarExpedientes);


/****************************************Descargo de Expedientes********************************************/
router.post('/formularios/expedientes/descargar', descargarExpController.descargarExpedientes);


/****************************************Revisión de Expedientes********************************************/
router.post('/formularios/expedientes/revisar', revisarExpController.crearDictamen);


/****************************************Remisión de Expedientes********************************************/
router.post('/formularios/expedientes/remitir', remitirExpController.remitirExpedientes);


/****************************************Providencia de Expedientes********************************************/
router.post('/formularios/expedientes/remitirConPrevio', providenciaExpController.remitirConPrevio);

//router.post('/formularios/expedientes/reingresarConPrevio', providenciaExpController.reingresarConPrevio);
router.get('/', revisarExpController.verDir);

module.exports = router;