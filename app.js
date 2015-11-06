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
var usersRoute = require("./app/routes/users.route.js");
var loadPresRoute = require("./app/routes/loadPres.route.js");
var savePresRoute = require("./app/routes/savePres.route.js");
var adminRoute = require("./app/routes/admin.route.js");
var watcherRoute = require("./app/routes/watcher.route.js");

app.use("/", defaultRoute);
app.use("/users", usersRoute);
app.use("/load-pres", loadPresRoute);
app.use("/save-pres", savePresRoute);
app.use("/watcher", watcherRoute);
app.use("/admin", adminRoute);

server.listen(CONFIG.port, function() {
  console.log("Amazing server is running at port " + CONFIG.port);
});
