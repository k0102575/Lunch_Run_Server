import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantService
} from '../service';

const RestaurantRouter = express.Router();

RestaurantRouter.use('/', authMiddlewareService.isValidToken)
RestaurantRouter.use('/:id', authMiddlewareService.isValidToken)

RestaurantRouter.get('/', async (req, res) => {
    
    try {
        const param = {
            page : req.query.page,
            user_id : req.user.id,
            category_id : req.query.category_id,
            tag_id : req.query.tag_id
        }
    
        const result = await restaurantService.getRestaurantList(param)

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, 500, err)
    }
});

RestaurantRouter.get('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, 422, { "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] })
        }

        const param = {
            id: req.params.id,
            user_id : req.user.id
        }

        const [result] =  await restaurantService.getRestaurant(param);
        serverService.response(res, 200, {"restaurant": result})
    } catch(err) {
        errorService.resError(res, 500, err)
    }

});

RestaurantRouter.post('/', [
    check('name').not().isEmpty(),
    check('floor').isInt(),
    check('lat').isFloat(),
    check('lng').isFloat(),
    check('category_id').not().isEmpty()
  ], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return errorService.resValidationError(res, errors);
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
    
        const result =  await restaurantService.insertRestaurant(param);
        serverService.response(res, 200, {"restaurantId": result})
    } catch(err) {
        errorService.resError(res, 500, err)
    }

});

// RestaurantRouter.put('/', [
//     check('name').not().isEmpty(),
//     check('floor').isInt(),
//     check('lat').isFloat(),
//     check('lng').isFloat(),
//     check('category_id').not().isEmpty(),
//     check('id').not().isEmpty()
//   ], function(req, res, next) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     const param = {
//         id: req.body.id,
//         name : req.body.name,
//         floor : req.body.floor,
//         url : req.body.url,
//         lat : req.body.lat,
//         lng : req.body.lng,
//         address : req.body.address,
//         address_road : req.body.address_road,
//         category_id : req.body.category_id,
//         tags : req.body.tags
//     }

//     restaurantService.updateRestaurant(param, function (status, err, result) {
//         if(err) {
//             if(status == 500) console.log(err);
//             res.status(status).json({message : err})
//         } else {
//             res.status(200).json({restaurantId : result})
//         }

//     })
// });

RestaurantRouter.delete('/:id', async (req, res) => {

    try {

        if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
            return errorService.resError(res, 422, { "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] })
        }

        const param = {
            id: req.params.id,
            user_id : req.user.id
        }

        await restaurantService.deleteRestaurant(param);
        serverService.response(res, 200, {"result": true})
    } catch(err) {
        errorService.resError(res, 500, err)
    }
});

export default RestaurantRouter;