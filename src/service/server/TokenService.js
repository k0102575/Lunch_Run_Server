import jwt from 'jsonwebtoken';
import jwtOption from '../../../config/jwt';

import {
    ServerError
} from '../../models/ServerError'

class TokenService {
    constructor() {}

    async createToken(user) {

        try {

            const token = await jwt.sign({
                    id: user.id,
                    alias: user.alias
                },
                jwtOption.secretKey, {
                    expiresIn: '14d',
                    issuer: user.email,
                    subject: 'userInfo'
                })

            return token
        } catch (err) {
            throw new ServerError(err.message, 500)
        }

    }
}

export default TokenService;