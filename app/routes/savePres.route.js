"use strict";

var express = require("express");
<<<<<<< HEAD
=======
//var jsonlint = require("jsonlint");
>>>>>>> savePres function almost working
var fs = require("fs");
var router = express.Router();
var CONFIG = JSON.parse(process.env.CONFIG);
var relativePresentationDirectory = __dirname + CONFIG.presentationDirectory;

module.exports = router;

router.route("/")
  .post(function(request, response) {

    var content = "";

    request.on("data", function(chunk) {
      content = content + chunk;
    });
    request.on("end", function() {
      var json = JSON.parse(content);
      if(typeof json.id !== null) {
        var file = json.id + ".pres.json";
        fs.writeFile(relativePresentationDirectory + "/" + file, content, function (err) {
          if (err) throw err;
          response.send("Presentation saved.")
        });
      } else {
        response.send("Your json does not have a correct id.");
      };
    });


  });
