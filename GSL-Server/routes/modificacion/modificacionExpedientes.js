/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionExpController = require('../../controllers/controlesDeModificacion/expedientes/modificacionExpedientesController');
var modExpEntradaController = require('../../controllers/controlesDeModificacion/expedientes/modExpEntradaController');
var modExpAsignacionController = require('../../controllers/controlesDeModificacion/expedientes/modExpAsignacionController');
var modExpDescargoController = require('../../controllers/controlesDeModificacion/expedientes/modExpDescargoController');
var modExpRevisionController = require('../../controllers/controlesDeModificacion/expedientes/modExpRevisionController');
var modExpRemisionController = require('../../controllers/controlesDeModificacion/expedientes/modExpRemisionController');
var modExpProvidenciaController = require('../../controllers/controlesDeModificacion/expedientes/modExpProvidenciaController');

router.post('/modificacion/expedientes/mostrar/fichas', modificacionExpController.getFichas);

router.post('/modificacion/expedientes/mostrar/fichasDePrevision', modificacionExpController.getFichasDePrevision);

router.post('/modificacion/expedientes/obtener/formularioEntrada', modExpEntradaController.getFichaEntrada);

router.post('/modificacion/expedientes/obtener/expedientes', modExpEntradaController.getExpedientes);

router.post('/modificacion/expedientes/actualizar/fichaEntrada/noAcumulado', modExpEntradaController.updateNoAcumulado);

router.post('/modificacion/expedientes/actualizar/fichaEntrada/acumulado', modExpEntradaController.updateAcumulado);

router.post('/modificacion/expedientes/obtener/formularioAsignacion', modExpAsignacionController.getFichaAsignacion);

router.post('/modificacion/expedientes/actualizar/formularioAsignacion', modExpAsignacionController.updateAsignacion);

router.post('/modificacion/expedientes/obtener/formularioDescargo', modExpDescargoController.getFichaDescargo);

router.post('/modificacion/expedientes/actualizar/formularioDescargo', modExpDescargoController.updateDescargo);

router.post('/modificacion/expedientes/obtener/formularioRevision', modExpRevisionController.getFichaRevision);

router.post('/modificacion/expedientes/actualizar/formularioRevision', modExpRevisionController.updateRevision);

router.post('/modificacion/expedientes/obtener/formularioRemision', modExpRemisionController.getFichaRemision);

router.post('/modificacion/expedientes/actualizar/formularioRemision', modExpRemisionController.updateRemision);

router.post('/modificacion/expedientes/obtener/formularioRemisionPrevio', modExpProvidenciaController.getFichaRemisionPrevio);

router.post('/modificacion/expedientes/actualizar/formularioRemisionPrevio', modExpProvidenciaController.updateRemisionPrevio);

router.post('/modificacion/expedientes/obtener/formularioReingresoPrevio', modExpProvidenciaController.getFichaReingresoPrevio);

router.post('/modificacion/expedientes/actualizar/formularioReingresoPrevio', modExpProvidenciaController.updateReingresoPrevio);
/*router.post('/modificacion/expedientes/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/expedientes/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;