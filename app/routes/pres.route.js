"usestrict";

var  express  =  require("express");
var  router  =  express.Router();
var  presController  =  require("./../controllers/pres.controller.js");
module.exports  =  router;

router.route('/pres')
  .get(presController.getPresentations);
router.route('/pres/:presId')
  .get(presController.getPresentationId);
router.route('/pres')
  .post(presController.savePresentation);
router.param('presId',  function (req, res, next, id) {
    req.presId = id;
    next();
});
