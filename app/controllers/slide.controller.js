// Load required packages
var SlideModel = require('../models/slide.model.js');

// Create endpoint /api/slides for POST
exports.postSlides = function(req, res) {
  // var user = new User({
  //   username: req.body.username,
  //   password: req.body.password
  // });
  //
  // user.save(function(err) {
  //   if (err) {
  //     console.error(err.stack);
  //     res.send(err.message);
  //   } else {
  //     res.json({ message: 'New beer drinker added to the locker room!' });
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
