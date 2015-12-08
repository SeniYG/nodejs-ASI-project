"usestrict";

var  express  =  require("express");
var  router  =  express.Router();
var  slide  =  require("./../controllers/slide.controller.js");
module.exports  =  router;

router.route('/slides')
  .get(function(req, res) {
    console.log("slide.list");
    res.send("slide.list");
  });
  // .get(slide.list)
  // .post(slide.token,slide.create);
router.route('/slides/:slideId')
  .get(function(req, res) {
    console.log("slide.read");
    res.send("slide.read");
  });
  // .get(slide.read)
  // .put(slide.update)
  // .delete(slide.delete);
router.param('slideId',  function (req, res, next, id) {
    req.slideId = id;
    next();
});
