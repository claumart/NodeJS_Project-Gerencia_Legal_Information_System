/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionPttController = require('../../controllers/controlesDeModificacion/patronatos/modificacionPatronatosController');
var modPttEntradaController = require('../../controllers/controlesDeModificacion/patronatos/modPttEntradaController');

router.post('/modificacion/patronatos/mostrar/fichas', modificacionPttController.getFichas);

router.post('/modificacion/patronatos/obtener/formularioEntrada', modPttEntradaController.getFichaEntrada);

router.post('/modificacion/patronatos/obtener/expedientes', modPttEntradaController.getExpedientes);

router.post('/modificacion/patronatos/obtener/nombreComunidad', modPttEntradaController.getNombreComunidad);

router.post('/modificacion/patronatos/actualizar/fichaEntrada/noAcumulado', modPttEntradaController.updateNoAcumulado);

router.post('/modificacion/patronatos/actualizar/fichaEntrada/acumulado', modPttEntradaController.updateAcumulado);

/*router.post('/modificacion/patronatos/mostrar/remitidos', modificacionExpController.mostrarExpedientesRemitidos);

router.post('/modificacion/patronatos/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/patronatos/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;