import express from 'express';

const RestaurantReportRouter = express.Router();
const restaurantReportService = require('../service/restaurantReportService.js');
const { check, validationResult } = require('express-validator');

import {
    authMiddlewareService
} from '../service';

RestaurantReportRouter.use('/', authMiddlewareService.isValidToken)
RestaurantReportRouter.use('/:id', authMiddlewareService.isValidToken)

RestaurantReportRouter.get('/', function(req, res, next) {
    
    const param = {
        page : req.query.page,
        user_id : req.user.id
    }

    restaurantReportService.getReportList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

RestaurantReportRouter.get('/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id
    }

    restaurantReportService.getReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"report": result})
        }

    })
});

RestaurantReportRouter.post('/', [
    check('restaurant_id').not().isEmpty(),
    check('type_id').not().isEmpty()
  ], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        content : req.body.content,
        user_id : req.user.id,
        restaurant_id : req.body.restaurant_id,
        type_id : req.body.type_id
    }

    restaurantReportService.insertReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({reportId : result})
        }

    })
});

RestaurantReportRouter.put('/', [
    check('type_id').not().isEmpty(),
    check('id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        content : req.body.content,
        type_id : req.body.type_id,
        id : req.body.id
    }

    restaurantReportService.updateReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});

RestaurantReportRouter.delete('/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
    }

    restaurantReportService.deleteReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});

export default RestaurantReportRouter;