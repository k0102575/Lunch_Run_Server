const express = require('express');
const router = express.Router();
const restaurantFavoriteService = require('../service/restaurantFavoriteService.js');
const authMiddleware = require('../service/authMiddlewareService.js');
const { check, validationResult } = require('express-validator');

router.use('/restaurant_favorite', authMiddleware)
router.get('/restaurant_favorite', function(req, res, next) {
    
    const param = {
        page : req.query.page,
        user_id : req.user.id
    }

    restaurantFavoriteService.getRestaurantFavoriteList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

// router.use('/restaurant/:id', authMiddleware)
// router.get('/restaurant/:id', function(req, res, next) {

//     if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
//         return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
//     }

//     const param = {
//         id: req.params.id,
//     }

//     restaurantService.getRestaurant(param, function (status, err, result) {
//         if(err) {
//             if(status == 500) console.log(err);
//             res.status(status).json({message : err})
//         } else {
//             res.status(200).json({"restaurant": result})
//         }

//     })
// });

// router.use('/restaurant', authMiddleware)
// router.post('/restaurant', [
//     check('name').not().isEmpty(),
//     check('floor').isInt(),
//     check('lat').isFloat(),
//     check('lng').isFloat(),
//     check('category_id').not().isEmpty()
//   ], function(req, res, next) {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     const param = {
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

//     restaurantService.insertRestaurant(param, function (status, err, result) {
//         if(err) {
//             if(status == 500) console.log(err);
//             res.status(status).json({message : err})
//         } else {
//             res.status(200).json({restaurantId : result})
//         }

//     })
// });

// router.use('/restaurant/:id', authMiddleware)
// router.delete('/restaurant/:id', function(req, res, next) {

//     if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
//         return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
//     }

//     const param = {
//         id: req.params.id,
//     }

//     restaurantService.deleteRestaurant(param, function (status, err, result) {
//         if(err) {
//             if(status == 500) console.log(err);
//             res.status(status).json({message : err})
//         } else {
//             res.status(200).json({"result": true})
//         }

//     })
// });

module.exports = router;