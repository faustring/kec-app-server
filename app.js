var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var api_v1 = require('./routes/v1');
var config = require('./config')[process.env.NODE_ENV]

var app = express();

app.set('JWT_SCRECT', config.jwt_secret)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1', api_v1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({'code': 10001, 'message': 'not found'})
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
