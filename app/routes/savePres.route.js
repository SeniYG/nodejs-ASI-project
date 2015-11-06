"use strict";

var express = require("express");
var jsonlint = require("jsonlint");
var router = express.Router();
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.contentDirectory;

module.exports = router;

router.route("/")
  .post(function(request, response) {
    var content = "";

    request.on('data', function(chunk) {
      content = content + chunk;
    });
    request.on('end', function() {
      if(jsonlint.parse(content)) {
        if(typeof content.id !== "undefined") {
          //
        } else {
          response.send("Your json does not have a correct id.");
        }
      } else {
        response.send("Your file is not a well formatted json.");
      }
    });
  });
