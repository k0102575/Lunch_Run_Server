const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

module.exports = {
    getRestaurantList: function (param, callback) {
        const {category_id, page} = param
        let where = ''
        if(category_id != undefined) {
            where = ' and category_id = ' + category_id
        }
        let row = (page != undefined) ? page : 0

        connection.query('select r.*, ifnull(round((select avg(rating) from review re where re.restaurant_id = r.id ),1), 0) as rating from restaurant r where r.delete_datetime is null' + where + ' limit ' + (row * 10) + ' ,10' , function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    },
    getRestaurantPoint: function (param, callback) {
        
        const {category_id} = param
        let where = ""
        if(category_id != undefined) {
            where = " and category_id = " + category_id
        }

        connection.query('select id, lat, lng, category_id from restaurant where delete_datetime is null' + where, function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    },
    getRestaurant: function (param, callback) {
        
        try {
            const {id} = param

            var tasks = [
                function (callback) {
                    connection.query("select * from restaurant where id = ?", id, function (err, result) {
                        if(err) {
                            callback(new Error(err), null);
                        } else {
                            callback(null, result);
                        }
                    })
                },
                function (callback) {
                    connection.query("select * from restaurant_tag where restaurant_id = ?", id, function (err, result) {
                        if(err) {
                            callback(new Error(err), null);
                        } else {
                            callback(null, result);
                        }
                    })
                }
            ];
            
            async.series(tasks, function (err, results) {
                if(err) {
                    callback(500, err.message, null)
                } else {
                    let restaurant = JSON.parse(JSON.stringify(results[0][0]));
                    let restaurantTag = JSON.parse(JSON.stringify(results[1]));
    
                    restaurant.tags = restaurantTag

                    callback(null, null, restaurant)
                }

            });

        } catch(err) {
            callback(500, err.message, null);
        }

    },
    insertRestaurant : function (param, callback) {
        try {
            const {name, floor, url, lat, lng, address, address_road, category_id, tags} = param
            let restaurantId = 0;

            async.waterfall([
                function(callback) {
                    connection.query('insert into restaurant (name, floor, url, lat, lng, address, address_road, category_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [name, floor, url, lat, lng, address, address_road, category_id], function(err, rows, fields){
                        if(err){
                            callback(err, null);
                        } else {
                            restaurantId = rows.insertId
                            callback(null, rows.insertId);
                        }
                    });
                },
                function(restaurantId, callback) {
                    
                    if(tags.length != 0) {

                        let tag_multiple_query = 'insert into `restaurant_tag` (`tag_id`, `restaurant_id`) values ? '; // 쿼리문
                        let values = [];

                        for (var i = 0; i < tags.length; i++) {
                            values.push([tags[i].toString(), restaurantId.toString()])
                        }

                        connection.query(tag_multiple_query, [values], function(err, rows, fields){
                            if(err){
                                callback(err, null);
                            } else {
                                callback(null, restaurantId);
                            }
                        });

                    } else {
                        callback(null, restaurantId);
                    }

                }
            ], function (err, restaurantId) {
                if(err) {
                    callback(500, err.message, null);
                } else {
                    callback(200, null, restaurantId)
                }
            });

        } catch(err) {
            callback(500, err.message, null);
        }

    },
    updateRestaurant : function (param, callback) {
        try {
            const {id, name, floor, url, lat, lng, address, address_road, category_id, tags} = param

            async.waterfall([
                function(callback) {
                    connection.query('update restaurant SET name = ?, floor = ?, url = ?, lat = ?, lng =?, address = ?, address_road = ?, category_id = ? where id = ?', [name, floor, url, lat, lng, address, address_road, category_id, id], function(err, rows, fields){
                        if(err){
                            callback(err, null);
                        } else {
                            callback(null, id);
                        }
                    });
                },
                function(id, callback) {
                    
                    connection.query('delete from restaurant_tag where restaurant_id = ?', id, function(err, rows, fields){
                        if(err){
                            callback(err, null);
                        } else {
                            callback(null, id);
                        }
                    });

                },
                function(id, callback) {
                    
                    if(tags.length != 0) {

                        let tag_multiple_query = 'insert into `restaurant_tag` (`tag_id`, `restaurant_id`) values ? '; // 쿼리문
                        let values = [];

                        for (var i = 0; i < tags.length; i++) {
                            values.push([tags[i].toString(), id.toString()])
                        }

                        connection.query(tag_multiple_query, [values], function(err, rows, fields){
                            if(err){
                                callback(err, null);
                            } else {
                                callback(null, id);
                            }
                        });

                    } else {
                        callback(null, id);
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
    },
    deleteRestaurant : function (param, callback) {
            
        try {
            const {id} = param

            connection.query('update restaurant SET delete_datetime = now() where id = ?', [id], function(err, rows, fields){
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