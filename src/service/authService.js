import {
    dbService,
    tokenService
} from './'

import {
    ServerError
} from '../models/ServerError'

class AuthService {
    constructor() {}

    async signup(param) {

        try {

            const {email, phone, password, alias} = param

            const selectEmailQuery = 'select * from user where email = ?'
    
            const [emailResult] = await dbService.query(selectEmailQuery, [email])
            if(!!emailResult) {
                throw new ServerError('email', 409)
            }

            const selectPhoneQuery = 'select * from user where phone = ?'
    
            const [phoneResult] = await dbService.query(selectPhoneQuery, [phone])
            if(!!phoneResult) {
                throw new ServerError('phone', 409)
            }

            const insertQuery = 'insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)'

            const result = await dbService.query(insertQuery, [email, password, alias, phone])

            return result.insertId

        } catch(err) {
            throw new ServerError(err.message, err.status)
        }

    }

    async login(param) {

        try {

            const {email, password} = param

            const selectQuery = 'select id, email, alias, phone from user where email = ? and password = password(?)'
    
            const [result] = await dbService.query(selectQuery, [email, password])

            if(!!result) {
                const token = await tokenService.createToken(result)
                return token
            } else {
                throw new ServerError('login failed', 403)
            }

        } catch(err) {
            throw new ServerError(err.message, err.status)
        }

    }

}

export default AuthService;