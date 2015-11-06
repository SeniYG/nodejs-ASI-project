"use strict";

var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var router = express.Router();
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;

module.exports = router;

router.route("/")
  .post(function(request, response) {
 	var file = '[pres.id].pres.json';
	var obj = "{\"name\: \"JP\"}";
 	
	 fs.writeFile(relativePresentationDirectory + "/" + file, obj, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
	//	fs.writeFileSync(CONFIG.presentationDirectory+"/"+file, obj);
	    // jsonfile.readFile(relativePresentationDirectory + "/", function(err, obj) {
	      // console.dir(obj)
	    // });
  });
