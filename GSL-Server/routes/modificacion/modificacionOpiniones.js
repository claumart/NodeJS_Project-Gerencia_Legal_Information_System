/***********************Hecho por Shirley Claudette Martínez***********************/
var express = require('express');
var router = express.Router();
var modificacionOpnController = require('../../controllers/controlesDeModificacion/modificacionOpinionesController');

router.post('/modificacion/opiniones/mostrar/fichas', modificacionOpnController.getFichas);

/*router.post('/modificacion/expedientes/mostrar/descargados', modificacionExpController.mostrarExpedientesDescargados);

router.post('/modificacion/expedientes/mostrar/revisados', modificacionExpController.mostrarExpedientesRevisados);

router.post('/modificacion/expedientes/mostrar/remitidos', modificacionExpController.mostrarExpedientesRemitidos);

router.post('/modificacion/expedientes/mostrar/conprevio', modificacionExpController.mostrarExpedientesConPrevio);

router.post('/modificacion/expedientes/mostrar/expedienteParticular', modificacionExpController.mostrarExpedientePorNumero);*/

module.exports = router;