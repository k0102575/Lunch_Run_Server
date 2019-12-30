import express from 'express';
import { check, validationResult } from 'express-validator';

const RestaurantRouter = express.Router();
const restaurantService = require('../service/restaurantService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

// router.use('/restaurant_point', authMiddleware)
// router.get('/restaurant_point', function(req, res, next) {
    
//     const param = {
//         category_id : req.query.category_id,
//         tag_id : req.query.tag_id
//     }

//     restaurantService.getRestaurantPoint(param, (status, err, result) => {
//         if(err) {
//             if(status == 500) console.log(err);
//             res.status(status).json({message : err})
//         } else {
//             res.status(200).json(result)
//         }
//     })

// });

RestaurantRouter.use('/', authMiddleware)
RestaurantRouter.use('/:id', authMiddleware)

RestaurantRouter.get('/', function(req, res, next) {
    
    const param = {
        page : req.query.page,
        user_id : req.user.id,
        category_id : req.query.category_id,
        tag_id : req.query.tag_id
    }

    restaurantService.getRestaurantList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

RestaurantRouter.get('/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
        user_id : req.user.id
    }

    restaurantService.getRestaurant(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"restaurant": result})
        }

    })
});

RestaurantRouter.post('/', [
    check('name').not().isEmpty(),
    check('floor').isInt(),
    check('lat').isFloat(),
    check('lng').isFloat(),
    check('category_id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        name : req.body.name,
        floor : req.body.floor,
        url : req.body.url,
        lat : req.body.lat,
        lng : req.body.lng,
        address : req.body.address,
        address_road : req.body.address_road,
        category_id : req.body.category_id,
        tags : req.body.tags
    }

    restaurantService.insertRestaurant(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});

RestaurantRouter.put('/', [
    check('name').not().isEmpty(),
    check('floor').isInt(),
    check('lat').isFloat(),
    check('lng').isFloat(),
    check('category_id').not().isEmpty(),
    check('id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        id: req.body.id,
        name : req.body.name,
        floor : req.body.floor,
        url : req.body.url,
        lat : req.body.lat,
        lng : req.body.lng,
        address : req.body.address,
        address_road : req.body.address_road,
        category_id : req.body.category_id,
        tags : req.body.tags
    }

    restaurantService.updateRestaurant(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});

RestaurantRouter.delete('/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
    }

    restaurantService.deleteRestaurant(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});

export default RestaurantRouter;