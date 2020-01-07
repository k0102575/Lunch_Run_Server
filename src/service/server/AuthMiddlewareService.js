import jwt from 'jsonwebtoken';
import jwtOption from '../../../config/jwt';

import {
    errorService
} from '../'

import {
    ServerError
} from '../../models/ServerError'

class AuthMiddlewareService {
    constructor() {}

    isValidToken(req, res, next) {

        const token = req.headers['x-access-token'] || req.query.token

        if (!token) {
            return errorService.resError(res, new ServerError('Not Token', 403))
        }

        const p = new Promise(
            (resolve, reject) => {
                jwt.verify(token, jwtOption.secretKey, (err, decoded) => {
                    if (err) reject(err)
                    resolve(decoded)
                })
            }
        )

        const onError = (error) => {
            return errorService.resError(res, new ServerError(error.message, 403))
        }

        p.then((decoded) => {
            req.user = decoded
            next()
        }).catch(onError)
    }

}

export default AuthMiddlewareService;