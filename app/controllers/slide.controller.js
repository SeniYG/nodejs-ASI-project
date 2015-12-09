// Load required packages
var SlideModel = require('../models/slide.model.js');

// Create endpoint /api/slides for POST
exports.postSlides = function(req, res) {
  //console.log("getSlide(" + req.slideId + ")");
  console.log(req);
  // SlideModel.create(req.slideId, function(err) {
  //   if(err) {
  //     console.log(err);
  //     res.status(404).json(err);
  //   } else {
  //     res.json(slide);
  //   }
  // });
};

// Create endpoint /api/slides for GET
exports.getSlides = function(req, res) {
  console.log("getSlides()");
  res.json({"error":"not implemented yet."})
};

exports.getSlide = function(req, res) {
  console.log("getSlide(" + req.slideId + ")");
  SlideModel.read(req.slideId, function(err, slide) {
    if(err) {
      console.log(err);
      res.status(404).json(err);
    } else {
      res.json(slide);
    }
  });
}
