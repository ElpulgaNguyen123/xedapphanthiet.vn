var express = require('express');
var esjExtend = require('express-ejs-extend');

var configViewEngine = (app) => {
    app.use(express.static('src'));
    app.engine('ejs', esjExtend);
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}
module.exports = configViewEngine;