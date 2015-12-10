// Load required packages
var SlideModel = require('../models/slide.model.js');
var fs = require("fs");
var path = require("path");
var Promise = require("promise");
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
  console.log("getSlide(" + req.slideId + ")");
  if(req.params.json) {
    SlideModel.read(req.slideId, function(err, slide) {
      if(err) {
        console.log(err);
        res.status(404).json(err);
      } else {
        res.json(slide);
      }
    });
  } else {
    //TODO by seni
    res.json({"warning":"not implmented yet."})
  }
};
