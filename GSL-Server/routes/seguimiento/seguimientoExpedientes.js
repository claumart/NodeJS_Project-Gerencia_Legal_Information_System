var express = require('express');
var router = express.Router();
var seguimientoExpController = require('../../controllers/controlesDeSeguimiento/seguimientoExpedientesController');
var countSeguimientoExpController = require('../../controllers/controlesDeSeguimiento/countSeguimientoExpedientesController');

/****************************************************Conteo****************************************************/
router.post('/seguimiento/expedientes/contar/recibidos', countSeguimientoExpController.contarExpedientesRecibidos);

router.post('/seguimiento/expedientes/contar/asignados', countSeguimientoExpController.contarExpedientesAsignados);

router.post('/seguimiento/expedientes/contar/descargados', countSeguimientoExpController.contarExpedientesDescargados);

router.post('/seguimiento/expedientes/contar/revisados', countSeguimientoExpController.contarExpedientesRevisados);

router.post('/seguimiento/expedientes/contar/remitidos', countSeguimientoExpController.contarExpedientesRemitidos);

router.post('/seguimiento/expedientes/contar/conprevio', countSeguimientoExpController.contarExpedientesConPrevio);


/***************************************************Busqueda***************************************************/
router.post('/seguimiento/expedientes/mostrar/recibidos', seguimientoExpController.mostrarExpedientesRecibidos);

router.post('/seguimiento/expedientes/mostrar/asignados', seguimientoExpController.mostrarExpedientesAsignados);

router.post('/seguimiento/expedientes/mostrar/descargados', seguimientoExpController.mostrarExpedientesDescargados);

router.post('/seguimiento/expedientes/mostrar/revisados', seguimientoExpController.mostrarExpedientesRevisados);

router.post('/seguimiento/expedientes/mostrar/remitidos', seguimientoExpController.mostrarExpedientesRemitidos);

router.post('/seguimiento/expedientes/mostrar/conprevio', seguimientoExpController.mostrarExpedientesConPrevio);

router.post('/seguimiento/expedientes/mostrar/expedienteParticular', seguimientoExpController.mostrarExpedientePorNumero);

module.exports = router;