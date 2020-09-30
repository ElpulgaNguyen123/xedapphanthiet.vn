var session = require("express-session");
var MySqlStore = require('express-mysql-session');
var options = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'xedapphanthiet'
}
var sessionStore = new MySqlStore(options);
let configSession = (app) => {
    app.use(session({
        secret: 'session_cookie_secret',
        resave: true,
        store:sessionStore,
        saveUninitialized: false,
        cookie : {maxAge : 1000*60*60*24} // 1 ngày
    }))
}

module.exports = configSession;