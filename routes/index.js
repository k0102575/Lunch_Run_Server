var express = require('express');
var router = express.Router();
var uuid = require('uuid');
const datasource = require('../util/datasource')
const connection = datasource.getConnection()

router.get('/', function(req, res, next) {
    res.render('index', { title: uuid.v4() });
});

router.get('/test', function(req, res, next) {

    let data = {
        token : "QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*1234567890"
    }

    res.status(200).json(data);
});

router.get('/test2', function(req, res, next) {

    let data = {
        token : ""
    }

    res.status(401).json(data);
});

router.get('/test3', function(req, res, next) {

    try {
        let data = ['1', '2', '3', '4', '5', '6']

        res.status(200).json(data);
    } catch(e) {
        res.json(e);
    }

});

router.get('/test4', function(req, res, next) {

    try {

        let body = req.body 

        console.log(body)
        console.log(body.restaurantId)

        if(body.restaurantId == undefined) {
            return res.status(500).json({
                exception: "empty value"
            });
        } else {

            let data = {
                review : [
                        {
                            id: '1',
                            createDatetime: '2019-07-21 18:00:00',
                            rating: '1.2',
                            comment: '' 
                        },
                        {
                            id: '2',
                            createDatetime: '2019-07-22 18:00:00',
                            rating: '2.3',
                            comment: '노맛' 
                        },
                        {
                            id: '3',
                            createDatetime: '2019-07-23 18:00:00',
                            rating: '4.4',
                            comment: '존맛탱' 
                        },
                        {
                            id: '4',
                            createDatetime: '2019-07-24 18:00:00',
                            rating: '3.2',
                            comment: '하하하' 
                        },
                    ]
            }
            
            res.status(200).json(data)
        }

    } catch(e) {
        res.json(e);
    }

});
    
router.post('/post', function(req, res, next) {

    try {
        let requestBody = req.body
        console.log(requestBody)
        res.status(200).json({status: "OK"})
    } catch(e) {
        res.json(e);
    }

});

module.exports = router;
