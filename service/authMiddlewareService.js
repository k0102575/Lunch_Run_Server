const jwt = require('jsonwebtoken');
const jwtObj = require("../util/jwt");
const secret = jwtObj.secret;

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token

    if(!token) {
        return res.status(403).json({
            message: 'Not Token'
        })
    }

    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    p.then((decoded)=>{
        req.user = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware
