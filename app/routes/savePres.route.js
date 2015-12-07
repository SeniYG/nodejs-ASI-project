"usestrict";

var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;

router.route("/")
    .get(function(request, response) {
      response.send("Save presentation route");
    });
    // .post()
    // .put()
    // .delete()
    // .all()
