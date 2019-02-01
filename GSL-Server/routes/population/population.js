var express = require('express');
var router = express.Router();
var populateSelectsController = require('../../controllers/controlesDeLlenado/populateSelectsController');
var populateExtraInfoController = require('../../controllers/controlesDeLlenado/populateExtraInfoController');

router.post('/populate/select/dependencia', populateSelectsController.populateDependencia);

router.post('/populate/select/empleadoReceptor', populateSelectsController.populateEmpleadoReceptor);

router.post('/populate/select/empleado', populateSelectsController.populateEmpleado);

router.post('/populate/select/abogadoAsignado', populateSelectsController.populateAbogadoAsignado);

router.post('/populate/select/asunto', populateSelectsController.populateAsunto);

router.post('/populate/select/asuntoPatronato', populateSelectsController.populateAsuntoPatronato);

router.post('/populate/select/municipio', populateSelectsController.populateMunicipio);

router.post('/populate/select/tipoComunidad', populateSelectsController.populateTipoComunidad);

router.post('/populate/select/estadoExpediente', populateSelectsController.populateEstadoExpediente);

router.post('/populate/select/cargoEmpleado', populateSelectsController.populateCargoEmpleado);

router.post('/populate/select/cargoEmpleado/sinAbogado', populateSelectsController.populateCargoEmpleadoSinAbogado);

router.post('/populate/select/comunidad', populateSelectsController.populateComunidad);

router.post('/populate/checkbox/privilegio', populateSelectsController.populatePrivilegio);

router.post('/populate/select/empleado/sinUsuario', populateSelectsController.populateEmpleadoSinUsuario);

router.post('/populate/select/usuario', populateSelectsController.populateUsuario);
/*************************Informacion extra******************************/
router.post('/populate/formularios/nombreExpedientes', populateExtraInfoController.getNombreExpedientes);
router.post('/populate/formularios/nombreOpiniones', populateExtraInfoController.getNombreOpiniones);
router.post('/populate/formularios/nombrePatronatos', populateExtraInfoController.getNombrePatronatos);
router.post('/extraInfo/formularios/comunidades', populateExtraInfoController.getComunidades);
router.post('/extraInfo/formularios/existeDictamen', populateExtraInfoController.existeDictamen);
router.post('/extraInfo/usuario/obtenerPrivilegios', populateExtraInfoController.obtenerPrivilegiosDeUsuario);



module.exports = router;