"usestrict";

var  multer  =  require("multer");
var  express  =  require("express");
var  router  =  express.Router();
var utils = require("./../utils/utils");
var fs = require("fs");
var path = require("path");
var SlideModel = require('../models/slide.model.js');
var  slideController  =  require("./../controllers/slide.controller.js");
var CONFIG = JSON.parse(process.env.CONFIG);
var relativeContentDirectory = __dirname + CONFIG.contentDirectory;

module.exports  =  router;

 var  multerMiddleware  =  multer({ "dest" :  "/tmp/" });

router.post("/slides", multerMiddleware.single("file"),  function (request,
response) {
    var fileName = request.file.filename;
		fs.readFile(request.file.path, 'binary', function (err, data){
			if (err) throw err;
      var slide = new SlideModel();
      slide.id = fileName;
      slide.type = request.file.mimetype;
      slide.title = request.file.originalname;
      slide.fileName = fileName + path.extname(request.file.originalname);
      slide.setData(data);
      SlideModel.create(slide);
		});
});

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
