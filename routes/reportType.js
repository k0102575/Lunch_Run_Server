const express = require('express');
const router = express.Router();
const reportTypeService = require('../service/reportTypeService.js');

router.get('/report_type', function(req, res, next) {

    reportTypeService.getType(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    })
});

module.exports = router;