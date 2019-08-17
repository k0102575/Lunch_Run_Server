const express = require('express');
const router = express.Router();
const reviewService = require('../service/reviewService.js');
const authMiddleware = require('../service/authMiddlewareService.js');
const { check, validationResult } = require('express-validator');

router.use('/review', authMiddleware)
router.get('/review', [
    check('rating').not().isEmpty(),
    check('restaurant_id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const param = {
        restaurant_id : req.body.restaurant_id
    }

    reviewService.selectReview(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

router.use('/review', authMiddleware)
router.post('/review', [
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

router.use('/review', authMiddleware)
router.put('/review', [
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

router.use('/review', authMiddleware)
router.delete('/review/:id', function(req, res, next) {

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




module.exports = router;