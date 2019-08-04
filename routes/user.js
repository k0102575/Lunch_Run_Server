const express = require('express');
const router = express.Router();
const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

router.get('/user', function(req, res, next) {

    try {
        connection.query('select * from user', function (err, result) {
            res.status(200).json(result);
        })    
    } catch(e) {
        res.status(500).json(e);
    }

});

router.post('/user', function(req, res, next) {

    try {

        const {email, phone, password, alias} = req.body

        var tasks = [
            function (callback) {
                connection.query("select * from user where email = ?", email, function (err, result) {
                    if(result.length) {
                        callback(new Error('email'));
                    } else {
                        callback(null);
                    }
                })
            },
            function (callback) {
                connection.query("select * from user where phone = ?", phone, function (err, result) {
                    if(result.length) {
                        callback(new Error('phone'));
                    } else {
                        callback(null);
                    }
                })
            }
        ];
        
        async.series(tasks, function (err, results) {
            if(!err) {
                connection.query('insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)', [email, password, alias, phone], function(err, rows, fields){
                    if(err){
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(rows.insertId)
                    }
                });
            } else {
                res.status(409).json(err.message);
            }
        });
        
    } catch(e) {
        console.log(e)
        res.json(e);
    }

});

module.exports = router;
