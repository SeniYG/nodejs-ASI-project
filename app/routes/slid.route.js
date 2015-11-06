"use strict";

var express = require("express");
var router = express.Router();
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");

module.exports = router;

var multerMiddleware = multer({"dest":"/tmp/"});

router
  .post("/", multerMiddleware.single("file", function(request, response) {
    console.log(request.file.path); // the full path to the uploaded file
    console.log(request.file.originalname); // name of the file on the user's computer
    console.log(request.file.mimetype); // mime type of the file
  })
