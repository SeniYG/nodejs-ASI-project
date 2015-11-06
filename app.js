"use strict";

var express = require("express");
var http = require("http");
var path = require("path");

// Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// Init server
var app = express();
var server = http.createServer(app);

var defaultRoute = require("./app/routes/default.route.js");
var loadPresRoute = require("./app/routes/loadPres.route.js");
var savePresRoute = require("./app/routes/savePres.route.js");
var adminRoute = require("./app/routes/admin.route.js");
var watcherRoute = require("./app/routes/watcher.route.js");

app.use("/", defaultRoute);
app.use("/load-pres", loadPresRoute);
app.use("/save-pres", savePresRoute);
app.use("/watcher", watcherRoute);
app.use("/admin", adminRoute);

//test seni slide.read function

var slideModel = require("./app/models/slid.model.js");
var slide = slideModel.read("37ba76b1-5c5d-47ef-8350-f4ea9407276d");
//console.log(slide);
server.listen(CONFIG.port, function() {
  console.log("Amazing server is running at port " + CONFIG.port);
});
