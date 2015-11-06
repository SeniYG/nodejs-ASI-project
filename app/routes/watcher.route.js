"use strict";

var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;

router.use("/", express.static(path.join(__dirname, "../../public/watcher")));
