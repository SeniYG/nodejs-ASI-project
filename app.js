"usestrict";

// Required modules
var express = require("express");
var  http  =  require("http");
var  path  =  require("path");

// Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// Init server
var app = express();
var  server  =  http.createServer(app);

// Routes client angular
app.use("/admin", express. static (path.join(__dirname, "public/admin")));
app.use("/watch", express. static (path.join(__dirname, "public/watch")));

// Routes server
var  loadPresRoute  =  require("./app/routes/loadPres.route.js");
app.use(loadPresRoute);
var  savePresRoute  =  require("./app/routes/savePres.route.js");
app.use(savePresRoute);

server.listen(CONFIG.port, function() {
  console.log("Amazing server is running at port " + CONFIG.port);
});


var Slide = require("./app/models/slide.model");
var jsonSlide = {"type":"toto","id":undefined};
jsonSlide = JSON.stringify(jsonSlide);
var slide = new Slide(jsonSlide);
console.log(slide);
