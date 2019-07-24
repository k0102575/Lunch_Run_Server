var express = require('express');
var router = express.Router();
var uuid = require('uuid');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: uuid.v4() });
});

module.exports = router;
