var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/',function(req,res){
	//También se puede usar res.sendFile(path.join(__dirname +'/../views/index.html'));
	req.session = null;
	res.render(path.join(__dirname +'/../views/login.html'));
});

router.get('/inicio',function(req,res){
	if(req.session.userId){
		res.render(path.join(__dirname +'/../views/inicio.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/buscar',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('vslz') != -1){
		res.render(path.join(__dirname +'/../views/buscar.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/modificacion',function(req,res){
	if(req.session.userId && (req.session.userPrivileges.indexOf('rcb')!=-1||req.session.userPrivileges.indexOf('asng')!=-1
	||req.session.userPrivileges.indexOf('dscg')!=-1||req.session.userPrivileges.indexOf('rvsexp')!=-1
	||req.session.userPrivileges.indexOf('rvsopn')!=-1||req.session.userPrivileges.indexOf('rvsptt')!=-1
	||req.session.userPrivileges.indexOf('rmt')!=-1||req.session.userPrivileges.indexOf('rngpre')!=-1)){
		res.render(path.join(__dirname +'/../views/modificacion/modificacion.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/modulo_administrador',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('admin') != -1){
		res.render(path.join(__dirname +'/../views/administrador/modulo_administrador.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/usuario/cambiar_password',function(req,res){
	if(req.session.userId){
		res.render(path.join(__dirname +'/../views/usuario/cambio_password.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*********************************Formularios de Entrada*********************************/
router.get('/expedientes/nueva_ficha_expedientes',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rcb') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/nueva_ficha_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/opiniones/nueva_ficha_opiniones',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rcb') != -1){
		res.render(path.join(__dirname +'/../views/formularios/opiniones/nueva_ficha_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/patronatos/nueva_ficha_patronatos',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rcb') != -1){
		res.render(path.join(__dirname +'/../views/formularios/patronatos/nueva_ficha_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*********************************Seguimiento*********************************/
router.get('/seguimiento_expedientes',function(req,res){
	if(req.session.userId && (req.session.userPrivileges.indexOf('asng')!=-1||req.session.userPrivileges.indexOf('dscg')!=-1
	||req.session.userPrivileges.indexOf('rvsexp')!=-1||req.session.userPrivileges.indexOf('rmt')!=-1||req.session.userPrivileges.indexOf('rngpre')!=-1)){
		res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/seguimiento_opiniones',function(req,res){
	if(req.session.userId && (req.session.userPrivileges.indexOf('asng')!=-1||req.session.userPrivileges.indexOf('dscg')!=-1
	||req.session.userPrivileges.indexOf('rvsopn')!=-1||req.session.userPrivileges.indexOf('rmt')!=-1)){
		res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/seguimiento_patronatos',function(req,res){
	if(req.session.userId && (req.session.userPrivileges.indexOf('asng')!=-1||req.session.userPrivileges.indexOf('dscg')!=-1
	||req.session.userPrivileges.indexOf('rvsptt')!=-1||req.session.userPrivileges.indexOf('rmt')!=-1)){
		res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*********************************Formularios de Expedientes*********************************/
router.get('/expedientes/asignar_expediente',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('asng') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_asignacion_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/expedientes/descargar_expediente',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('dscg') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_descargo_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/expedientes/revisar_expediente',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rvsexp') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_revision_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/expedientes/remitir_expediente',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rmt') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_remision_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/expedientes/remitir_con_previo',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rmt') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_remision_con_previo_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/expedientes/reingresar_con_previo',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rngpre') != -1){
		res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_reingreso_con_previo_expedientes.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*********************************Formularios de Opiniones*********************************/
router.get('/opiniones/asignar_opinion',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('asng') != -1){
		res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_asignacion_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/opiniones/descargar_opinion',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('dscg') != -1){
		res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_descargo_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/opiniones/revisar_opinion',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rvsopn') != -1){
		res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_revision_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/opiniones/remitir_opinion',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rmt') != -1){
		res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_remision_opiniones.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*********************************Formularios de Patronatos*********************************/
router.get('/patronatos/asignar_patronato',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('asng') != -1){
		res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_asignacion_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/patronatos/descargar_patronato',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('dscg') != -1){
		res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_descargo_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/patronatos/revisar_patronato',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rvsptt') != -1){
		res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_revision_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/patronatos/remitir_patronato',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('rmt') != -1){
		res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_remision_patronatos.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


/*****************************************Detalles*****************************************/
router.get('/detalles/expediente',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('vslz') != -1){
		res.render(path.join(__dirname +'/../views/detalles/detalle_expediente.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/detalles/opinion',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('vslz') != -1){
		res.render(path.join(__dirname +'/../views/detalles/detalle_opinion.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});

router.get('/detalles/patronato',function(req,res){
	if(req.session.userId && req.session.userPrivileges.indexOf('vslz') != -1){
		res.render(path.join(__dirname +'/../views/detalles/detalle_patronato.html'), {nombreEmpleado: req.session.nombreEmpleado});
	}else{
		res.redirect("/");
	}
});


module.exports = router;