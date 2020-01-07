import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantFavoriteService
} from '../service';

import {
    ServerError
} from '../models/ServerError'

const RestaurantFavoriteRouter = express.Router();

RestaurantFavoriteRouter.use('/', authMiddlewareService.isValidToken)
RestaurantFavoriteRouter.use('/:id', authMiddlewareService.isValidToken)

RestaurantFavoriteRouter.get('/', async (req, res ) => {
    
    try {

        const param = {
            page : req.query.page,
            user_id : req.user.id
        }
    
        const result = await restaurantFavoriteService.getRestaurantFavoriteList(param)

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantFavoriteRouter.post('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, new ServerError('{ "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" }', 422))
        }

        const param = {
            id: req.params.id,
            user_id : req.user.id
        }

        const result = await restaurantFavoriteService.insertRestaurantFavorite(param);
        serverService.response(res, 200, {"favoriteId": result})
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantFavoriteRouter.delete('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, new ServerError('{ "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" }', 422))
        }

        const param = {
            id: req.params.id,
            user_id : req.user.id
        }

        await restaurantFavoriteService.deleteRestaurantFavorite(param);
        serverService.response(res, 200, {"result": true})
    } catch(err) {
        errorService.resError(res, err);
    }
    
});

export default RestaurantFavoriteRouter;