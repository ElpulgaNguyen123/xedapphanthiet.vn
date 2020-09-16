var createError = require('http-errors');
var express = require('express');
var path = require('path');
var configSession = require('./src/model/config/configSession');
var connectFlash = require('connect-flash');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var adminRouter = require('./src/routes/admin');
var frontendRouter = require('./src/routes/frontend');
var configviewEngine = require('./src/model/config/viewEngine');
var passport = require('passport');
var path = require('path');
require('dotenv').config();

// db
var pool = require('./src/model/config/connectDb');
var app = express();
var port = 4000;

// view engine setup start
configviewEngine(app);
app.use(express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(__dirname + "/public"));
// view engine setup end

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(connectFlash());
configSession(app);

// khai báo xử dụng passport
app.use(passport.initialize())
app.use(passport.session());

// db
pool.getConnection(function (err, connection) {
  if (err) throw 'error'; // not connected!
  console.log('server is running');
});

app.use('/admin', adminRouter);
app.use('/', frontendRouter);

app.listen(process.env.PORT || port, function () {
  console.log('app running on...' + port);
});

module.exports = app;
