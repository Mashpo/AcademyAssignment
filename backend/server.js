// NPM modules
var bodyParser = require("body-parser");
var express = require("express");
var mysql = require('mysql');
var passport = require("passport");
var session = require("express-session");
var router = require("./Routes/routes");

//Custom Modules
const DATABASECONNECTION = require("./Models/db_config");
var passport_config = require("./Controllers/security/passport_config")

//Activating Express
var server = express();

//Initializing DB connection
var db = mysql.createConnection(DATABASECONNECTION);

//Establishing DB connection
db.connect((err)=>{
    if (err){
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database successfully connected with id ' + db.threadId);
});

const cors = require("cors");
server.use(cors())

//Parses JSON File using Express
server.use(bodyParser.json()) //PARSES JSON files
// server.use(bodyParser.urlencoded({extended: false}))  //not using 

// PASSPORT SETUP
// Initialise passport config and session
passport_config();
server.use(session({
    secret:"SecretiveKey@123",
    resave:false,
    saveUninitialized:false
}));
// Initialise passport and session
server.use(passport.initialize());
server.use(passport.session());

//Initialize routes using Express
server.use(router)

// Initialise port
server.set("port", process.env.PORT || 8080);
server.listen(server.get("port"), () => {
    console.log("Server started on port " + server.get("port"));
});