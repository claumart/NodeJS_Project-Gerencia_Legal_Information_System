var express = require('express');
var router = express.Router();
var buscarRegistroExpedienteController = require('../../controllers/controlesDeBusqueda/buscarExpedientesController');

router.post('/buscar/expedientes/parametros1/sinFecha', buscarRegistroExpedienteController.parametros1SinFecha);

router.post('/buscar/expedientes/parametros1/conFecha', buscarRegistroExpedienteController.parametros1ConFecha);

router.post('/buscar/expedientes/parametros2/conFecha', buscarRegistroExpedienteController.parametros2ConFecha);



module.exports = router;