"use strict";

var fs = require('fs');
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;

// Create endpoint /api/pres for GET
exports.getPresentations = function(req, res) {
  var jsonToReturn = {};
  fs.readdir(relativePresentationDirectory, function(err, files) {
    if (err) throw err;
    var c = 0;
    files.forEach(function(file, i) {
      c++;
      fs.readFile(relativePresentationDirectory + "/" + file,'utf-8', function(err, json) {
        if (err) throw err;
        jsonToReturn["pres" + i + ".id"] = JSON.parse(json);
        if (0 === --c) {
          res.send(jsonToReturn);
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

      //get presentation from its file and send it to the client
      fs.readFile(relativePresentationDirectory + "/" + pres_id + ".pres.json", function(err, data) {
        if (err){
          res.status(400);
      		res.send('server has not found such presentation');
          console.log('error sent');
        } else{
          res.send(data);
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
        res.send("Presentation saved.")
      });
    } else {
      res.send("Your json does not have a correct id.");
    };
  });
};


// Create endpoint /api/pres for POST
// exports.postPresentation = function(request, response) {
//   var content = "";
//
//   request.on("data", function(chunk) {
//     content = content + chunk;
//   });
//   request.on("end", function() {
//     var json = JSON.parse(content);
//     if(typeof json.id !== null) {
//       var file = json.id + ".pres.json";
//       fs.writeFile(relativePresentationDirectory + "/" + file, content, function (err) {
//         if (err) throw err;
//         response.send("Presentation saved.")
//       });
//     } else {
//       response.send("Your json does not have a correct id.");
//     };
//   });
// };
