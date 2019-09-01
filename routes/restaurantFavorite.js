const express = require('express');
const router = express.Router();
const restaurantFavoriteService = require('../service/restaurantFavoriteService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

router.use('/restaurant_favorite', authMiddleware)
router.get('/restaurant_favorite', function(req, res, next) {
    
    const param = {
        page : req.query.page,
        user_id : req.user.id
    }

    restaurantFavoriteService.getRestaurantFavoriteList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

router.use('/restaurant_favorite/:id', authMiddleware)
router.post('/restaurant_favorite/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
        user_id : req.user.id
    }

    restaurantFavoriteService.insertRestaurantFavorite(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});

router.use('/restaurant_favorite/:id', authMiddleware)
router.delete('/restaurant_favorite/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
        user_id : req.user.id
    }

    restaurantFavoriteService.deleteRestaurantFavorite(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});

module.exports = router;