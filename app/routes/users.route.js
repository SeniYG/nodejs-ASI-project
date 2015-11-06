"use strict";

var express = require("express");
var router = express.Router();

module.exports = router;

var user = require("./../controllers/user.controllers");

router.route("/")
  .get(user.list)
  .post(user.token, user.create);

router.route("/users/:userId")
  .get(user.read)
  .put(user.update)
  .delete(user.delete);

router.param("userId", function(request, response, next, id) {
  request.userId = id;
  next();
});
