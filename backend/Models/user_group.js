// NPM modules
var mysql = require('mysql');
// Custom modules
const DATABASECONNECTION = require("./db_config");

// Creating db connection
var db = mysql.createConnection(DATABASECONNECTION);