var express = require('express');
var router = express.Router();
var uuid = require('uuid');
const datasource = require('../util/datasource')
const connection = datasource.getConnection()

router.get('/', function(req, res, next) {
    res.render('index', { title: uuid.v4() });
});

module.exports = router;
