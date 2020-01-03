import express from 'express';

const ReviewRouter = express.Router();
const reviewService = require('../service/reviewService.js');
const { check, validationResult } = require('express-validator');

import {
    authMiddlewareService
} from '../service';

ReviewRouter.use('/', authMiddlewareService.isValidToken)
ReviewRouter.use('/:id', authMiddlewareService.isValidToken)

ReviewRouter.get('/', [
    check('restaurant_id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const param = {
        page : req.query.page,
        restaurant_id : req.query.restaurant_id
    }

    reviewService.getReviewList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

ReviewRouter.post('/', [
    check('rating').not().isEmpty(),
    check('restaurant_id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const param = {
        rating : req.body.rating,
        comment : req.body.comment,
        user_id : req.user.id,
        id : req.body.id
    }

    reviewService.insertReview(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({reviewId : result})
        }

    })
});

ReviewRouter.put('/', [
    check('rating').not().isEmpty(),
    check('id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        rating : req.body.rating,
        comment : req.body.comment,
        user_id : req.user.id,
        id : req.body.id
    }

    reviewService.updateReview(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({reviewId : result})
        }

    })
});

ReviewRouter.delete('/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
    }

    reviewService.deleteReview(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});

export default ReviewRouter;