var express = require('express');
var router = express.Router();
var registrarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/registrarPatronatoRecibidoController');
var asignarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/asignarPatronatoController');
var descargarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/descargarPatronatoController');
var revisarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/revisarPatronatoController');
var remitirPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/remitirPatronatoController');

/******************************************Registro de Patronatos*********************************************/
router.post('/formularios/patronatos/registrar/noAcumulado', registrarPatronatoController.saveNoAcumulado);

router.post('/formularios/patronatos/registrar/acumulado', registrarPatronatoController.saveAcumulado);

/****************************************Asignación de Patronatos********************************************/
router.post('/formularios/patronatos/asignar', asignarPatronatoController.asignarPatronato);

/****************************************Descargo de Patronatos********************************************/
router.post('/formularios/patronatos/descargar', descargarPatronatoController.descargarPatronato);

/****************************************Revisión de Patronatos********************************************/
//router.post('/formularios/patronatos/revisar', revisarPatronatoController.revisarPatronato);

/****************************************Remisión de Patronatos********************************************/
router.post('/formularios/patronatos/remitir', remitirPatronatoController.remitirPatronato);

module.exports = router;