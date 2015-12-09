"usestrict";

var  express  =  require("express");
var  router  =  express.Router();
var  slideController  =  require("./../controllers/slide.controller.js");
module.exports  =  router;

router.route('/slides')
  .get(slideController.getSlides)
  .post(slideController.postSlides);
router.route('/slides/:slideId')
  .get(slideController.getSlide);
  // .get(slide.read)
  // .put(slide.update)
  // .delete(slide.delete);
router.param('slideId',  function (req, res, next, id) {
    req.slideId = id;
    next();
});
