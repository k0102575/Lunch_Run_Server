import express from 'express';

const RestaurantPointRouter = express.Router();
const restaurantService = require('../service/restaurantService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

RestaurantPointRouter.use('/', authMiddleware)
RestaurantPointRouter.get('/', function(req, res, next) {
    
    const param = {
        category_id : req.query.category_id,
        tag_id : req.query.tag_id
    }

    restaurantService.getRestaurantPoint(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

export default RestaurantPointRouter;