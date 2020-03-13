import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    restaurantService
} from '../service';

const RestaurantRouter = express.Router();

// RestaurantRouter.use('/', authMiddlewareService.isValidToken)
RestaurantRouter.use('/:id', authMiddlewareService.isValidToken)

/**
 * @swagger
 *  paths:
 *    /login:
 *      post:
 *        tags:
 *        - "Auth"
 *        summary: "Login process"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "로그인 계정 정보와 서비스 정보를 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_request"
 *        responses:
 *          200:
 *            description: "로그인 결과"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "로그인 오류 & 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
RestaurantRouter.get('/', async (req, res) => {
    
    try {

        const param = {}
        // const param = {
        //     page : req.query.page,
        //     user_id : req.user.id,
        //     category_id : req.query.category_id,
        //     tag_id : req.query.tag_id
        // }
    
        const [result] = await restaurantService.getRestaurantList(param);

        console.log(result)

        serverService.response(res, 200, result)
    } catch(err) {
        errorService.resError(res, err);
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
        errorService.resError(res, err);
    }

});

RestaurantRouter.put('/', [
    check('name').not().isEmpty(),
    check('floor').isInt(),
    check('lat').isFloat(),
    check('lng').isFloat(),
    check('category_id').not().isEmpty(),
    check('id').not().isEmpty()
  ], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorService.resValidationError(res, errors);
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

        const result =  await restaurantService.updateRestaurant(param);
        serverService.response(res, 200, {"restaurantId": result})

    } catch(err) {
        errorService.resError(res, err);
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
        errorService.resError(res, err);
    }

});

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
        errorService.resError(res, err);
    }
});

export default RestaurantRouter;