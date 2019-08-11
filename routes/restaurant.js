const express = require('express');
const router = express.Router();
const restaurantService = require('../service/restaurantService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

router.use('/restaurant', authMiddleware)
router.get('/restaurant', function(req, res, next) {

});

router.use('/restaurant', authMiddleware)
router.post('/restaurant', function(req, res, next) {
    const param = {
        name : req.body.name,
        floor : req.body.floor,
        introduction : req.body.introduction,
        lat : req.body.lat,
        lng : req.body.lng,
        address : req.body.address,
        address_road : req.body.address_road,
        category_id : req.body.category_id
    }

    restaurantService.insertRestaurant(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});

router.use('/restaurant', authMiddleware)
router.put('/restaurant', function(req, res, next) {
    const param = {
        id: req.body.id,
        name : req.body.name,
        floor : req.body.floor,
        introduction : req.body.introduction,
        lat : req.body.lat,
        lng : req.body.lng,
        address : req.body.address,
        address_road : req.body.address_road,
        category_id : req.body.category_id
    }

    restaurantService.updateRestaurant(param, function (status, err, result) {
        // console.log(status)
        // console.log(err)
        // console.log(result)
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});



module.exports = router;