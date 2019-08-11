const express = require('express');
const router = express.Router();
const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');
const userService = require('../service/userService.js');

router.get('/user', function(req, res, next) {
    userService.getUser(function (err, result) {
        if(!err) {
            res.status(200).json(result);
        } else {
            res.status(500).json({message : err});
        }
    });
});

router.post('/user', function(req, res, next) {

    try {

        const {email, phone, password, alias} = req.body

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
                connection.query('insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)', [email, password, alias, phone], function(err, rows, fields){
                    if(err){
                        res.status(500).json({message : err});
                    } else {
                        res.status(200).json({userId : rows.insertId})
                    }
                });
            } else {
                res.status(409).json({message : err.message});
            }
        });
        
    } catch(e) {
        res.status(500).json({message : e});
    }

});

module.exports = router;
