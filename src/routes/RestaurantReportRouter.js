import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantReportService
} from '../service';

import {
    ServerError
} from '../models/ServerError'

const RestaurantReportRouter = express.Router();

RestaurantReportRouter.use('/', authMiddlewareService.isValidToken)
RestaurantReportRouter.use('/:id', authMiddlewareService.isValidToken)

RestaurantReportRouter.get('/', async (req, res) => {
    
    try {

        const param = {
            page : req.query.page,
            user_id : req.user.id
        }
    
        const result = await restaurantReportService.getReportList(param)

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantReportRouter.post('/', [
    check('restaurant_id').not().isEmpty(),
    check('type_id').not().isEmpty()
  ], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
        }
    
        const param = {
            content : req.body.content,
            user_id : req.user.id,
            restaurant_id : req.body.restaurant_id,
            type_id : req.body.type_id
        }

        const result = await restaurantReportService.insertReport(param);

        serverService.response(res, 200, {"reportId": result})
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantReportRouter.put('/', [
    check('type_id').not().isEmpty(),
    check('id').not().isEmpty()
  ], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
        }
    
        const param = {
            content : req.body.content,
            type_id : req.body.type_id,
            id : req.body.id
        }

        const result = await restaurantReportService.updateReport(param);

        serverService.response(res, 200, {"reportId": result})
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantReportRouter.get('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, new ServerError('{ "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" }', 422))
        }
    
        const param = {
            id: req.params.id
        }
    
        const [result] = await restaurantReportService.getReport(param)

        serverService.response(res, 200, {"report": result})
    } catch(err) {
        errorService.resError(res, err);
    }

});

RestaurantReportRouter.delete('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, new ServerError('{ "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" }', 422))
        }

        const param = {
            id: req.params.id
        }

        await restaurantReportService.deleteReport(param);
        serverService.response(res, 200, {"result": true})
    } catch(err) {
        errorService.resError(res, err);
    }

});

export default RestaurantReportRouter;