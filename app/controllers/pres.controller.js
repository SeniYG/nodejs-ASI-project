"use strict";

var fs = require('fs');
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;

// Create endpoint /api/pres for GET
exports.getPresentations = function(req, res) {
  var jsonToReturn = [];
  fs.readdir(relativePresentationDirectory, function(err, files) {
    if (err) throw err;
    var c = 0;
    files.forEach(function(file, i) {
      c++;
      fs.readFile(relativePresentationDirectory + "/" + file,'utf-8', function(err, json) {
        if (err) throw err;
        jsonToReturn.push(JSON.parse(json));
        if (0 === --c) {
          res.json(jsonToReturn);
        }
      });
    });
  });
};

// Create endpoint /api/presId for GET
exports.getPresentationId = function(req, res) {
      var jsonToReturn = {};

      //get request param: presentation id
      var pres_id = req.presId;
      console.log("getPres(" + req.presId + ")");
      //get presentation from its file and send it to the client
      fs.readFile(relativePresentationDirectory + "/" + pres_id + ".pres.json", function(err, data) {
        if (err){
          res.status(400);
      		res.json(err);
          console.log('error sent');
        } else{
          res.json(JSON.parse(data));
        }
      });
};

// Create endpoint /api/save-pres for GET
exports.savePresentation = function(req, res) {
  var content = "";

  req.on("data", function(chunk) {
    content = content + chunk;
  });
  req.on("end", function() {
    var json = JSON.parse(content);
    if(typeof json.id !== null) {
      var file = json.id + ".pres.json";
      fs.writeFile(relativePresentationDirectory + "/" + file, content, function (err) {
        if (err) throw err;
        res.json("Presentation saved.")
      });
    } else {
      res.json("Your json does not have a correct id.");
    };
  });
};
