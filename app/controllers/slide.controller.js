// Load required packages
var SlideModel = require('../models/slide.model.js');
var fs = require("fs");
var path = require("path");
var utils = require("./../utils/utils");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;
var relativeContentDirectory = __dirname + CONFIG.contentDirectory;

// Create endpoint /api/slides for POST
exports.postSlides = function(req, res) {
  
};

// Create endpoint /api/slides for GET
exports.getSlides = function(req, res) {
  console.log("getSlides()");
  var jsonToReturn = {};
  fs.readdir(relativeContentDirectory, function(err, files) {
    if (err) res.json(err);
    var c = 0;
    files.forEach(function(file, i) {
      c++;
      fs.readFile(relativeContentDirectory + "/" + file,'utf-8', function(err, json) {
        if (err) {
          res.json(err);
        } else {
          if (path.extname(file) == ".json"){
            var jsonfile = JSON.parse(json);
            jsonToReturn[jsonfile.id + "_slide"] = JSON.parse(json);
          }
          if (0 === --c) {
            res.json(jsonToReturn);
          }
        }
      });
    });
  });
};

exports.getSlide = function(req, res) {
  var jsonToReturn = {};
  var metafilePath = utils.getMetaFilePath(req.slideId);
  var slide;
  SlideModel.read(req.slideId, function (err, json){
    if (err) console.log(err);
    console.log("*************************");
    console.log(typeof json);
    console.log(json.fileName);
    console.log("*************************");
    
   // var datafilePath = utils.getDataFilePath(json.fileName);
   var datafilePath = path.join(relativeContentDirectory, json.fileName);
   console.log(datafilePath);
   console.log(relativeContentDirectory + "/" + json.fileName);
   console.log(req.query.json);
    fs.readFile(datafilePath,'utf-8', function (error, data){ 
      if (error) {throw err;}
      else if(req.query.json) {
          json.data = data;
          //var slide = SlideModel(json);
          console.log("json = true");
          res.json(json);
          }
        else {
          res.json(data);
        }
      });
    });
};
