import jwt from 'jsonwebtoken';
import jwtOption from '../../config/jwt';

import ErrorService from './server/ErrorService';

const errorService = new ErrorService();

class AuthMiddlewareService {
    constructor() {}

    isValidToken(req, res, next) {

        const token = req.headers['x-access-token'] || req.query.token

        if (!token) {
            return errorService.resError(res, 403, 'Not Token')
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
            return errorService.resError(res, 403, error.message)
        }

        p.then((decoded) => {
            req.user = decoded
            next()
        }).catch(onError)
    }

}

export default AuthMiddlewareService;