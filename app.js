"usestrict";

// Required modules
var express = require("express");
var  http  =  require("http");
var  path  =  require("path");
var io = require('socket.io');

// Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// Init server
var app = express();
var  server  =  http.createServer(app);

// Routes client angular
// login module
app.use("/", express.static(__dirname + "/public-test/login"));
// admin module
app.use("/admin", express.static(__dirname + "/public-test/admin"));
// watcher module
app.use("/watch", express.static(__dirname + "/public-test/watcher"));
// bower_components
app.use("/bower_components",  express.static(__dirname + "/public-test/bower_components"));
app.use("/images",  express.static(__dirname + "/public-test/images"));

// Routes server
var  slideRouter  =  require("./app/routes/slide.route.js");
app.use('/api', slideRouter);

var presRouter = require("./app/routes/pres.route.js");
app.use('/api', presRouter);

var connectRouter = require("./app/routes/connect.route.js");
app.use('/connect', connectRouter);

server.listen(CONFIG.port, function() {
  console.log("Amazing server is running at port " + CONFIG.port);
});

io = io.listen(server);
