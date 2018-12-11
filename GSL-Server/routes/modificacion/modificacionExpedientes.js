/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionExpController = require('../../controllers/controlesDeModificacion/expedientes/modificacionExpedientesController');
var modExpEntradaController = require('../../controllers/controlesDeModificacion/expedientes/modExpEntradaController');

router.post('/modificacion/expedientes/mostrar/fichas', modificacionExpController.getFichas);

router.post('/modificacion/expedientes/mostrar/fichasDePrevision', modificacionExpController.getFichasDePrevision);

router.post('/modificacion/expedientes/obtener/formularioEntrada', modExpEntradaController.getFichaEntrada);

router.post('/modificacion/expedientes/obtener/expedientes', modExpEntradaController.getExpedientes);

router.post('/modificacion/expedientes/actualizar/fichaEntrada/noAcumulado', modExpEntradaController.updateNoAcumulado);

router.post('/modificacion/expedientes/actualizar/fichaEntrada/acumulado', modExpEntradaController.updateAcumulado);

/*router.post('/modificacion/expedientes/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/expedientes/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;