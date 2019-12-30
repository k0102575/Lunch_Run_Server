import express from 'express';

const RestaurantCategoryRouter = express.Router();
const restaurantCategoryService = require('../service/restaurantCategoryService.js');

RestaurantCategoryRouter.get('/', function(req, res, next) {

    restaurantCategoryService.getCategory(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

export default RestaurantCategoryRouter;