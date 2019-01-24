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
		res.render(path.join(__dirname +'/../views/inicio.html'));
	}else{
		res.redirect("/");
	}
});

router.get('/buscar',function(req,res){
	res.render(path.join(__dirname +'/../views/buscar.html'));
});

router.get('/modificacion',function(req,res){
	res.render(path.join(__dirname +'/../views/modificacion/modificacion.html'));
});

router.get('/modulo_administrador',function(req,res){
	res.render(path.join(__dirname +'/../views/administrador/modulo_administrador.html'));
});


/*********************************Formularios de Entrada*********************************/
router.get('/expedientes/nueva_ficha_expedientes',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/nueva_ficha_expedientes.html'));
});

router.get('/opiniones/nueva_ficha_opiniones',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/opiniones/nueva_ficha_opiniones.html'));
});

router.get('/patronatos/nueva_ficha_patronatos',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/patronatos/nueva_ficha_patronatos.html'));
});


/*********************************Seguimiento*********************************/
router.get('/seguimiento_expedientes',function(req,res){
	res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_expedientes.html'));
});

router.get('/seguimiento_opiniones',function(req,res){
	res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_opiniones.html'));
});

router.get('/seguimiento_patronatos',function(req,res){
	res.render(path.join(__dirname +'/../views/seguimiento/seguimiento_patronatos.html'));
});


/*********************************Formularios de Expedientes*********************************/
router.get('/expedientes/asignar_expediente',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_asignacion_expedientes.html'));
});

router.get('/expedientes/descargar_expediente',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_descargo_expedientes.html'));
});

router.get('/expedientes/revisar_expediente',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_revision_expedientes.html'));
});

router.get('/expedientes/remitir_expediente',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_remision_expedientes.html'));
});

router.get('/expedientes/remitir_con_previo',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_remision_con_previo_expedientes.html'));
});

router.get('/expedientes/reingresar_con_previo',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/expedientes/ficha_de_reingreso_con_previo_expedientes.html'));
});


/*********************************Formularios de Opiniones*********************************/
router.get('/opiniones/asignar_opinion',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_asignacion_opiniones.html'));
});

router.get('/opiniones/descargar_opinion',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_descargo_opiniones.html'));
});

router.get('/opiniones/revisar_opinion',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_revision_opiniones.html'));
});

router.get('/opiniones/remitir_opinion',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/opiniones/ficha_de_remision_opiniones.html'));
});


/*********************************Formularios de Patronatos*********************************/
router.get('/patronatos/asignar_patronato',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_asignacion_patronatos.html'));
});

router.get('/patronatos/descargar_patronato',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_descargo_patronatos.html'));
});

router.get('/patronatos/revisar_patronato',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_revision_patronatos.html'));
});

router.get('/patronatos/remitir_patronato',function(req,res){
	res.render(path.join(__dirname +'/../views/formularios/patronatos/ficha_de_remision_patronatos.html'));
});


/*****************************************Detalles*****************************************/
router.get('/detalles/expediente',function(req,res){
	res.render(path.join(__dirname +'/../views/detalles/detalle_expediente.html'));
});

router.get('/detalles/opinion',function(req,res){
	res.render(path.join(__dirname +'/../views/detalles/detalle_opinion.html'));
});

router.get('/detalles/patronato',function(req,res){
	res.render(path.join(__dirname +'/../views/detalles/detalle_patronato.html'));
});


module.exports = router;