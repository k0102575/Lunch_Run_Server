import express from 'express';

const RestaurantPointRouter = express.Router();

import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantPointService
} from '../service';

// RestaurantPointRouter.use('/', authMiddlewareService.isValidToken)
RestaurantPointRouter.get('/', async (req, res) => {
    
    try {
        const param = {
            category_id : req.query.category_id,
            tag_id : req.query.tag_id
        }
    
        const result = await restaurantPointService.getRestaurantPoint(param)

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, 500, err)
    }

});

export default RestaurantPointRouter;