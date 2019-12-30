const express = require('express');
const router = express.Router();
const restaurantReportService = require('../service/restaurantReportService.js');
const authMiddleware = require('../service/authMiddlewareService.js');
const { check, validationResult } = require('express-validator');

router.use('/restaurant_report', authMiddleware)
router.get('/restaurant_report', function(req, res, next) {
    
    const param = {
        page : req.query.page,
        user_id : req.user.id
    }

    restaurantReportService.getReportList(param, (status, err, result) => {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json(result)
        }
    })

});

router.use('/restaurant_report/:id', authMiddleware)
router.get('/restaurant_report/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id
    }

    restaurantReportService.getReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"report": result})
        }

    })
});

router.use('/restaurant_report', authMiddleware)
router.post('/restaurant_report', [
    check('restaurant_id').not().isEmpty(),
    check('type_id').not().isEmpty()
  ], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        content : req.body.content,
        user_id : req.user.id,
        restaurant_id : req.body.restaurant_id,
        type_id : req.body.type_id
    }

    restaurantReportService.insertReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({reportId : result})
        }

    })
});

router.use('/restaurant_report', authMiddleware)
router.put('/restaurant_report', [
    check('type_id').not().isEmpty(),
    check('id').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        content : req.body.content,
        type_id : req.body.type_id,
        id : req.body.id
    }

    restaurantReportService.updateReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({restaurantId : result})
        }

    })
});

router.use('/restaurant_report/:id', authMiddleware)
router.delete('/restaurant_report/:id', function(req, res, next) {

    if(req.params.id == undefined || !Number.isInteger(parseInt(req.params.id))) {
        return res.status(422).json({ "errors": [ { "value": "***", "msg": "Invalid value", "param": "id", "location": "Path Variable" } ] });
    }

    const param = {
        id: req.params.id,
    }

    restaurantReportService.deleteReport(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({"result": true})
        }

    })
});




module.exports = router;