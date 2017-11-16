require('babel-core/register')({
 "presets":["es2015", "react", "stage-1"]
});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var httpProxy = require('http-proxy');
var requestHandler = require('./requestHandler.js');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

const apiProxy = httpProxy.createProxyServer({
  target : 'http://localhost:3001'
});
app.use('/api', function(req, res) {
  apiProxy.web(req, res);
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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