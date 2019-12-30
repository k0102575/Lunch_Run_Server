import express from 'express';
import authService from '../service/authService'
import { check, validationResult } from 'express-validator';

const AuthRouter = express.Router();

AuthRouter.post('/signup', [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    check('alias').not().isEmpty(),
    check('phone').not().isEmpty(),
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

AuthRouter.post('/login', [
    check('email').isEmail(),
    check('password').not().isEmpty()
  ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

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


AuthRouter.post('/check', function(req, res, next) {

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

export default AuthRouter;