var express = require('express');
var router = express.Router();
var registrarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/registrarPatronatoRecibidoController');
var asignarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/asignarPatronatoController');
var descargarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/descargarPatronatoController');
var revisarPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/revisarPatronatoController');
var remitirPatronatoController = require('../../controllers/controlesDeFormularios/patronatos/remitirPatronatoController');

//router.post('/formularios/patronatos/registrar', registrarPatronatoController.savePatronato);
router.post('/formularios/patronatos/asignar', asignarPatronatoController.asignarPatronato);
router.post('/formularios/patronatos/descargar', descargarPatronatoController.descargarPatronato);
//router.post('/formularios/patronatos/revisar', revisarPatronatoController.revisarPatronato);
router.post('/formularios/patronatos/remitir', remitirPatronatoController.remitirPatronato);

module.exports = router;