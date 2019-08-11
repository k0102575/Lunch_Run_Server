const datasource = require('../util/datasource');
const connection = datasource.getConnection();
const async = require('async');

module.exports = {
    getUser : function (callback) {
        try {
            connection.query('select * from user', function (err, result) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            })    
        } catch(e) {
            callback(err, null);
        }
    }
}