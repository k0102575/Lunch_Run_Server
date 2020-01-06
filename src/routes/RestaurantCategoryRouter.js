import express from 'express';
import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantCategoryService
} from '../service';

const RestaurantCategoryRouter = express.Router();

RestaurantCategoryRouter.get('/', async (req, res) => {
    try {
        
        const result = await restaurantCategoryService.getCategory();
        serverService.response(res, 200, result);

    } catch(err) {
        errorService.resError(res, err)
    }
});

export default RestaurantCategoryRouter;