"usestrict";

//var  multer  =  require("multer");
var  express  =  require("express");
var  router  =  express.Router();
var  slideController  =  require("./../controllers/slide.controller.js");
module.exports  =  router;

// var  multerMiddleware  =  multer({ "dest" :  "/tmp/" });

// router.post("/slids", multerMiddleware.single("file"),  function (request, 
// response) {
// 		req.
// });

router.route('/slides')
  .get(slideController.getSlides);
  // .post(slide.token,slide.create);
router.route('/slides/:slideId')
  .get(slideController.getSlide);
  // .get(slide.read)
  // .put(slide.update)
  // .delete(slide.delete);
router.param('slideId',  function (req, res, next, id) {
    req.slideId = id;
    next();
});
