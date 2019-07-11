var express = require('express');
var router = express.Router();
var seguimientoPatronatoController = require('../../controllers/controlesDeSeguimiento/seguimientoPatronatosController');
var countSeguimientoPatronatoController = require('../../controllers/controlesDeSeguimiento/countSeguimientoPatronatosController');

/****************************************************Conteo****************************************************/
router.post('/seguimiento/patronatos/contar/recibidos', countSeguimientoPatronatoController.contarPatronatosRecibidos);

router.post('/seguimiento/patronatos/contar/asignados', countSeguimientoPatronatoController.contarPatronatosAsignados);

router.post('/seguimiento/patronatos/contar/descargados', countSeguimientoPatronatoController.contarPatronatosDescargados);

router.post('/seguimiento/patronatos/contar/revisados', countSeguimientoPatronatoController.contarPatronatosRevisados);

router.post('/seguimiento/patronatos/contar/remitidos', countSeguimientoPatronatoController.contarPatronatosRemitidos);


/***************************************************Busqueda***************************************************/
router.post('/seguimiento/patronatos/mostrar/recibidos', seguimientoPatronatoController.mostrarPatronatosRecibidos);

router.post('/seguimiento/patronatos/mostrar/asignados', seguimientoPatronatoController.mostrarPatronatosAsignados);

router.post('/seguimiento/patronatos/mostrar/descargados', seguimientoPatronatoController.mostrarPatronatosDescargados);

router.post('/seguimiento/patronatos/mostrar/revisados', seguimientoPatronatoController.mostrarPatronatosRevisados);

router.post('/seguimiento/patronatos/mostrar/remitidos', seguimientoPatronatoController.mostrarPatronatosRemitidos);

router.post('/seguimiento/patronatos/mostrar/patronatoParticular', seguimientoPatronatoController.mostrarPatronatoPorNumero);

module.exports = router;