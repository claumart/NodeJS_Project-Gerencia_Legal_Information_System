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

//rutas agregadas por mi
var populateRouter = require('./routes/population/population');
var formulariosExpedientesRouter = require('./routes/formularios/expedientes');
var formulariosOpinionesRouter = require('./routes/formularios/opiniones');
var formulariosPatronatosRouter = require('./routes/formularios/patronatos');
var seguimientoExpedientesRouter = require('./routes/seguimiento/seguimientoExpedientes');
var seguimientoOpinionesRouter = require('./routes/seguimiento/seguimientoOpiniones');
var busquedaRouter = require('./routes/buscar/buscar');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Agragada por mi
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dictamenes')));

//Connection handle
app.use(myConnection.dbConnection);

app.use('/', populateRouter);
app.use('/', formulariosExpedientesRouter);
app.use('/', formulariosOpinionesRouter);
app.use('/', formulariosPatronatosRouter);
app.use('/', seguimientoExpedientesRouter);
app.use('/', seguimientoOpinionesRouter);
app.use('/', busquedaRouter);

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
