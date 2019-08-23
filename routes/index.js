const express = require('express');
const router = express.Router();
const kakao = require("../util/kakao.js") ;

router.get('/', function(req, res, next) {
    res.render('index', {kakao: kakao});
});

router.get('/roulette', function(req, res, next) {
    res.render('roulette');
});

router.get('/test', function(req, res, next) {
    res.status(200).json({"token" : "블라"})
});

module.exports = router;
