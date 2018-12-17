/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionOpnController = require('../../controllers/controlesDeModificacion/opiniones/modificacionOpinionesController');
var modOpnEntradaController = require('../../controllers/controlesDeModificacion/opiniones/modOpnEntradaController');
var modOpnAsignacionController = require('../../controllers/controlesDeModificacion/opiniones/modOpnAsignacionController');
var modOpnDescargoController = require('../../controllers/controlesDeModificacion/opiniones/modOpnDescargoController');
var modOpnRemisionController = require('../../controllers/controlesDeModificacion/opiniones/modOpnRemisionController');

router.post('/modificacion/opiniones/mostrar/fichas', modificacionOpnController.getFichas);

router.post('/modificacion/opiniones/obtener/formularioEntrada', modOpnEntradaController.getFichaEntrada);

router.post('/modificacion/opiniones/actualizar/fichaEntrada', modOpnEntradaController.updateOpinion);

router.post('/modificacion/opiniones/obtener/formularioAsignacion', modOpnAsignacionController.getFichaAsignacion);

router.post('/modificacion/opiniones/actualizar/formularioAsignacion', modOpnAsignacionController.updateAsignacion);

router.post('/modificacion/opiniones/obtener/formularioDescargo', modOpnDescargoController.getFichaDescargo);

router.post('/modificacion/opiniones/actualizar/formularioDescargo', modOpnDescargoController.updateDescargo);

router.post('/modificacion/opiniones/obtener/formularioRemision', modOpnRemisionController.getFichaRemision);

router.post('/modificacion/opiniones/actualizar/formularioRemision', modOpnRemisionController.updateRemision);

/*router.post('/modificacion/expedientes/mostrar/descargados', modificacionExpController.mostrarExpedientesDescargados);

router.post('/modificacion/expedientes/mostrar/revisados', modificacionExpController.mostrarExpedientesRevisados);

router.post('/modificacion/expedientes/mostrar/remitidos', modificacionExpController.mostrarExpedientesRemitidos);

router.post('/modificacion/expedientes/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/expedientes/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;