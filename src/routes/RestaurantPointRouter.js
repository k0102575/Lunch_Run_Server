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
    
    // TODO 전체 리스트 에서 변경 필요 설정값 혹은 지도 표시 포인트만

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