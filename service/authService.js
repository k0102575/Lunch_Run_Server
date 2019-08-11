const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');
const jwt = require('jsonwebtoken');
const jwtObj = require("../util/jwt");
const secret = jwtObj.secret

module.exports = {
    signup : function (param, callback) {
        try {

            const {email, phone, password, alias} = param

    
            var tasks = [
                function (callback) {
                    connection.query("select * from user where email = ?", email, function (err, result) {
                        if(typeof result !== 'undefined' && result.length > 0) {
                            callback(new Error('email'));
                        } else {
                            callback(null);
                        }
                    })
                },
                function (callback) {
                    connection.query("select * from user where phone = ?", phone, function (err, result) {
                        if(typeof result !== 'undefined' && result.length > 0) {
                            callback(new Error('phone'));
                        } else {
                            callback(null);
                        }
                    })
                }
            ];
            
            async.series(tasks, function (err, results) {
                if(!err) {
                    connection.query('insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)', [email, password, alias, phone], function(e, rows, fields){
                        if(err){
                            callback(500, err, null);
                        } else {
                            callback(null, null, rows.insertId);
                        }
                    });
                } else {
                    callback(409, err.message, null);
                }
            });
            
        } catch(err) {
            callback(500, err.message, null)
        }
    },

    login : function (param, callback) {

        try {
            
            const {email, password} = param
            
            async.waterfall([
                function(callback) {
                    connection.query("select id, email, alias, phone from user where email = ? and password = password(?)", [email, password], function (e, result) {
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
                                callback("token failed", null)
                            } else {
                                callback(null, token)
                            }

                        })

                }
            ], function (err, token) {
                if(err) {
                    callback(403, err, null);
                } else {
                    callback(200, null, token)
                }
            });

        } catch(err) {
            callback(500, err.message, null);
        }

    },

    check: function (param, callback) {
        try {

            const {token} = param
    
            if(!token) {
                callback(403, "Not Token", null);
            }
    
            const p = new Promise(
                (resolve, reject) => {
                    jwt.verify(token, secret, (e, decoded) => {
                        if(e) reject(e)
                        resolve(decoded)
                    })
                }
            )
        
            const respond = (info) => {
                callback(200, null, info)
            }
        
            const onerror = (err) => {
                callback(403, err.message, null);
            }
        
            p.then(respond).catch(onerror)
    
        } catch(err) {
            callback(500, err.message, null);
        }
    }
}