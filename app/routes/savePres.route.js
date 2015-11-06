"use strict";

var express = require("express");
var jsonfile = require("jsonfile");
var router = express.Router();
// var CONFIG = JSON.parse(process.env.CONFIG);
// var relativePresentationDirectory = __dirname + CONFIG.contentDirectory;

module.exports = router;

router.route("/")
  .get(function(request, response) {
    console.info("load save presentation route");
    json.send("load save presentation route")
    // jsonfile.readFile(relativePresentationDirectory + "/", function(err, obj) {
      // console.dir(obj)
    // });
  });
