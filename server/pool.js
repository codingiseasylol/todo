let mysql = require("mysql");
let util = require("util");

let config = require("./config.js");

let pool = mysql.createPool(config.db);

// Once a module is loaded, it's cached, meaning subsequent require calls return the same instance i.e. pool is created only once.

// Connections are automatically released
// pool.query() is a shortcut for pool.getConnection() + connection.query() + connection.release().

// util.promisify() makes async/await possible
pool.query = util.promisify(pool.query);

module.exports = pool;
