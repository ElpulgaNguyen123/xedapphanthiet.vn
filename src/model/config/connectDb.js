var mysql      = require('mysql');

// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USERNAME,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_NAME
// });

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'Leo769183',
  database : 'xedapphanthiet'
});

module.exports = pool;