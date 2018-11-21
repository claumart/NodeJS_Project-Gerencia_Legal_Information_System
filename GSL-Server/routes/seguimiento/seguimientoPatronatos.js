var express = require('express');
var router = express.Router();
var seguimientoPatronatoController = require('../../controllers/controlesDeSeguimiento/seguimientoPatronatosController');

router.post('/seguimiento/patronatos/mostrar/recibidos', seguimientoPatronatoController.mostrarPatronatosRecibidos);

router.post('/seguimiento/patronatos/mostrar/asignados', seguimientoPatronatoController.mostrarPatronatosAsignados);

router.post('/seguimiento/patronatos/mostrar/descargados', seguimientoPatronatoController.mostrarPatronatosDescargados);

router.post('/seguimiento/patronatos/mostrar/revisados', seguimientoPatronatoController.mostrarPatronatosRevisados);

router.post('/seguimiento/patronatos/mostrar/remitidos', seguimientoPatronatoController.mostrarPatronatosRemitidos);

router.post('/seguimiento/patronatos/mostrar/patronatoParticular', seguimientoPatronatoController.mostrarPatronatoPorNumero);

module.exports = router;