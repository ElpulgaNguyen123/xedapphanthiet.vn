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

// db
var pool = require('./src/model/config/connectDb');

var app = express();
var port = 4000;

// view engine setup start
configviewEngine(app);
// view engine setup end

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(connectFlash());
configSession(app);

// db
pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!
  console.log('server is running');
});

app.use('/admin', adminRouter);
app.use('/', frontendRouter);

app.use((req, res, next) => {
  res.render('/admin/notfound/notfound', {
    title: 'Trang Không tìm thấy'
  })
})

app.listen(process.env.port || port, function () {
  console.log('app running on...' + port);
});

module.exports = app;
