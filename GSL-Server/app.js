var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Agragada por mi
var bodyParser = require('body-parser');
var myConnection = require('./connection');

var tablaRouter = require('./routes/tabla');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//rutas agregadas por mi
var populateRouter = require('./routes/population/populateSelects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Agragada por mi
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', populateRouter);
app.use('/', tablaRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Connection handle
app.use(myConnection.dbConnection);

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
