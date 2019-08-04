var express = require('express');
var router = express.Router();
const datasource = require('../util/datasource')
const connection = datasource.getConnection()

router.get('/user', function(req, res, next) {

    try {

        var stmt = 'select * from user';
        connection.query(stmt, function (err, result) {
            console.log(result)
            res.status(200).json(result);
        })    
    } catch(e) {
        res.status(500).json(e);
    }

});

router.post('/user', function(req, res, next) {

    try {

        let body = req.body

        let email = body.email
        let phone = body.phone

        connection.query("select * from user where email = ?", email, function (err, result) {

            if(result.length) {
                res.status(409).json("email");
            } else {
                connection.query("select * from user where phone = ?", phone, function (err, result) {

                    if(result.length) {
                        res.status(409).json("phone");
                    } else {
                        connection.query('insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)', [email, body.password, body.alias, phone], function(err, rows, fields){
                            if(err){
                                res.status(500).json(err);
                            } else {
                                res.status(200).json(rows.insertId)
                            }
                        });
                    }
                })    
                
            }
        })    
        
        // connection.query('insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)', [email, body.password, body.alias, phone], function(err, rows, fields){
        //     if(err){
        //         console.log(err);
        //         res.status(500).json(err);
        //     } else {
        //         console.log(rows)
        //         res.status(200).json(rows.insertId)
        //     }
        // });

    } catch(e) {
        console.log(e)
        res.json(e);
    }

});

module.exports = router;
