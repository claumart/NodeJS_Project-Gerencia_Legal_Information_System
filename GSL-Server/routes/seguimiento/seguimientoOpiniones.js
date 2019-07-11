var express = require('express');
var router = express.Router();
var seguimientoOpinionController = require('../../controllers/controlesDeSeguimiento/seguimientoOpinionesController');
var countSeguimientoOpinionController = require('../../controllers/controlesDeSeguimiento/countSeguimientoOpinionesController');

/****************************************************Conteo****************************************************/
router.post('/seguimiento/opiniones/contar/recibidas', countSeguimientoOpinionController.contarOpinionesRecibidas);

router.post('/seguimiento/opiniones/contar/asignadas', countSeguimientoOpinionController.contarOpinionesAsignadas);

router.post('/seguimiento/opiniones/contar/descargadas', countSeguimientoOpinionController.contarOpinionesDescargadas);

router.post('/seguimiento/opiniones/contar/revisadas', countSeguimientoOpinionController.contarOpinionesRevisadas);

router.post('/seguimiento/opiniones/contar/remitidas', countSeguimientoOpinionController.contarOpinionesRemitidas);


/***************************************************Busqueda***************************************************/
router.post('/seguimiento/opiniones/mostrar/recibidas', seguimientoOpinionController.mostrarOpinionesRecibidas);

router.post('/seguimiento/opiniones/mostrar/asignadas', seguimientoOpinionController.mostrarOpinionesAsignadas);

router.post('/seguimiento/opiniones/mostrar/descargadas', seguimientoOpinionController.mostrarOpinionesDescargadas);

router.post('/seguimiento/opiniones/mostrar/revisadas', seguimientoOpinionController.mostrarOpinionesRevisadas);

router.post('/seguimiento/opiniones/mostrar/remitidas', seguimientoOpinionController.mostrarOpinionesRemitidas);

router.post('/seguimiento/opiniones/mostrar/oficioParticular', seguimientoOpinionController.mostrarOpinionPorOficio);

module.exports = router;