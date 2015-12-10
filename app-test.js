"use strict";

var express = require("express");
var fs = require('fs');
var http = require("http");
var path = require("path");
var io = require('socket.io');

//var utils = require("./app/utils/utils.js");

//fake user map creation ****************************************
//key is the login, value is a table with respectivelly pwd and role
var userMap={};
userMap['loulou']=['loulou', 'admin'];
userMap['guig']=['guig', 'watcher'];
userMap['seni']=['seni', 'watcher'];
//***************************************************************

//image map creation ****************************************
//this map will contain all the images in the target file
//the map will be later sent to client
var imageMap={};
fs.readdir('./public-test/images', function(err, files){
	if (!err){
		for(var i = 0; i<files.length; i++){
			var img = {};
			img.id = i;
			img.type = path.extname(files[i]);
			img.title = path.basename(files[i], img.type);
			img.src = '../images/' + files[i];
			imageMap[i] = img;
		}
	}
	else
		throw err;
});
//***************************************************************

// Init configuration
var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

// Init server
var app = express();
var server = http.createServer(app);

// Routes client angular
// login module
app.use("/", express.static(__dirname + "/public-test/login"));
// admin module
app.use("/admin", express.static(__dirname + "/public-test/admin"));
// watcher module
app.use("/watch", express.static(__dirname + "/public-test/watcher-test"));
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

//send image map to the client
app.get("/resources_list", function(request, response) {
	var jsonToSend = JSON.stringify(imageMap);
	response.send(jsonToSend);
});

server.listen(CONFIG.port, function() {
	console.log("Amazing server is running at port " + CONFIG.port);
});

/**************** SOCKET ********************/

io = io.listen(server);

io.sockets.on('connection', function(socket){
    socket.emit('connection', {'connection': 'hello client'});
		socket.on('slidEvent', function(data){
		    //notify all clients
				if(data.CMD != 'START')
					io.sockets.emit('slidEvent', {'CMD': data.CMD});
				else
					io.sockets.emit('slidEvent', {'CMD': data.CMD, 'PRES_ID': data.PRES_ID});
		});
});
