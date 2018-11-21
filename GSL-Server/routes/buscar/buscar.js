var express = require('express');
var router = express.Router();
var buscarRegistroExpedienteController = require('../../controllers/controlesDeBusqueda/buscarExpedientesController');
var buscarRegistroOpinionController = require('../../controllers/controlesDeBusqueda/buscarOpinionesController');
var buscarRegistroPatronatosController = require('../../controllers/controlesDeBusqueda/buscarPatronatosController');

router.post('/buscar/expedientes/parametros1/sinFecha', buscarRegistroExpedienteController.parametros1SinFecha);

router.post('/buscar/expedientes/parametros1/conFecha', buscarRegistroExpedienteController.parametros1ConFecha);

router.post('/buscar/expedientes/parametros2/conFecha', buscarRegistroExpedienteController.parametros2ConFecha);

router.post('/buscar/opiniones/parametros1/sinFecha', buscarRegistroOpinionController.parametros1SinFecha);

router.post('/buscar/opiniones/parametros1/conFecha', buscarRegistroOpinionController.parametros1ConFecha);

router.post('/buscar/opiniones/parametros2/conFecha', buscarRegistroOpinionController.parametros2ConFecha);

router.post('/buscar/patronatos/parametros1/sinFecha', buscarRegistroPatronatosController.parametros1SinFecha);

router.post('/buscar/patronatos/parametros1/conFecha', buscarRegistroPatronatosController.parametros1ConFecha);

router.post('/buscar/patronatos/parametros2/conFecha', buscarRegistroPatronatosController.parametros2ConFecha);


module.exports = router;