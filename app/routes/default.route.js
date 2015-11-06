"use strict";

var express = require("express");
var router = express.Router();
module.exports = router;

router.route("/")
  .get(function(request, response) {
    console.info("default route");
    response.send("default route");
  });
