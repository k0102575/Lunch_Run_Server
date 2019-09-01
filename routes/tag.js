const express = require('express');
const router = express.Router();
const tagService = require('../service/tagService.js');

router.get('/tag', function(req, res, next) {

    tagService.getCategory(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

module.exports = router;