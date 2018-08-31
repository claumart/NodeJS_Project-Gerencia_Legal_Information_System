var express = require('express');
var router = express.Router();
var populateSelectsController = require('../../controllers/controlesDeLlenado/populateSelectsController');
var populateExtraInfoController = require('../../controllers/controlesDeLlenado/populateExtraInfoController');

router.post('/populate/select/dependencia', populateSelectsController.populateDependencia);

router.post('/populate/select/empleadoReceptor', populateSelectsController.populateEmpleadoReceptor);

router.post('/populate/select/abogadoAsignado', populateSelectsController.populateAbogadoAsignado);

router.post('/populate/select/asunto', populateSelectsController.populateAsunto);

router.post('/populate/select/tipoLugar', populateSelectsController.populateTipoLugar);

/*router.post('/populate/select/estadoExpediente', populateSelectsController);

router.post('/populate/select/cargoEmpleado', populateSelectsController);*/

/*************************Informacion extra******************************/
router.post('/populate/formularios/nombreExpedientes', populateExtraInfoController.getNombreExpedientes);

module.exports = router;