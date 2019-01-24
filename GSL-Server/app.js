/***********************Hecho por Shirley Claudette Martínez***********************/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//Agragada por mi
var bodyParser = require('body-parser');
var myConnection = require('./connection');
var fileUpload = require('express-fileupload');
var cookieSession = require('cookie-session');

//rutas agregadas por mi
var viewsRouter = require('./routes/views');
var usuarioRouter = require('./routes/usuario/usuario');
var populateRouter = require('./routes/population/population');
var formulariosExpedientesRouter = require('./routes/formularios/expedientes');
var formulariosOpinionesRouter = require('./routes/formularios/opiniones');
var formulariosPatronatosRouter = require('./routes/formularios/patronatos');
var seguimientoExpedientesRouter = require('./routes/seguimiento/seguimientoExpedientes');
var seguimientoOpinionesRouter = require('./routes/seguimiento/seguimientoOpiniones');
var seguimientoPatronatosRouter = require('./routes/seguimiento/seguimientoPatronatos');
var modificacionExpedientesRouter = require('./routes/modificacion/modificacionExpedientes');
var modificacionOpinionesRouter = require('./routes/modificacion/modificacionOpiniones');
var modificacionPatronatosRouter = require('./routes/modificacion/modificacionPatronatos');
var busquedaRouter = require('./routes/buscar/buscar');
var detalleRouter = require('./routes/detalle/detalle');
var administradorRouter = require('./routes/administrador/administrador');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.use(cors());

app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Agragada por mi
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('C:/dictamenes_test'));

//Configuración para usar cookie-session
app.set('trust proxy', 1);
 
app.use(cookieSession({
  name: 'gslamdc',
  keys: ['p0ll0C0nT4j4d4s', 'b4l34d4']
}));

app.use(function (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
  next()
})

//Connection handle
app.use(myConnection.dbConnection);

app.use('/', viewsRouter);
app.use('/', usuarioRouter);
app.use('/', populateRouter);
app.use('/', formulariosExpedientesRouter);
app.use('/', formulariosOpinionesRouter);
app.use('/', formulariosPatronatosRouter);
app.use('/', seguimientoExpedientesRouter);
app.use('/', seguimientoOpinionesRouter);
app.use('/', seguimientoPatronatosRouter);
app.use('/', modificacionExpedientesRouter);
app.use('/', modificacionOpinionesRouter);
app.use('/', modificacionPatronatosRouter);
app.use('/', busquedaRouter);
app.use('/', detalleRouter);
app.use('/', administradorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
