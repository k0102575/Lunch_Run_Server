const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    selectRestaurant: function (param, callback) {
        const {category_id, page} = param
        let where = ''
        if(category_id != undefined) {
            where = ' and category_id = ' + category_id
        }
        let row = (page != undefined) ? page : 0

        connection.query('select * from restaurant where delete_datetime is null' + where + ' limit ' + row + ' ,10' , function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    },
    selectRestaurantPoint: function (param, callback) {
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
    insertRestaurant : function (param, callback) {
        try {
            const {name, floor, url, lat, lng, address, address_road, category_id} = param

            connection.query('insert into restaurant (name, floor, url, lat, lng, address, address_road, category_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [name, floor, url, lat, lng, address, address_road, category_id], function(err, rows, fields){
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
    updateRestaurant : function (param, callback) {
        try {
            const {id, name, floor, url, lat, lng, address, address_road, category_id} = param

            connection.query('update restaurant SET name = ?, floor = ?, url = ?, lat = ?, lng =?, address = ?, address_road = ?, category_id = ? where id = ?', [name, floor, url, lat, lng, address, address_road, category_id, id], function(err, rows, fields){
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