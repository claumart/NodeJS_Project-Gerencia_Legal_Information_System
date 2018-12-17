/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionPttController = require('../../controllers/controlesDeModificacion/patronatos/modificacionPatronatosController');
var modPttEntradaController = require('../../controllers/controlesDeModificacion/patronatos/modPttEntradaController');
var modPttAsignacionController = require('../../controllers/controlesDeModificacion/patronatos/modPttAsignacionController');
var modPttDescargoController = require('../../controllers/controlesDeModificacion/patronatos/modPttDescargoController');
var modPttRemisionController = require('../../controllers/controlesDeModificacion/patronatos/modPttRemisionController');

router.post('/modificacion/patronatos/mostrar/fichas', modificacionPttController.getFichas);

router.post('/modificacion/patronatos/obtener/formularioEntrada', modPttEntradaController.getFichaEntrada);

router.post('/modificacion/patronatos/obtener/expedientes', modPttEntradaController.getExpedientes);

router.post('/modificacion/patronatos/obtener/nombreComunidad', modPttEntradaController.getNombreComunidad);

router.post('/modificacion/patronatos/actualizar/fichaEntrada/noAcumulado', modPttEntradaController.updateNoAcumulado);

router.post('/modificacion/patronatos/actualizar/fichaEntrada/acumulado', modPttEntradaController.updateAcumulado);

router.post('/modificacion/patronatos/obtener/formularioAsignacion', modPttAsignacionController.getFichaAsignacion);

router.post('/modificacion/patronatos/actualizar/formularioAsignacion', modPttAsignacionController.updateAsignacion);

router.post('/modificacion/patronatos/obtener/formularioDescargo', modPttDescargoController.getFichaDescargo);

router.post('/modificacion/patronatos/actualizar/formularioDescargo', modPttDescargoController.updateDescargo);

router.post('/modificacion/patronatos/obtener/formularioRemision', modPttRemisionController.getFichaRemision);

router.post('/modificacion/patronatos/actualizar/formularioRemision', modPttRemisionController.updateRemision);

/*router.post('/modificacion/patronatos/mostrar/remitidos', modificacionExpController.mostrarExpedientesRemitidos);

router.post('/modificacion/patronatos/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/patronatos/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;