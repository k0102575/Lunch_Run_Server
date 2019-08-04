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

        var sql = 'insert into user (email, password, alias, phone) VALUES(?, password(?), ?, ?)';

        var params = [body.email, body.password, body.alias, body.phone];
        connection.query(sql, params, function(err, rows, fields){
            if(err){
                console.log(err);
                res.status(500).json(err);
            } else {
                console.log(rows)
                res.status(200).json(rows.insertId)
            }
        });

    } catch(e) {
        console.log(e)
        res.json(e);
    }

});

module.exports = router;
