var express = require('express');
var router = express.Router();
var seguimientoExpController = require('../../controllers/controlesDeSeguimiento/seguimientoExpedientesController');

router.post('/seguimiento/expedientes/mostrar/recibidos', seguimientoExpController.mostrarExpedientesRecibidos);

router.post('/seguimiento/expedientes/mostrar/asignados', seguimientoExpController.mostrarExpedientesAsignados);

router.post('/seguimiento/expedientes/mostrar/descargados', seguimientoExpController.mostrarExpedientesDescargados);

router.post('/seguimiento/expedientes/mostrar/revisados', seguimientoExpController.mostrarExpedientesRevisados);

router.post('/seguimiento/expedientes/mostrar/remitidos', seguimientoExpController.mostrarExpedientesRemitidos);

router.post('/seguimiento/expedientes/mostrar/conprevio', seguimientoExpController.mostrarExpedientesConPrevio);

router.post('/seguimiento/expedientes/mostrar/expedienteParticular', seguimientoExpController.mostrarExpedientePorNumero);

module.exports = router;