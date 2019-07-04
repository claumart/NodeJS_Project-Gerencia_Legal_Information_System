var express = require('express');
var router = express.Router();
var buscarRegistroExpedienteController = require('../../controllers/controlesDeBusqueda/buscarExpedientesController');
var buscarRegistroOpinionController = require('../../controllers/controlesDeBusqueda/buscarOpinionesController');
var buscarRegistroPatronatosController = require('../../controllers/controlesDeBusqueda/buscarPatronatosController');
var countRegistroExpedienteController = require('../../controllers/controlesDeBusqueda/CountBuscarExpedientesController');
var countRegistroOpinionController = require('../../controllers/controlesDeBusqueda/CountBuscarOpinionesController');
var countRegistroPatronatosController = require('../../controllers/controlesDeBusqueda/CountBuscarPatronatosController');


/****************************************************Conteo****************************************************/
router.post('/contar/expedientes/parametros1/sinFecha', countRegistroExpedienteController.parametros1SinFecha);

router.post('/contar/expedientes/parametros1/conFecha', countRegistroExpedienteController.parametros1ConFecha);

router.post('/contar/expedientes/parametros2/conFecha', countRegistroExpedienteController.parametros2ConFecha);

router.post('/contar/opiniones/parametros1/sinFecha', countRegistroOpinionController.parametros1SinFecha);

router.post('/contar/opiniones/parametros1/conFecha', countRegistroOpinionController.parametros1ConFecha);

router.post('/contar/opiniones/parametros2/conFecha', countRegistroOpinionController.parametros2ConFecha);

router.post('/contar/patronatos/parametros1/sinFecha', countRegistroPatronatosController.parametros1SinFecha);

router.post('/contar/patronatos/parametros1/conFecha', countRegistroPatronatosController.parametros1ConFecha);

router.post('/contar/patronatos/parametros2/conFecha', countRegistroPatronatosController.parametros2ConFecha);


/***************************************************Busqueda***************************************************/
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