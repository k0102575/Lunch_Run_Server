const express = require('express');
const router = express.Router();
const kakao = require("../util/kakao.js");
const rouletteService = require("../service/rouletteService.js");

router.get('/', function(req, res, next) {
    res.render('index', {kakao: kakao});
});

router.get('/roulette', function(req, res, next) {
    res.render('roulette');
});

router.get('/roulette/data', (req, res, next) => {

    rouletteService.getData((err, result) =>{
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }    
    })

});

router.get('/test', function(req, res, next) {
    res.status(200).json({"token" : "블라"})
});

module.exports = router;
