import express from 'express';

const RestaurantFavoriteRouter = express.Router();
const restaurantFavoriteService = require('../service/restaurantFavoriteService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

RestaurantFavoriteRouter.use('/', authMiddleware)
RestaurantFavoriteRouter.use('/:id', authMiddleware)

RestaurantFavoriteRouter.get('/', function(req, res, next) {
    
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

RestaurantFavoriteRouter.post('/:id', function(req, res, next) {

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

RestaurantFavoriteRouter.delete('/:id', function(req, res, next) {

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

export default RestaurantFavoriteRouter;