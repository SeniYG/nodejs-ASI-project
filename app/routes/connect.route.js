"usestrict";

var bodyParser = require('body-parser');
var request = require("request");
var  express = require("express");
var  router = express.Router();
module.exports = router;

router.use( bodyParser.json() );
router.use(bodyParser.urlencoded({
  extended: true
}));

router.route('/')
.post(function(req, res) {
  res.json({"login":"tp","role":"admin"});
  // request.post({
  //     headers: {'content-type' : 'application/json'},
  //     url:'http://localhost:8080/front-auth-watcher-web-service/watcher-auth-servlet',
  //     json:  {
  //         "login":req.body.login,
  //         "pwd":req.body.pwd
  //       }
  //   }, function optionalCallback(err, httpResponse, body) {
  //     if (err || httpResponse.statusCode != 200) {
  //       return console.error('upload failed:', err);
  //     }
  //     console.log('Upload successful!  Server responded with:', body);
  //     res.json(body);
  // });
});
