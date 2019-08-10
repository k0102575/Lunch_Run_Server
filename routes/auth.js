const express = require('express');
const router = express.Router();
const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');
const jwt = require('jsonwebtoken');
const jwtObj = require("../util/jwt");

router.post('/login', function(req, res, next) {

    try {

        const {email, password} = req.body
        const secret = jwtObj.secret

        async.waterfall([
            function(callback) {
                connection.query("select id, email, alias, phone from user where email = ? and password = password(?)", [email, password], function (err, result) {
                    if(result.length) {
                        callback(null, result[0])
                    } else {
                        callback("login failed", null)
                    }
                })
            },
            function(user, callback) {
                jwt.sign(
                    {
                        id: user.id,
                        alias: user.alias
                    }, 
                    secret, 
                    {
                        expiresIn: '14d',
                        issuer: user.email,
                        subject: 'userInfo'
                    }, (err, token) => {
                        if(err) {
                            console.log(err)
                            callback("token failed", null)
                        } else {
                            callback(null, token)
                        }

                    })

            }
        ], function (err, token) {
            if(err) {
                return res.status(403).json({message : err})
            } else {
                return res.status(200).json({token : token})
            }
        });

    } catch(e) {
        console.log(e)
        return res.status(403).json({message : e});
    }

});


router.post('/check', function(req, res, next) {

    try {

        const token = req.headers['x-access-token'] || req.query.token
        const secret = jwtObj.secret

        if(!token) {
            return res.status(403).json({
                message: 'not logged in'
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
    
        const respond = (info) => {
            res.status(200).json({
                userInfo: info
            })
        }
    
        const onError = (error) => {
            res.status(403).json({
                message: error.message
            })
        }
    
        p.then(respond).catch(onError)

    } catch(e) {
        console.log(e)
        res.status(403).json({message : e});
    }

});




module.exports = router;
