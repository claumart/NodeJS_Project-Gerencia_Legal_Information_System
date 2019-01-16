var express = require('express');
var router = express.Router();
var detalleExpedienteController = require('../../controllers/controlesDeDetalle/detalleExpedienteController');
var detalleOpinionController = require('../../controllers/controlesDeDetalle/detalleOpinionController');
var detallePatronatoController = require('../../controllers/controlesDeDetalle/detallePatronatoController');

router.post('/detalle/expediente/obtenerfichaCompleta', detalleExpedienteController.obtenerfichaCompleta);

router.post('/detalle/expediente/obtenerPdf', detalleExpedienteController.obtenerPdf);

router.post('/detalle/expediente/obtenerWord', detalleExpedienteController.obtenerWord);

router.post('/detalle/expediente/obtenerHistorialPrevision', detalleExpedienteController.obtenerHistorialPrevision);

router.post('/detalle/opinion/obtenerfichaCompleta', detalleOpinionController.obtenerfichaCompleta);

router.post('/detalle/opinion/obtenerPdf', detalleOpinionController.obtenerPdf);

router.post('/detalle/opinion/obtenerWord', detalleOpinionController.obtenerWord);

router.post('/detalle/opinion/obtenerArchivosAdjuntos', detalleOpinionController.obtenerArchivosAdjuntos);

router.post('/detalle/patronato/obtenerfichaCompleta', detallePatronatoController.obtenerfichaCompleta);

router.post('/detalle/patronato/obtenerPdf', detallePatronatoController.obtenerPdf);

router.post('/detalle/patronato/obtenerWord', detallePatronatoController.obtenerWord);

module.exports = router;