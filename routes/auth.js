const express = require('express');
const router = express.Router();
const authService = require("../service/authService.js");
const { check, validationResult } = require('express-validator');

router.post('/signup', [
    check('email').isEmail(),
    check('password').exists(),
    check('alias').exists(),
    check('phone').exists(),
  ], function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const param = {
        email : req.body.email, 
        phone : req.body.phone, 
        password : req.body.password, 
        alias : req.body.alias
    }

    authService.signup(param, function(status, err, result) {

        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({userId : result})
        }

    })

});

router.post('/login', function(req, res, next) {

    const param = {
        email : req.body.email,
        password : req.body.password
    }

    authService.login(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({token : result})
        }
    })

});


router.post('/check', function(req, res, next) {

    const token = req.headers['x-access-token'] || req.query.token

    if(!token) {
        return res.status(403).json({message : "Not Token"})
    }

    const param = {
        token : token
    }

    authService.check(param, function (status, err, result) {
        if(err) {
            if(status == 500) console.log(err);
            res.status(status).json({message : err})
        } else {
            res.status(200).json({userInfo : result})
        }
    })
});

module.exports = router;
