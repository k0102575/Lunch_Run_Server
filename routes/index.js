const express = require('express');
const router = express.Router();
const kakao = require("../util/kakao.js") ;

router.get('/', function(req, res, next) {
    res.render('index', {kakao: kakao});
});

module.exports = router;
