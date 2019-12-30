const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

module.exports = {
    getReportList: function (param, callback) {
        const {page, user_id} = param

        let row = (page != undefined) ? page : 0

        connection.query('SELECT rr.id, rt.id as reportType, rt.name as reportText, r.name as restrauntName, r.address_road as restaurantAddress\
                            FROM restaurant_report rr\
                            INNER JOIN report_type rt on rr.type_id = rt.id\
                            INNER JOIN restaurant r on rr.restaurant_id = r.id\
                            WHERE rr.delete_datetime is null\
                            AND rr.user_id = ?\
                            limit ? , 10' , [user_id, (row * 10)], (err, rows, fields) => {
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    },
    getReport: function (param, callback) {
        
        try {

            const {id} = param
            connection.query('SELECT rr.id, rr.content, rt.id as reportType, rt.name as reportText\
                                FROM restaurant_report rr\
                                INNER JOIN report_type rt on rr.type_id = rt.id where rr.id = ? ', [id], (err, rows, fields) => {

                if(err){
                    callback(500, err.message, null);
                } else {
                    callback(null, null, rows[0]);
                }
            });

        } catch(err) {
            callback(500, err.message, null);
        }

    },
    insertReport : function (param, callback) {
        try {
            const {content, user_id, restaurant_id, type_id} = param

            connection.query('INSERT INTO restaurant_report (content, user_id, restaurant_id, type_id)\
                VALUES\
                (?, ?, ?, ?)', [content, user_id, restaurant_id, type_id], function(err, rows, fields){
                if(err) {
                    callback(500, err.message, null);
                } else {
                    callback(200, null, rows.insertId);
                }
            });

        } catch(err) {
            callback(500, err.message, null);
        }

    },
    updateReport : function (param, callback) {
        try {

            const {content, type_id, id} = param

            connection.query('UPDATE restaurant_report SET content = ?, type_id = ? where id = ?', [content, type_id, id], (err, rows, fields) => {
                if(err) {
                    callback(500, err.message, null);
                } else {
                    callback(200, null, id);
                }
            });
 
        } catch(err) {
            callback(500, err.message, null);
        }
    },
    deleteReport : function (param, callback) {
            
        try {
            const {id} = param

            connection.query('update restaurant_report SET delete_datetime = now() where id = ?', [id], function(err, rows, fields){
                if(err){
                    callback(500, err.message.sqlMessage, null);
                } else {
                    callback(null, null, id);
                }
            });
        } catch(err) {
            callback(500, err.message, null);
        }
            
    }

}