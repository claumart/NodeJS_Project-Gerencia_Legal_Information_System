var express = require('express');
var router = express.Router();
var seguimientoOpinionController = require('../../controllers/controlesDeSeguimiento/seguimientoOpinionesController');

router.post('/seguimiento/opiniones/mostrar/recibidas', seguimientoOpinionController.mostrarOpinionesRecibidas);

router.post('/seguimiento/opiniones/mostrar/asignadas', seguimientoOpinionController.mostrarOpinionesAsignadas);

router.post('/seguimiento/opiniones/mostrar/descargadas', seguimientoOpinionController.mostrarOpinionesDescargadas);

router.post('/seguimiento/opiniones/mostrar/revisadas', seguimientoOpinionController.mostrarOpinionesRevisadas);

router.post('/seguimiento/opiniones/mostrar/remitidas', seguimientoOpinionController.mostrarOpinionesRemitidas);

router.post('/seguimiento/opiniones/mostrar/oficioParticular', seguimientoOpinionController.mostrarOpinionPorOficio);

module.exports = router;