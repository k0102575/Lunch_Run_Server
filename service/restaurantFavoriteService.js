const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

module.exports = {
    getRestaurantFavoriteList: function (param, callback) {
        const {user_id, page} = param
        let row = (page != undefined) ? page : 0

        connection.query('select r.id, r.name, r.floor, r.url, r.lat, r.lng, r.address, r.address_road, r.category_id,\
                            ifnull(round((select avg(rating) from review re where re.restaurant_id = r.id ),1), 0) as rating,\
                            ifnull((select count(*) from restaurant_favorite rf where rf.restaurant_id = r.id and rf.user_id = ? ), 0) as favorite,\
                            group_concat(t.name) as tag\
                            from restaurant r\
                            inner join restaurant_favorite rf on r.id = rf.restaurant_id\
                            left join restaurant_tag rt on r.id = rt.restaurant_id\
                            left join tag t on rt.tag_id = t.id\
                            where rf.user_id = ?\
                            group by r.id limit ' + (row * 10) + ' ,10' , [user_id, user_id], function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });
    },
    insertRestaurantFavorite : function (param, callback) {
            
        try {
            const {id, user_id} = param

            connection.query('INSERT INTO restaurant_favorite (user_id, restaurant_id) VALUES(?, ?)', [user_id, id], function(err, rows, fields){
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
    deleteRestaurantFavorite : function (param, callback) {
            
        const {id, user_id} = param

        try {
            async.waterfall([
                function(callback) {
                    connection.query('SELECT id from restaurant_favorite where user_id = ? and  restaurant_id = ?', [user_id, id], function(err, rows, fields){
                        if(err){
                            callback(err, null);
                        } else {
                            callback(null, rows);
                        }
                    });
                },
                function(rows, callback) {

                    if(rows.length) {
                        connection.query('delete from restaurant_favorite where id = ?', rows[0].id, function(err, rows, fields){
                            if(err){
                                callback(err, null);
                            } else {
                                callback(null, id);
                            }
                        });
                    } else {
                        callback(null, "empty");
                    }
                }
            ], function (err, id) {
                if(err) {
                    callback(500, err.message, null);
                } else {
                    callback(200, null, id)
                }
            });
        } catch(err) {
            callback(500, err.message, null);
        }
            
    }
}