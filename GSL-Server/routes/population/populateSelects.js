var express = require('express');
var router = express.Router();
var populateSelectsController = require('../../controllers/controlesDeLlenado');

router.post('/populate/select/dependencia', populateSelectsController);

router.post('/populate/select/empleadoReceptor', populateSelectsController);

router.post('/populate/select/abogadoAsignado', populateSelectsController);

router.post('/populate/select/estadoExpediente', populateSelectsController);

router.post('/populate/select/asunto', populateSelectsController);

router.post('/populate/select/tipoLugar', populateSelectsController);

router.post('/populate/select/cargoEmpleado', populateSelectsController);
module.exports = router;