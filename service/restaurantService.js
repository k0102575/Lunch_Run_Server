const datasource = require('../util/datasource');
const connection = datasource.getConnection();

module.exports = {
    insertRestaurant: function (param, callback) {

    },
    insertRestaurant : function (param, callback) {
        try {
            const {name, floor, introduction, lat, lng, address, address_road, category_id} = param

            connection.query('insert into restaurant (name, floor, introduction, lat, lng, address, address_road, category_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [name, floor, introduction, lat, lng, address, address_road, category_id], function(err, rows, fields){
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
            const {id, name, floor, introduction, lat, lng, address, address_road, category_id} = param

            connection.query('update restaurant SET name = ?, floor = ?, introduction = ?, lat = ?, lng =?, address = ?, address_road = ?, category_id = ? where id = ?', [name, floor, introduction, lat, lng, address, address_road, category_id, id], function(err, rows, fields){
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