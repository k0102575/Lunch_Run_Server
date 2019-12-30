const express = require('express');
const router = express.Router();
const userService = require('../service/userService.js');

router.get('/user', function(req, res, next) {
    userService.getUser(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    });
});

module.exports = router;
