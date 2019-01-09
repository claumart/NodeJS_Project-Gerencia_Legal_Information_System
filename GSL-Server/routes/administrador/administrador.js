var express = require('express');
var router = express.Router();
var administradorController = require('../../controllers/controlesDeAdministrador/administradorController');

router.post('/administrar/buscar/ficha/expediente', administradorController.mostrarExpedientePorNumero);

router.post('/administrar/eliminar/ficha/expediente', administradorController.eliminarExpediente);

router.post('/administrar/buscar/ficha/opinion', administradorController.mostrarOpinionPorOficio);

router.post('/administrar/eliminar/ficha/opinion', administradorController.eliminarOpinion);

router.post('/administrar/buscar/ficha/patronato', administradorController.mostrarPatronatoPorNumero);

router.post('/administrar/eliminar/ficha/patronato', administradorController.eliminarPatronato);

/*router.post('/buscar/expedientes/parametros1/conFecha', administradorController.parametros1ConFecha);

router.post('/buscar/expedientes/parametros2/conFecha', administradorController.parametros2ConFecha);

router.post('/administrar/eliminar/', buscarRegistroOpinionController.parametros1SinFecha);

router.post('/buscar/opiniones/parametros1/conFecha', buscarRegistroOpinionController.parametros1ConFecha);

router.post('/buscar/opiniones/parametros2/conFecha', buscarRegistroOpinionController.parametros2ConFecha);

router.post('/administrar/eliminar/', buscarRegistroPatronatosController.parametros1SinFecha);

router.post('/buscar/patronatos/parametros1/conFecha', buscarRegistroPatronatosController.parametros1ConFecha);

router.post('/buscar/patronatos/parametros2/conFecha', buscarRegistroPatronatosController.parametros2ConFecha);*/


module.exports = router;