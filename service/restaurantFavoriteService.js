const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

module.exports = {
    getRestaurantFavoriteList: function (param, callback) {
        const {user_id, page} = param
        let row = (page != undefined) ? page : 0

        connection.query('select * from restaurant_favorite where user_id = ' + user_id + ' limit ' + (row * 10) + ' ,10' , function(err, rows, fields){
            if(err){
                callback(500, err.message, null);
            } else {
                callback(null, null, rows);
            }
        });

    }
}