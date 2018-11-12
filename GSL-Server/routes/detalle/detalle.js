var express = require('express');
var router = express.Router();
var detalleExpedienteController = require('../../controllers/controlesDeDetalle/detalleExpedienteController');
var detalleOpinionController = require('../../controllers/controlesDeDetalle/detalleOpinionController');

router.post('/detalle/expediente/obtenerfichaCompleta', detalleExpedienteController.obtenerfichaCompleta);

router.post('/detalle/expediente/obtenerImagenesDictamen', detalleExpedienteController.obtenerImagenesDictamen);

router.post('/detalle/expediente/obtenerHistorialPrevision', detalleExpedienteController.obtenerHistorialPrevision);

router.post('/detalle/opinion/obtenerfichaCompleta', detalleOpinionController.obtenerfichaCompleta);

router.post('/detalle/opinion/obtenerImagenesDictamen', detalleOpinionController.obtenerImagenesDictamen);

router.post('/detalle/opinion/obtenerArchivosAdjuntos', detalleOpinionController.obtenerArchivosAdjuntos);


module.exports = router;