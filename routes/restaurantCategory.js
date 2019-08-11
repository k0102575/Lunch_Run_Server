const express = require('express');
const router = express.Router();
const restaurantCategoryService = require('../service/restaurantCategoryService.js');
const authMiddleware = require('../service/authMiddlewareService.js');

router.use('/restaurantCategory', authMiddleware)
router.get('/restaurantCategory', function(req, res, next) {

    restaurantCategoryService.getCategory(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

module.exports = router;