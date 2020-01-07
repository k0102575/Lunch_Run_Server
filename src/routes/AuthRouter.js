import express from 'express';
import { check, validationResult } from 'express-validator';
import {
    authMiddlewareService,
    errorService,
    serverService,
    authService
} from '../service';
import {
    ServerError
} from '../models/ServerError'

const AuthRouter = express.Router();

AuthRouter.post('/signup', [
    check('email').isEmail(),
    check('password').not().isEmpty(),
    check('alias').not().isEmpty(),
    check('phone').not().isEmpty(),
  ], async (req, res) => {

    try {

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

        const result = await authService.signup(param)

        serverService.response(res, 200, {userId : result})

    } catch(err) {
        errorService.resError(res, err)
    }

});

AuthRouter.post('/login', [
    check('email').isEmail(),
    check('password').not().isEmpty()
  ], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const param = {
            email : req.body.email,
            password : req.body.password
        }

        const result = await authService.login(param)

        serverService.response(res, 200, {token : result})

    } catch(err) {
        errorService.resError(res, err)
    }

});

AuthRouter.use('/check', authMiddlewareService.isValidToken)
AuthRouter.post('/check', async (req, res) => {

    try {
        serverService.response(res, 200, {userInfo: req.user})
    } catch(err) {
        errorService.resError(res, err);
    }

});

export default AuthRouter;