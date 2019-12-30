const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    getReviewList: function (param, callback) {
        const {restaurant_id, page} = param
        let row = (page != undefined) ? page : 0

        connection.query('select * from review where delete_datetime is null and restaurant_id = ? limit ? , 10', [restaurant_id, row] , function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    },
    insertReview : function (param, callback) {
        try {
            const {rating, comment, user_id, restaurant_id} = param

            connection.query("INSERT INTO review (create_datetime, delete_datetime, rating, comment, user_id, restaurant_id) VALUES (now(), NULL, ?, ?, ?, ?)", [rating, comment, user_id, restaurant_id], function(err, rows, fields){
                if(err){
                    callback(500, err.message, null);
                } else {
                    callback(null, null, rows.insertId);
                }
            });
        } catch(err) {
            callback(500, err.message, null);
        }

    },
    updateReview : function (param, callback) {
        try {
            const {rating, comment, id} = param

            connection.query('update review SET rating = ?, comment = ? where id = ?', [rating, comment, id], function(err, rows, fields){
                if(err){
                    callback(500, err.message.sqlMessage, null);
                } else {
                    callback(null, null, id);
                }
            });
        } catch(err) {
            callback(500, err.message, null);
        }
    },
    deleteReview : function (param, callback) {
            
        try {
            const {id} = param

            connection.query('update review SET delete_datetime = now() where id = ?', [id], function(err, rows, fields){
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