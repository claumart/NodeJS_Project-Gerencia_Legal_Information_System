var express = require('express');
var router = express.Router();
var administradorController = require('../../controllers/controlesDeAdministrador/administradorController');

router.post('/administrar/buscar/ficha/expediente', administradorController.mostrarExpedientePorNumero);

router.post('/administrar/eliminar/ficha/expediente', administradorController.eliminarExpediente);

router.post('/administrar/buscar/ficha/opinion', administradorController.mostrarOpinionPorOficio);

router.post('/administrar/eliminar/ficha/opinion', administradorController.eliminarOpinion);

router.post('/administrar/buscar/ficha/patronato', administradorController.mostrarPatronatoPorNumero);

router.post('/administrar/eliminar/ficha/patronato', administradorController.eliminarPatronato);

router.post('/administrar/registrar/dependencia', administradorController.registrarDependencia);

router.post('/administrar/eliminar/dependencia', administradorController.eliminarDependencia);

router.post('/administrar/modificar/dependencia', administradorController.actualizarDependencia);

router.post('/administrar/registrar/asunto', administradorController.registrarAsunto);

router.post('/administrar/eliminar/asunto', administradorController.eliminarAsunto);

router.post('/administrar/modificar/asunto', administradorController.actualizarAsunto);

router.post('/administrar/registrar/empleado', administradorController.registrarEmpleado);

router.post('/administrar/eliminar/empleado', administradorController.eliminarEmpleado);

router.post('/administrar/modificar/empleado', administradorController.actualizarEmpleado);

router.post('/administrar/registrar/cargoEmpleado', administradorController.registrarCargoEmpleado);

router.post('/administrar/eliminar/cargoEmpleado', administradorController.eliminarCargoEmpleado);

router.post('/administrar/modificar/cargoEmpleado', administradorController.actualizarCargoEmpleado);

router.post('/administrar/eliminar/comunidad', administradorController.eliminarComunidad);

router.post('/administrar/modificar/comunidad', administradorController.actualizarComunidad);

router.post('/administrar/verificar/empleadoConUsuario', administradorController.empleadoPoseeUsuario);

router.post('/administrar/verificar/existeUserId', administradorController.existeUserId);

router.post('/administrar/registrar/usuario', administradorController.registrarUsuario);

router.post('/administrar/eliminar/usuario', administradorController.eliminarUsuario);

router.post('/administrar/modificar/usuario', administradorController.actualizarUsuario);

module.exports = router;