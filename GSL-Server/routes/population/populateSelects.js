var express = require('express');
var router = express.Router();
var populateSelectsController = require('../../controllers/controlesDeLlenado/populateSelectsController');

router.post('/populate/select/dependencia', populateSelectsController.populateDependencia);

router.post('/populate/select/empleadoReceptor', populateSelectsController.populateEmpleadoReceptor);

router.post('/populate/select/abogadoAsignado', populateSelectsController.populateAbogadoAsignado);

router.post('/populate/select/asunto', populateSelectsController.populateAsunto);

/*router.post('/populate/select/estadoExpediente', populateSelectsController);

router.post('/populate/select/tipoLugar', populateSelectsController);

router.post('/populate/select/cargoEmpleado', populateSelectsController);*/

module.exports = router;